const { height } = require('@fortawesome/free-brands-svg-icons/fa42Group');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        xs: "320px",
        sm: "375px",
        mdx:'650px',
        md: "827px",
        xmd: "968px",
        lg: "960px",
        xlg: "1124px",
      },
      colors: {
        bodyColor: "#221f20",
        borderColor: "#686666",
        textColor: "#f5f5f5",
        
      },
      keyframes: {
        moveX: {
          from: {
            width: "0",
          },
          to: {
            width: "75%",
          },
        },
        moveDiagonally: {
          from:{
            opacity: '0',
            transform: 'translate(-90%, 100%)'
          },
          to :{
            opacity: '0.25',
            transform: 'translate(0%, -0%)'
          }
        }
        
        
        
      },
      container: {
        center: true,
        padding: '0px',
        margin: '0px'
      },
      animation: {
        movingX: "moveX 0.3s linear",
        movingD: "moveDiagonally 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",

      },
      fontFamily:{
        Roboto:['Roboto', 'sans-serif'],
        Shalimar:["Shalimar", 'cursive'],
        OpenSans: ["Open Sans", 'sans-serif'],
        EvaFont: ['EvaFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
