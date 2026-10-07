import './App.css';
import './index.css';
import 'dayjs/locale/es';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MUI_THEME } from './configs/theme';
import { PrivateRouter } from './router/PrivateRouter';
import { HashRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';

dayjs.locale('es');

function App() {
  return (
    <ThemeProvider theme={MUI_THEME}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Router basename="/">
          <PrivateRouter />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
