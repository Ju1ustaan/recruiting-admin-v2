/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        caret: {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        typing: 'typing 3.5s steps(var(--tw-steps)) forwards',
        caret: 'caret 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}
