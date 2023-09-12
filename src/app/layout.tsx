'use client';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import './global.css';
import store from '../../src/store/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <Provider store={store}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
