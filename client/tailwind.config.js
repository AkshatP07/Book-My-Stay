/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#1B4965',
        secondary:'#03254E',
        text :'#011C27',
        extra:'#E25F12',
        bg:'#F5F5F7',
        yell:'#F7D800'
      },
      boxShadow: {
        'primary': '0 4px 6px -1px rgba(27, 73, 101, 0.1), 0 2px 4px -1px rgba(27, 73, 101, 0.06)',
      },
    },
  },
  plugins: [],
}

