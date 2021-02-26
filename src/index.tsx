import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import ToastMessaging from './components/shared/ToastMessaging';
import customTheme from "./theme";
import { ThemeProvider } from '@emotion/react';
import { CSSReset } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Provider store={configureStore()}>
          <App />
          {/* <ToastMessaging /> */}
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
