/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        body:  ['Source Serif 4', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50:  '#E1F5EE',
          100: '#C3EBDd',
          200: '#9FE1CB',
          300: '#5DCAA5',
          400: '#1D9E75',
          500: '#0F6E56',
          600: '#0A5242',
          700: '#085041',
          800: '#063830',
          900: '#042820',
        },
        gold: {
          100: '#F5E6C0',
          300: '#E8C96A',
          500: '#C9940A',
          700: '#8B6914',
        },
        ink: {
          DEFAULT: '#0A0A09',
          editorial: '#2A2A27',
          secondary: '#3D3D3A',
          muted: '#6B6B67',
          light: '#AEADA8',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          warm:    '#FAFAF8',
          bg:      '#F5F4F0',
          border:  '#D8D7D2',
        },
      },
    },
  },
  plugins: [],
}
