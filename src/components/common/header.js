import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute,IndexLink  } from 'react-router';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';

class Header extends React.Component{

    constructor(props,context){
      super(props,context);

      this.logOut = this.logOut.bind(this);

    }

    logOut(event) {
      event.preventDefault();
      this.props.actions.logOutUser();
    }

    render(){
        return(
          <div>
            <div className="brit_top_strip">
              <div className="container">
                <div className="brit_top_strip_content">
                  <div className="brit_top_strip_content_right">
                    <ul>
                      <li><a href="#">Home</a></li>
                      <li><Link  to="/home/complains">Complains</Link></li>
                      <li><Link  to="/home/adv">Advertise</Link></li>
                      <li ><a href="/logout" onClick={this.logOut}>log out</a></li>
                    </ul>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}



function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, sessionActions),dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Header);