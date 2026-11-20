/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFA',
          100: '#FDFBF7',
          200: '#F8F3EA',
          300: '#EFE8D8',
        },
        blush: {
          50: '#FEF5F8',
          100: '#FCE7EF',
          200: '#F8CADB',
          300: '#F2A0BF',
          400: '#E86B98',
          500: '#D83A6F',
          600: '#C02458',
          700: '#9E1844',
        },
        gold: {
          300: '#FDE08A',
          400: '#F9D168',
          500: '#F5C451',
          600: '#DFA62F',
        },
        night: {
          900: '#14182E',
          800: '#1E2342',
          700: '#2A305A',
        },
        lavender: {
          100: '#F4F1FA',
          200: '#E8E3F5',
          300: '#D2C8EC',
        },
        sage: {
          100: '#F1F7EE',
          200: '#E2F0D9',
        },
        peach: {
          100: '#FEF2EC',
          200: '#FDE8E0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-gentle': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sparkle-twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.03)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
