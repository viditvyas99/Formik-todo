// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     
//     <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';


const container = ReactDOMClient.createRoot(document.getElementById("root"));
container.render(
<Provider store={store}>
<App />
</Provider>
);

