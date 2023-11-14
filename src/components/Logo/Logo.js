// material-uiimport { useTheme } from '@mui/material/styles';
import logo from 'assets/images/tow_logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logo} alt="Mantis" width="100" />
    </>
  );
};

export default Logo;
