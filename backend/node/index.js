const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/quote', async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'Body debe ser un arreglo' });

  const bodyLines = [
    'Buen día',
    '',
    'Deseo realizar la cotización de los siguientes productos:',
    '',
    ...items.map((p) => `- ${p.name}`),
    '',
    'Gracias',
  ];
  const body = bodyLines.join('\n');

  // Nodemailer transport
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || 'grupofeyodventas1@gmail.com',
      subject: 'Solicitud de Cotización',
      text: body,
    });

    return res.json({ success: true, message: 'Email enviado', info });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ success: false, message: 'Error enviando email', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Feyod backend listening on ${PORT}`);
});
