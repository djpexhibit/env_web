import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';
import ContainerWrapper from '../map/containerWrapper';

class User extends React.Component{

	constructor(props) {
		super(props);
		props.actions.loadUserById(props.params.id);

		this.state={
			comment : {
				type:'ADMIN',
				details:'',
				user_id:-1,
				user_id:props.params.id
			}
		}

		this._addToPanel = this._addToPanel.bind(this);
	}



	_addToPanel(id){
		this.props.actions.addToPanel(id);
	}

	render(){

		if(this.props.user && this.props.user.length > 0 ){

			return(
				<div className="container">
					<br/>
					<div className="row">
						<div className="col-md-12">
							<p>Type: {this.props.user[0].type}</p>
						</div>
						<div className="col-md-12">
							<p>Name : {this.props.user[0].name} </p>
						</div>
						<div className="col-md-12">
							<p>Username : {this.props.user[0].username}</p>
						</div>
						<div className="col-md-12">
							<p>Email: {this.props.user[0].email}</p>
						</div>
						<div className="col-md-12">
							<p>Mobile: {this.props.user[0].mobile}</p>
						</div>
						<div>
							{
								(this.props.user[0].isJoinedVerified)?
								<button onClick={() => _addToPanel(this.props.user[0].id)}>Add to panel</button>
								:null
							}
						</div>
					</div>
			</div>
		);

		}else{
			return(
				<div>No Users</div>
			)
		}


	}
}

function mapStateToProps(state, ownProps) {
    return{
        user:state.user
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, userActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(User);
