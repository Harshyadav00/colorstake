import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import Routes from './routes';
import { AuthProvider } from './utils/AuthContext';
import { WebSocketProvider } from './utils/WebSocketContextt';
import theme from './utils/Theme';

function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <AuthProvider>
        <WebSocketProvider>
          <Routes />
        </WebSocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
