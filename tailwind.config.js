module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins-Regular', 'sans-serif'],
        "poppins-bold": ['Poppins-Bold', 'sans-serif'],
      },
      colors: {
        primary: {
          100: "#40BFFF",
          200: "#223263",
        },
        gray: { 
          100: "#EBF0FF",
          200: "#9098B1",
        },
        red:{
          100: "#FB7181",
        },
      },
    },
  },
  plugins: [],
};
