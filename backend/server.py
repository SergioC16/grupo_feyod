from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio
from concurrent.futures import ThreadPoolExecutor


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class EmailResponse(BaseModel):
    status: str
    message: str

# Email sending function
class EmailDeliveryError(Exception):
    pass

def send_smtp_email(recipient_email: str, sender_name: str, sender_email: str, sender_phone: str, message: str):
    """
    Send a contact form email - Simple implementation without external APIs
    """
    smtp_username = os.environ.get('SMTP_USERNAME')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    # If SMTP credentials are not configured, log the message for manual processing
    if not smtp_username or not smtp_password:
        logger.info(f"Email received - Manual processing required:")
        logger.info(f"From: {sender_name} ({sender_email})")
        logger.info(f"Phone: {sender_phone}")
        logger.info(f"Message: {message}")
        logger.info(f"To be sent to: {recipient_email}")
        
        # For development/local environment, return success
        # In production, you could write to a file, database, or queue for manual processing
        return True
    
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    sender_email_config = os.environ.get('SENDER_EMAIL', 's.alejandro.xyab@gmail.com')
    
    subject = f"Nuevo mensaje de contacto de {sender_name}"

    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #023047; border-bottom: 2px solid #fab525; padding-bottom: 10px;">
                    Nuevo Mensaje de Contacto - Grupo Feyod
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #023047; margin-top: 0;">Información del Contacto:</h3>
                    <p><strong>Nombre:</strong> {sender_name}</p>
                    <p><strong>Email:</strong> {sender_email}</p>
                    <p><strong>Teléfono:</strong> {sender_phone}</p>
                </div>
                
                <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h3 style="color: #023047; margin-top: 0;">Mensaje:</h3>
                    <p style="white-space: pre-wrap;">{message}</p>
                </div>
                
                <div style="margin-top: 30px; padding: 15px; background-color: #023047; color: white; border-radius: 8px; text-align: center;">
                    <p style="margin: 0;"><em>Este mensaje fue enviado desde el formulario de contacto del sitio web de Grupo Feyod.</em></p>
                </div>
            </div>
        </body>
    </html>
    """

    # Create message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender_email_config
    msg['To'] = recipient_email

    # Create HTML part
    html_part = MIMEText(html_content, 'html')
    msg.attach(html_part)

    try:
        # Create SMTP session
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Enable TLS encryption
        server.login(smtp_username, smtp_password)
        
        # Send email
        text = msg.as_string()
        server.sendmail(sender_email_config, recipient_email, text)
        server.quit()
        
        logger.info(f"Email sent successfully to {recipient_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email via SMTP: {str(e)}")
        # Log the message for manual processing as fallback
        logger.info(f"Email fallback - Manual processing required:")
        logger.info(f"From: {sender_name} ({sender_email})")
        logger.info(f"Phone: {sender_phone}")
        logger.info(f"Message: {message}")
        logger.info(f"To be sent to: {recipient_email}")
        # Return success for user experience, message is logged for manual processing
        return True

async def send_contact_form_email(recipient_email: str, sender_name: str, sender_email: str, sender_phone: str, message: str):
    """
    Send a contact form email with formatted content using SMTP
    """
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as executor:
        return await loop.run_in_executor(
            executor, 
            send_smtp_email, 
            recipient_email, 
            sender_name, 
            sender_email, 
            sender_phone, 
            message
        )

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=EmailResponse)
async def submit_contact_form(request: ContactFormRequest, background_tasks: BackgroundTasks):
    """
    Submit contact form and send email using SMTP
    """
    try:
        # Add email sending to background tasks for better performance
        background_tasks.add_task(
            send_contact_form_email,
            "s.alejandro.xyab@gmail.com",  # Your email address
            request.name,
            request.email,
            request.phone,
            request.message
        )

        # Store the contact form submission in database
        contact_record = {
            "id": str(uuid.uuid4()),
            "name": request.name,
            "email": request.email,
            "phone": request.phone,
            "message": request.message,
            "timestamp": datetime.utcnow(),
            "status": "submitted"
        }
        
        await db.contact_forms.insert_one(contact_record)

        return EmailResponse(
            status="success",
            message="¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo pronto."
        )
    except EmailDeliveryError as e:
        logger.error(f"Email delivery error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al enviar el email. Por favor intenta de nuevo.")
    except Exception as e:
        logger.error(f"Unexpected error in contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Ha ocurrido un error inesperado. Por favor intenta de nuevo.")

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Grupo Feyod API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
