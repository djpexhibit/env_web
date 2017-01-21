import React from 'react';
import ReactDOM from 'react-dom';
import {App, About, Contact} from './App';
import Home from './components/home/home.js';
import Items from './components/items/items';
import SearchItems from './components/items/searchItems';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import {loadItems,loadLimitedItems} from './actions/itemActions';
import {loadSuppliers} from './actions/supplierActions';
import configureStore from './store/configureStore';
import ManageItem from './components/items/manageItem';
import Cart from './components/cart/cart';
import Item from './components/items/item';



const store = configureStore();
//store.dispatch(loadItems());
store.dispatch(loadSuppliers());
//store.dispatch(loadLimitedItems());


ReactDOM.render((
    <Provider store={store}>
    <Router history = {browserHistory}>
        <Route path = "/" component = {App}>
            <IndexRoute component = {Home} />
            <Route path = "home" component = {Home} />
            <Route path = "about" component = {About} />
            <Route path = "items/:type" component = {Items} />
            <Route path = "item" component = {ManageItem} />
            <Route path = "item/:id" component = {Item} />
            <Route path = "cart" component = {Cart} />
            <Route path = "searchItems/:key" component = {SearchItems} />
      	</Route>
    </Router>
    </Provider>
),document.getElementById('app'));