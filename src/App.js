import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute,IndexLink  } from 'react-router';
require("./styles/bootstrap.min.css");
require("./styles/megamenu.css");
require("./styles/britanic.css");
require("./styles/loading.css");
import '../node_modules/toastr/build/toastr.min.css';


import Header from './components/common/header';
import {Footer} from './components/common/footer';
import {Social} from './components/common/social';
import {Banner} from './components/home/banner';

export class App extends React.Component {
   render() {

      return (
        <div>
          <Header/>
          <div className="pex-gen-box">
            {this.props.children}
          </div>

        </div>
      );
   }
}


App.PropTypes = {
  children: PropTypes.object.isRequired
};
