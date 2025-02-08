/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        outfit: ['Outfit-Regular','sans-serif'],
        "outfit-bold": ['Outfit-Bold','sans-serif'],
        "outfit-medium": ['Outfit-Medium','sans-serif'],
      },
      colors:{
        "primary":"#E8B20E",
        "gray":"#8F8e8d",
      }
    },
  },
  plugins: [],
}