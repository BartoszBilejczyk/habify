module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',

      white: {
        50: 'rgba(#080708, 0.05)',
        100: 'rgba(#080708, 0.1)',
        200: 'rgba(#080708, 0.2)',
        300: 'rgba(#080708, 0.3)',
        400: 'rgba(#080708, 0.4)',
        500: 'rgba(#080708, 0.5)',
        600: 'rgba(#080708, 0.6)',
        700: 'rgba(#080708, 0.7)',
        800: 'rgba(#080708, 0.8)',
        900: 'rgba(#080708, 0.9)',
        DEFAULT: '#080708'
      },

      primary: {
        50: 'rgba(#9073ED, 0.05)',
        100: 'rgba(#9073ED, 0.1)',
        200: 'rgba(#9073ED, 0.2)',
        300: 'rgba(#9073ED, 0.3)',
        400: 'rgba(#9073ED, 0.4)',
        500: 'rgba(#9073ED, 0.5)',
        600: 'rgba(#9073ED, 0.6)',
        700: 'rgba(#9073ED, 0.7)',
        800: 'rgba(#9073ED, 0.8)',
        900: 'rgba(#9073ED, 0.9)',
        DEFAULT: '#9073ED'
      },

      blue: {
        50: 'rgba(#42BFDD, 0.05)',
        100: 'rgba(#42BFDD, 0.1)',
        200: 'rgba(#42BFDD, 0.2)',
        300: 'rgba(#42BFDD, 0.3)',
        400: 'rgba(#42BFDD, 0.4)',
        500: 'rgba(#42BFDD, 0.5)',
        600: 'rgba(#42BFDD, 0.6)',
        700: 'rgba(#42BFDD, 0.7)',
        800: 'rgba(#42BFDD, 0.8)',
        900: 'rgba(#42BFDD, 0.9)',
        DEFAULT: '#42BFDD'
      },

      green: {
        50: 'rgba(#00A3A1, 0.05)',
        100: 'rgba(#00A3A1, 0.1)',
        200: 'rgba(#00A3A1, 0.2)',
        300: 'rgba(#00A3A1, 0.3)',
        400: 'rgba(#00A3A1, 0.4)',
        500: 'rgba(#00A3A1, 0.5)',
        600: 'rgba(#00A3A1, 0.6)',
        700: 'rgba(#00A3A1, 0.7)',
        800: 'rgba(#00A3A1, 0.8)',
        900: 'rgba(#00A3A1, 0.9)',
        DEFAULT: '#00A3A1'
      },

      coral: {
        50: 'rgba(#F69380, 0.05)',
        100: 'rgba(#F69380, 0.1)',
        200: 'rgba(#F69380, 0.2)',
        300: 'rgba(#F69380, 0.3)',
        400: 'rgba(#F69380, 0.4)',
        500: 'rgba(#F69380, 0.5)',
        600: 'rgba(#F69380, 0.6)',
        700: 'rgba(#F69380, 0.7)',
        800: 'rgba(#F69380, 0.8)',
        900: 'rgba(#F69380, 0.9)',
        DEFAULT: '#F69380'
      },

      red: {
        50: 'rgba(#88292F, 0.05)',
        100: 'rgba(#88292F, 0.1)',
        200: 'rgba(#88292F, 0.2)',
        300: 'rgba(#88292F, 0.3)',
        400: 'rgba(#88292F, 0.4)',
        500: 'rgba(#88292F, 0.5)',
        600: 'rgba(#88292F, 0.6)',
        700: 'rgba(#88292F, 0.7)',
        800: 'rgba(#88292F, 0.8)',
        900: 'rgba(#88292F, 0.9)',
        DEFAULT: '#88292F'
      },

      yellow: {
        50: 'rgba(#FDCA40, 0.05)',
        100: 'rgba(#FDCA40, 0.1)',
        200: 'rgba(#FDCA40, 0.2)',
        300: 'rgba(#FDCA40, 0.3)',
        400: 'rgba(#FDCA40, 0.4)',
        500: 'rgba(#FDCA40, 0.5)',
        600: 'rgba(#FDCA40, 0.6)',
        700: 'rgba(#FDCA40, 0.7)',
        800: 'rgba(#FDCA40, 0.8)',
        900: 'rgba(#FDCA40, 0.9)',
        DEFAULT: '#FDCA40'
      }
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      standalone: { raw: '(display-mode: standalone)' }
    }
  },
  variants: {
    extend: {
      outline: ['focus-visible'],
      margin: ['first', 'last'],
      padding: ['first', 'last'],
      backgroundColor: ['odd']
    }
  },
  plugins: []
};
