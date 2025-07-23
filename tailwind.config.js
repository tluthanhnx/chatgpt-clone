/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Không cần ./index.html nếu dùng CRA
  ],
  theme: {
    extend: {},
  },
plugins: [
  require('@tailwindcss/typography'),
],
}
