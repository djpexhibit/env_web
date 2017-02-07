import React from 'react';
import ReactDOM from 'react-dom';
import {App, About, Contact} from './App';
import Home from './components/home/home.js';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Item from './components/items/item';
import Login from './components/login/login'



const store = configureStore();
//store.dispatch(loadItems());



ReactDOM.render((
    <Provider store={store}>
    <Router history = {browserHistory}>
        <Route path = "/" component = {App}>
            <IndexRoute component = {Login} />
            <Route path = "home" component = {Home} />
            <Route path = "about" component = {About} />
      	</Route>
    </Router>
    </Provider>
),document.getElementById('app'));