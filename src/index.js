import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

// Render the App component inside the root div
ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App component with Provider and pass the Redux store */}
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') //Render the app inside the element with id 'root' in the HTML
);