import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import {rootReducer} from './reducers'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './sagas'
const sagaMiddlewear=createSagaMiddleware();
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddlewear)));
sagaMiddlewear.run(rootSaga)

   
  
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("div1")
)