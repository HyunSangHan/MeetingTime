/* eslint-disable */
import "react-app-polyfill/ie11"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, compose, applyMiddleware } from 'redux'
import reducers from './modules';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";
import penderMiddleware from "redux-pender";
const middlewares = [ReduxThunk, penderMiddleware()];

const store = compose(applyMiddleware(...middlewares))(createStore)(
    reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
