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
      let loggedUser = null;
      let type = null;

      if(this.props.loggedUser){
        loggedUser = this.props.loggedUser;
        type = loggedUser.type;
      }
      // let type = null;
      // if(sessionStorage.user_session){
      //   type = JSON.parse(sessionStorage.user_session).type;
      // }


        return(
          <div>
            <div className="brit_top_strip">
              <div className="container">
                <div className="brit_top_strip_content">
                  <div className="brit_top_strip_content_right">
                    <ul>
                      <li><a href="#">Home</a></li>
                      <li><Link  to="complains">Complains</Link></li>
                      <li><Link  to="species">Species</Link></li>
                      { (type === 'ADMIN_FULL')?
                      <li><Link  to="users">Users</Link></li> : null
                      }
                      { (type === 'ADMIN_FULL')?
                      <li><Link  to="adv">Advertise</Link></li> : null
                      }
                      { (type === 'ADMIN_FULL')?
                      <li><Link  to="event">Events</Link></li> : null
                      }
                      { (type === 'ADMIN_FULL')?
                      <li ><a href="logout" onClick={this.logOut}>log out</a></li> : null
                      }
                      <li><Link  to="login">Login</Link></li>

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

function mapStateToProps(state, ownProps){
    return {
        loggedUser:state.login
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
