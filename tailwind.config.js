module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        basecolor: "#f9fafe",
        primary: "#60cdff",
        secondary: "#69B2F6",
        success: "#3bde86",
        danger: "#ff6260",
      },
    },
  },
  plugins: [],
};
