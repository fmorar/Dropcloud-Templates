/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('flowbite/plugin'),
    require("@tailwindcss/forms")
  ],
  content: ["./**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "gray-primary": "#979BA3",
        "primary": "#494666",
        "dark-primary": "#353535",
        "dark-modal-primary": "#283555",
        "gray-modal-primary": "#65646E",
        "sidebar": "#F7FAFD",
        "sidebar-options": "#121627",
        "sidebar-hover": "#949494"
      },
    },
  },
}
