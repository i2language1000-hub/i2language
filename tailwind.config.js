/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#effcf5',
          100: '#d8f5e4',
          200: '#b5ebca',
          300: '#83dba7',
          400: '#4cc07b',
          500: '#24a35f',
          600: '#16854c',
          700: '#14693f',
          800: '#145334',
          900: '#0c3422',
          950: '#061b11'
        },
        sand: '#f8f5ee'
      },
      boxShadow: {
        glow: '0 20px 70px rgba(18, 103, 63, 0.18)',
        soft: '0 14px 45px rgba(2, 30, 20, 0.10)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top left, rgba(76,192,123,0.18), transparent 32%), radial-gradient(circle at 85% 15%, rgba(31,151,104,0.16), transparent 25%), linear-gradient(135deg, #f8f5ee 0%, #ffffff 52%, #effcf5 100%)'
      }
    }
  },
  plugins: []
};