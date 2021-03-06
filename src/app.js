"use strict"
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/bookActions';
import BooksList from './components/pages/booksList';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

render(
    <Provider store={store}>
        <BooksList />
    </Provider>,
    document.getElementById('app')
);

// 1. Storen luonti


store.subscribe(function () {
    console.log('current state is ', store.getState())
})


