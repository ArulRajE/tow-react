// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
// import { JWTProvider } from 'contexts/JWTContext';
// import {Auth0Provider} from 'contexts/Auth0Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Snackbar from 'ui-component/extended/Snackbar';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ToastContainer>
    <ThemeCustomization>
      {/* <JWTProvider> */}
      <ScrollTop>
        <Routes />
        {/* <Snackbar /> */}
      </ScrollTop>
      {/* </JWTProvider> */}
    </ThemeCustomization>
  </ToastContainer>
);

export default App;
