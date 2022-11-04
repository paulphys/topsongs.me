module.exports = {
  content: ['src/pages/**/*.{js,ts,jsx,tsx}', 'src/modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212', // 131312
        paper: '#171717',
        white: '#FEFFFE',
        purple: '#531640',
        player: '#181818',
        primary: '#1DB954',
        gray: '#B2B2B3',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
};
