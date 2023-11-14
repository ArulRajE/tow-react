// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { JWTProvider } from 'contexts/JWTContext';
// import Snackbar from 'ui-component/extended/Snackbar';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <JWTProvider>
      <ScrollTop>
        <Routes />
        {/* <Snackbar /> */}
      </ScrollTop>
    </JWTProvider>
  </ThemeCustomization>
);

export default App;
