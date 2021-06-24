import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      secondary: {
        main: '#e57373',
    },
    success: {
        main: "#b9f6ca"
      }
    },
  })

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
