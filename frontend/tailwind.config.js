/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#141937',
          50: '#e6f0f5',
          100: '#cce0eb',
          200: '#99c1d7',
          300: '#66a2c3',
          400: '#3383af',
          500: '#023047',
          600: '#022639',
          700: '#011d2b',
          800: '#01131d',
          900: '#000a0f'
        },
        accent: {
          DEFAULT: '#cc7722',
          50: '#fef9e6',
          100: '#fdf3cd',
          200: '#fbe79b',
          300: '#f9db69',
          400: '#f7cf37',
          500: '#fab525',
          600: '#c8911e',
          700: '#966d16',
          800: '#64480f',
          900: '#322407'
        }
      },
      fontFamily: {
        'neue': ['Neue Montreal', 'sans-serif'],
        'nexa': ['Nexa', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(250, 181, 37, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(250, 181, 37, 0.6)' }
        }
      }
    },
  },
  plugins: [],
};