import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.sass';

const appRendered = ReactDOM.renderToString(
    <Provider store={store}>
        <App />
    </Provider>
);

document.getElementById("root").innerHTML(appRendered);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
