/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        webzark: '#1D4ED8',
        'webzark-dark': '#1E40AF',
        success: '#10B981',
        accent: '#F59E0B',
        navy: '#12213D',
        ink: '#1E293B',
        muted: '#5E6D83',
        soft: '#F1F4F8',
        page: '#F7F8FA',
        border: '#E3E8EF',
      },
      boxShadow: {
        button: '0 8px 18px rgba(29, 78, 216, .18)',
        card: '0 14px 30px rgba(18, 33, 61, .08)',
      },
      borderRadius: {
        DEFAULT: '14px',
        lg: '14px',
      },
    },
  },
  plugins: [],
};
