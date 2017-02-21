import React from 'react';
import {connect} from 'react-redux';
import * as complainActions from '../../actions/complainActions';
import {bindActionCreators}  from 'redux';

class Complain extends React.Component{

	constructor(props) {
		super(props);
		props.actions.loadComplainById(props.params.id);
	}

	render(){
		console.log("BBBBBBBB")
		console.log(this.props.complain)
		return(
			<div>hh</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
    return{
        complain:state.complain
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, complainActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Complain);