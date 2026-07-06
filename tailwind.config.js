/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colors pulled from the official Hezek Health brand book
        brand: {
          blue: '#16538C',      // Sapphire Blue — primary
          'blue-dark': '#103E69', // darker shade for hover/active states
          teal: '#00DC92',      // Teal Green — accent
          'teal-dark': '#00B87A',
          ink: '#0F2438',        // near-black derived from blue, for body text
          mist: '#F4F8FA',       // very light blue-tinted background
        },
      },
      fontFamily: {
        // 'Glonto' is the brand typeface. Add the actual woff/woff2 files to
        // public/fonts and declare @font-face in src/index.css, then this
        // will pick it up automatically. Poppins is a close-shaped fallback
        // (rounded geometric sans) so the site looks right before that.
        display: ['Glonto', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['Glonto', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15, 36, 56, 0.08)',
        'card-hover': '0 8px 32px -4px rgba(15, 36, 56, 0.14)',
      },
    },
  },
  plugins: [],
};