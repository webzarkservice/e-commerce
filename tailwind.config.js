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
        webzark: '#2563EB',
        'webzark-dark': '#1D4ED8',
        success: '#10B981',
        accent: '#F59E0B',
        navy: '#172B4D',
        ink: '#1E293B',
        muted: '#64748B',
        soft: '#F1F5F9',
        page: '#F8FAFC',
        border: '#E2E8F0',
      },
      boxShadow: {
        button: '0 5px 12px rgba(37, 99, 235, .15)',
        card: '0 12px 24px rgba(23, 43, 77, .07)',
      },
      borderRadius: {
        DEFAULT: '14px',
        lg: '14px',
      },
    },
  },
  plugins: [],
};
