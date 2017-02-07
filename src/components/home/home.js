import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute,IndexLink  } from 'react-router';
import {Banner} from './banner';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import toastr from 'toastr';


class Home extends React.Component {
    constructor(props,context){
        super(props,context);
    }

    
    
    render() {
       
        return (
            <div>
                 <Banner />
            </div>
        )
    }
}




function mapStateToProps(state, ownProps){          // map state to properties
    return {
        items:state.items
    };
}

function mapDispatchToProps(dispatch){                      // Determine what actions to dispatch from this component
    return{
        actions : bindActionCreators(Object.assign({}, itemActions),dispatch) // do the above (all actions wrap in dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps )(Home);
