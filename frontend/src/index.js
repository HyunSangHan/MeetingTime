import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { createStore, compose, applyMiddleware } from 'redux'
//import reducers from './reducers';
import reducers from './modules';
=======
import { createStore } from 'redux'
import reducers from './reducers';
// import reducers from './modules';
// 나중에 module 완성되면 적용
>>>>>>> f635bb43cefe2d299774fd44e1276d086443882e
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
serviceWorker.unregister();
