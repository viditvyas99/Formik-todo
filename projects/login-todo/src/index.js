import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const container = ReactDOMClient.createRoot(document.getElementById("root"));
container.render(
<Provider store={store}>
<App />
</Provider>
);

