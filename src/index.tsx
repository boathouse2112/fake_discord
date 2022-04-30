import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // Disabling strict-mode for firebaseui-web-react, per https://github.com/firebase/firebaseui-web-react/issues/172
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
