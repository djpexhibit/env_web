import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';
import ContainerWrapper from '../map/containerWrapper';

class User extends React.Component{

	constructor(props) {
		super(props);

		this.state={
			comment : {
				type:'ADMIN',
				details:'',
				user_id:-1,
				user_id:props.params.id
			},
			user : {
				id: null,
				name : '',
				username : '',
				password : '',
				email : '',
				type : '',
				mobile : '',
				expertType : '',
				mediaType : ''
			}
		}

		this._addToPanel = this._addToPanel.bind(this);
		this._changeHandler = this._changeHandler.bind(this);
		this._editUser = this._editUser.bind(this);
	}


	componentDidMount(){
		this.props.actions.loadUserById(this.props.params.id);
	}

	componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
				user: Object.assign({}, nextProps.user[0])
      })
    }
  }


	_addToPanel(id){
		this.props.actions.addToPanel(id);
	}

	_verifyAddToPanel(id){
		this.props.actions.verifyAddToPanel(id);
	}

	_verify(id){
		this.props.actions.verify(id);
	}

	_addToPanel(id){
		this.props.actions.addToPanel(id);
	}

	_changeHandler(e){
		const field = e.target.name;
		const user = this.state.user;
		user[field] = e.target.value;
		return this.setState({user:user})

	}


	_editUser(){
		console.log("editing...");
		this.props.actions.editUser(this.state.user);
	}

	render(){

		if(this.props.user && this.props.user.length > 0 ){

			return(
				<div className="container">
					<br/>
					<div className="row">
						{/*<div className="col-md-12">
							<p>Type: {this.props.user[0].type}</p>
						</div>*/}
						<div className="col-md-12">
							<span className="indic">Name : </span>
							<input type="text" value={this.state.user.name} onChange={this._changeHandler} name="name"/>
						</div>
						<div className="col-md-12">
							<span className="indic">Username : </span>
							<input type="text" value={this.state.user.username} onChange={this._changeHandler} name="username"/>
						</div>
						<div className="col-md-12">
							<span className="indic">Email : </span>
							<input type="text" value={this.state.user.email} onChange={this._changeHandler} name="email"/>
						</div>
						<div className="col-md-12">
							<span className="indic">Mobile : </span>
							<input type="text" value={this.state.user.mobile} onChange={this._changeHandler} name="mobile"/>
						</div>
						<div className="col-md-12" style={{marginTop:"10px"}}>
							<button className="btn btn-primary" type="button" onClick={() => this._editUser()}>Edit</button>
						</div>
						<div className="col-md-12" style={{marginTop:"10px"}}>
							{
								(!this.state.user.verified)?
								<button className="btn btn-primary" onClick={() => this._verify(this.state.user.id)}>Verify</button>
								:null
							}
						</div>
						<div className="col-md-12" style={{marginTop:"10px"}}>
							{
								(!this.state.user.isJoined)?
								<button className="btn btn-primary" onClick={() => this._verifyAddToPanel(this.state.user.id)}>Verify Add To Panel</button>
								:null
							}
						</div>
						<div className="col-md-12" style={{marginTop:"10px"}}>
							{
								(this.state.user.isJoined && !this.state.user.isJoinedVerified)?
								<button className="btn btn-primary" onClick={() => this._addToPanel(this.props.user[0].id)}>Add to panel</button>
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
