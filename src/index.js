import React from 'react';
import ReactDOM from 'react-dom';
import {App, About, Contact} from './App';
import Home from './components/home/home.js';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Item from './components/items/item';
import Login from './components/login/login';
import Complains from './components/complains/complains';
import Complain from './components/complains/complain';
import Adv from './components/adv/adv';
import Event from './components/events/event'


const store = configureStore();
//store.dispatch(loadItems());



ReactDOM.render((
    <Provider store={store}>
    <Router history = {browserHistory}>
        <Route path = "/" component = {Login}>
            <IndexRoute component = {Login} />
        </Route>
        <Route path = "/home" component = {App}>
            <IndexRoute component = {Home} />
            <Route path = "complains" component = {Complains} onEnter={requireAuth} />
            <Route path = "complain/:id" component = {Complain} onEnter={requireAuth} />
            <Route path = "adv" component = {Adv} onEnter={requireAuth} />
            <Route path = "event" component = {Event} onEnter={requireAuth} />
      	</Route>
    </Router>
    </Provider>
),document.getElementById('app'));


function requireAuth(nextState, replace) {
  if (sessionStorage.jwt !== 'true') {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
