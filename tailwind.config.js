/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "gray-primary": "#979BA3",
        "primary": "#494666",
        "dark-primary": "#353535",
        "dark-modal-primary": "#283555",
        "gray-modal-primary": "#65646E" 
      },
    },
  },
  plugins: [],
}
