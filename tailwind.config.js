const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}", ".flowbite-react\\class-list.json"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#030B1E"
        }
      },
      animation: {
        'ping-fast': 'ping 0.3s ease-in-out',
      }

    },
  },
  plugins: [
    flowbiteReact,
    require('tailwind-scrollbar-hide')
  ],
}