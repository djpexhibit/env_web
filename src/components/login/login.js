import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../common/TextInput';
import * as sessionActions from '../../actions/sessionActions';
import {browserHistory} from 'react-router';


class Login extends React.Component{

	constructor(props) {
		super(props);
		
		this.state={
			credentials:{
				email:'',
				password:''
			}
		}

		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onChange(event){
		const field = event.target.name;
		const credentials = this.state.credentials;
		credentials[field] = event.target.value;
		return this.setState({credentials:credentials})
	}

	onSave(event) {
		event.preventDefault();
		this.props.actions.logInUser(this.state.credentials);
		console.log("sssssssss")
		browserHistory.push("/complains");
	}

	render() {
		return(
			<div className="col-md-8 col-md-offset-2 ">
				<form>
       				<TextInput name="email"  label="email" value={this.state.credentials.email} onChange={this.onChange}/>
       				<TextInput name="password" label="password" type="password" value={this.state.credentials.password} onChange={this.onChange}/>
       				<input type="submit" className="btn btn-primary" onClick={this.onSave}/>
       			</form>
       		</div>
       	);
    }

}


function mapDispatchToProps(dispatch) {
	return {
		actions : bindActionCreators(Object.assign({}, sessionActions),dispatch)
	};
}

export default connect(null, mapDispatchToProps)(Login);