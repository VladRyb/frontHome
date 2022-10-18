import { PaletteMode } from '@mui/material';

export const light = {
  alternate: {
    main: '#f7faff',
    dark: '#edf1f7',
  },
  cardShadow: 'rgba(23, 70, 161, .11)',
  mode: 'light' as PaletteMode,
  primary: {
    main: '#223375',
    // main: '#377dff',
    light: '#467de3',
    dark: '#29419f',
    // dark: '#223375cc',
    // dark: '#2f6ad9',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ffb74d',
    main: '#fa4807',
    // main: '#f9b934',
    dark: '#FF9800',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  text: {
    // primary: '#1e2022',
    primary: '#223375',
    secondary: '#677788',
    grey: '#777776',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#ffffff',
    // paper: '#e8edf1',
    default: '#ffffff',
    // default: '#e8edf1',
    level2: '#f5f5f5',
    level1: '#ffffff',
  },
};

export const dark = {
  alternate: {
    main: '#1a2138',
    // main: '#444e5f',
    dark: '#151a30',
  },
  cardShadow: 'rgba(0, 0, 0, .11)',
  common: {
    black: '#000',
    white: '#fff',
  },
  mode: 'dark' as PaletteMode,
  primary: {
    // main: '#223375',
    main: '#1976d2',
    light: '#2196f3',
    // dark: '#223375cc',
    dark: '#0d47a1',
    contrastText: '#fff',
  },
  secondary: {
    light: '#FFEA41',
    // main: '#FFE102',
    main: '#fa4807',
    dark: '#DBBE01',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  text: {
    primary: '#EEEEEF',
    secondary: '#AEB0B4',
    grey: '#EEEEEF',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#222B45',
    // paper: '#2e3847',
    default: '#222B45',
    // default: '#2e3847',
    level2: '#333',
    level1: '#2D3748',
  },
};
