const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',

      white: {
        20: '#F2F5F9',
        50: 'rgba(8,7,8, 0.05)',
        100: 'rgba(8,7,8, 0.1)',
        200: 'rgba(8,7,8, 0.2)',
        300: 'rgba(8,7,8, 0.3)',
        400: 'rgba(8,7,8, 0.4)',
        500: 'rgba(8,7,8, 0.5)',
        600: 'rgba(8,7,8, 0.6)',
        700: 'rgba(8,7,8, 0.7)',
        800: 'rgba(8,7,8, 0.8)',
        900: 'rgba(8,7,8, 0.9)',
        DEFAULT: '#FFFFFF'
      },

      primary: {
        50: 'rgba(144,115,237, 0.05)',
        100: 'rgba(144,115,237, 0.1)',
        200: 'rgba(144,115,237, 0.2)',
        300: 'rgba(144,115,237, 0.3)',
        400: 'rgba(144,115,237, 0.4)',
        500: 'rgba(144,115,237, 0.5)',
        600: 'rgba(144,115,237, 0.6)',
        700: 'rgba(144,115,237, 0.7)',
        800: 'rgba(144,115,237, 0.8)',
        900: 'rgba(144,115,237, 0.9)',
        DEFAULT: '#9073ED'
      },

      blue: {
        50: 'rgba(66,191,221, 0.05)',
        100: 'rgba(66,191,221, 0.1)',
        200: 'rgba(66,191,221, 0.2)',
        300: 'rgba(66,191,221, 0.3)',
        400: 'rgba(66,191,221, 0.4)',
        500: 'rgba(66,191,221, 0.5)',
        600: 'rgba(66,191,221, 0.6)',
        700: 'rgba(66,191,221, 0.7)',
        800: 'rgba(66,191,221, 0.8)',
        900: 'rgba(66,191,221, 0.9)',
        DEFAULT: '#42BFDD'
      },

      green: {
        50: 'rgba(0,163,161, 0.05)',
        100: 'rgba(0,163,161, 0.1)',
        200: 'rgba(0,163,161, 0.2)',
        300: 'rgba(0,163,161, 0.3)',
        400: 'rgba(0,163,161, 0.4)',
        500: 'rgba(0,163,161, 0.5)',
        600: 'rgba(0,163,161, 0.6)',
        700: 'rgba(0,163,161, 0.7)',
        800: 'rgba(0,163,161, 0.8)',
        900: 'rgba(0,163,161, 0.9)',
        DEFAULT: '#00A3A1'
      },

      coral: {
        50: 'rgba(246,147,128, 0.05)',
        100: 'rgba(246,147,128, 0.1)',
        200: 'rgba(246,147,128, 0.2)',
        300: 'rgba(246,147,128, 0.3)',
        400: 'rgba(246,147,128, 0.4)',
        500: 'rgba(246,147,128, 0.5)',
        600: 'rgba(246,147,128, 0.6)',
        700: 'rgba(246,147,128, 0.7)',
        800: 'rgba(246,147,128, 0.8)',
        900: 'rgba(246,147,128, 0.9)',
        DEFAULT: '#F69380'
      },

      red: {
        50: 'rgba(136,41,47, 0.05)',
        100: 'rgba(136,41,47, 0.1)',
        200: 'rgba(136,41,47, 0.2)',
        300: 'rgba(136,41,47, 0.3)',
        400: 'rgba(136,41,47, 0.4)',
        500: 'rgba(136,41,47, 0.5)',
        600: 'rgba(136,41,47, 0.6)',
        700: 'rgba(136,41,47, 0.7)',
        800: 'rgba(136,41,47, 0.8)',
        900: 'rgba(136,41,47, 0.9)',
        DEFAULT: '#88292F'
      },

      yellow: {
        50: 'rgba(253,202,64, 0.05)',
        100: 'rgba(253,202,64, 0.1)',
        200: 'rgba(253,202,64, 0.2)',
        300: 'rgba(253,202,64, 0.3)',
        400: 'rgba(253,202,64, 0.4)',
        500: 'rgba(253,202,64, 0.5)',
        600: 'rgba(253,202,64, 0.6)',
        700: 'rgba(253,202,64, 0.7)',
        800: 'rgba(253,202,64, 0.8)',
        900: 'rgba(253,202,64, 0.9)',
        DEFAULT: '#FDCA40'
      }
    },
    extend: {
      fontSize: {
        ...defaultTheme.fontSize,
        xxs: ['.625rem', '.75rem']
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
  plugins: [require('tailwindcss-safe-area')]
};
