import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute,IndexLink  } from 'react-router';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import {bindActionCreators} from 'redux';

class Header extends React.Component{

    constructor(props,context){
      super(props,context);
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


export default Header;