// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '/dashboard/default',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'cz',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'volcano',
  themeDirection: 'ltr',
  jwt: {
    secret: 'SECRET-KEY',
    timeout: '10 minutes'
  },
  apiUrl: 'http://localhost:3500/v1'
};

export default config;
export const drawerWidth = 160;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
