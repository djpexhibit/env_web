import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as commentActions from '../../actions/commentActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';
import ContainerWrapper from '../map/containerWrapper';

class User extends React.Component{

	constructor(props) {
		super(props);
		props.actions.loadUserById(props.params.id);
		props.actions.loadCommentById(props.params.id);

		this.state={
			comment : {
				type:'ADMIN',
				details:'',
				user_id:-1,
				user_id:props.params.id
			}
		}

		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}


	onChange(event){
		const field = event.target.name;
		const comment = this.state.comment;
		comment[field] = event.target.value;
		return this.setState({comment:comment})
	}

	onSave(event) {
		event.preventDefault();
		this.props.actions.addComment(this.state.comment);

		//browserHistory.push("/users");
	}

	_generateCommentSection(){

		if(sessionStorage.user_session && JSON.parse(sessionStorage.user_session).type === 'ADMIN_FULL'){
			return(
				<div className="row">
					<form>
						<h4>Add Response: </h4>
						<textarea name="details" className="form-control" rows="7" value={this.state.comment.details} onChange={this.onChange} />
						<br/><br/>
						<div className="col-md-3">
							<input type="submit" className="btn btn-primary" onClick={this.onSave}/>
						</div>
						<div className="col-md-4">
							<select  className="form-control" >
								<option>Authority 1</option>
							</select>
						</div>
						<div className="col-md-3">
							<input type="button" className="btn btn-primary" value="Submit to authorities"/>
						</div>
						<div className="col-md-2">
							<input type="button" className="btn btn-primary" value="Mark as Resolved"/>
						</div>
					</form>
				</div>
			);
		}
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
        user:state.user,
        comments:state.comments
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, userActions, commentActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(User);
