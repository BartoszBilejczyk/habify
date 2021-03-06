const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',

      white: {
        10: '#F7F7F9',
        20: '#e0e0e0',
        30: '#c6c6c6',
        40: '#adadad',
        50: '#868686',
        100: '#6d6d6d',
        200: '#535353',
        300: '#474747',
        400: '#3a3a3a',
        500: '#2d2d2d',
        600: '#252525',
        700: '#1e1e1e',
        800: '#161616',
        900: '#0e0e0e',
        DEFAULT: '#FFF',
      },

      primary: {
        10: '#eae4fc',
        20: '#cdc0f7',
        50: '#bba9f4',
        100: '#ad97f2',
        200: '#a58ef0',
        300: '#9e85ef',
        400: '#9e85ef',
        500: '#9073ED',
        600: '#8565eb',
        700: '#7b58ea',
        800: '#704ae8',
        900: '#653de6',
        DEFAULT: '#9073ED',
      },

      'primary-other': {
        10: '#bde2db',
        20: '#acdad1',
        50: '#9ad2c7',
        100: '#8fcec1',
        200: '#85c9bb',
        300: '#7ac4b5',
        400: '#70c0af',
        500: '#65BBA9',
        600: '#5ab6a3',
        700: '#50b29d',
        800: '#4aa894',
        900: '#459d8b',
        DEFAULT: '#65BBA9',
      },

      blue: {
        10: '#d9f2f9',
        20: '#99dced',
        50: '#83d5e9',
        100: '#76d1e6',
        200: '#69cce4',
        300: '#5cc8e2',
        400: '#4fc3df',
        500: '#42BFDD',
        600: '#35bbdb',
        700: '#28b6d8',
        800: '#25accc',
        900: '#22a1bf',
        DEFAULT: '#42BFDD',
      },

      green: {
        10: '#bdfffe',
        20: '#0bfffc',
        50: '#00f0ed',
        100: '#00e0dd',
        200: '#00d1ce',
        300: '#00c2bf',
        400: '#00b2b0',
        500: '#00A3A1',
        600: '#009492',
        700: '#008483',
        800: '#007574',
        900: '#006665',
        DEFAULT: '#00A3A1',
      },

      coral: {
        10: '#fde4df',
        20: '#fbd0c7',
        50: '#fac4b9',
        100: '#fbd0c7',
        200: '#fac4b9',
        300: '#f9b7ab',
        400: '#f8ab9d',
        500: '#f79f8e',
        600: '#F69380',
        700: '#f58772',
        800: '#f47b63',
        900: '#f36f55',
        DEFAULT: '#F69380',
      },

      red: {
        10: '#db898e',
        20: '#c94e55',
        50: '#c33b43',
        100: '#b7373f',
        200: '#ab343b',
        300: '#a03037',
        400: '#942d33',
        500: '#88292F',
        600: '#7c252b',
        700: '#702227',
        800: '#651e23',
        900: '#591b1f',
        DEFAULT: '#88292F',
      },

      yellow: {
        10: '#fff7e2',
        20: '#fee296',
        50: '#fedb7d',
        100: '#fdd568',
        200: '#fdd25e',
        300: '#fdd054',
        400: '#fdcd4a',
        500: '#FDCA40',
        600: '#fdc631',
        700: '#fdc222',
        800: '#fdbd13',
        900: '#fcb903',
        DEFAULT: '#FDCA40',
      },

      dark: {
        800: '#20232D',
        900: '#16181F',
        DEFAULT: '#16181F',
      },
    },
    extend: {
      fontSize: {
        ...defaultTheme.fontSize,
        xxs: ['.625rem', '.75rem'],
      },
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      standalone: { raw: '(display-mode: standalone)' },
    },
  },
  variants: {
    extend: {
      outline: ['focus-visible'],
      margin: ['first', 'last'],
      padding: ['first', 'last'],
      backgroundColor: ['odd'],
    },
  },
  plugins: [require('tailwindcss-safe-area')],
};
