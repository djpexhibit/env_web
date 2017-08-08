import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import {bindActionCreators} from 'redux';
import {Col, PageHeader, Jumbotron, Form, Input, ButtonInput } from 'react-bootstrap';
import {Link} from 'react-router';

class Users extends React.Component{

	constructor(props) {
		super(props);

		this.props.actions.loadUsers();

		this._continue = this._continue.bind(this);
		this._removeUser = this._removeUser.bind(this);
	}

	_continue(id){
		console.log(id)
	}

	_removeUser(e,user){
		this.props.actions.removeUser(user);
	}

	render() {

		const homeStyle = {
			mainContainer : { background:'white' },
			headerPadding :{ paddingBottom:'1em' }
		};

		return(
			<div className='container'>
				<div style={homeStyle.mainContainer}>
					<Col xs={12} md={12} >
						<div style={homeStyle.mainContainer}>
							<h2 style={homeStyle.headerPadding}> Users List </h2>
							{this.props.users.map( user => {
								return (
									<div className="row" style={{marginBottom:"5px", padding:"5px", borderBottom:"1px solid #aaa9aa"}}>
										<Link to={'/user/' + user.id}>
											<div onClick={() => this._continue(user.id)}>
												<Col md={3}>
													{user.type}
												</Col>
												<Col md={3}>
													{user.name}
												</Col>
												<Col md={5}>
													{user.specname}
												</Col>
											</div>
										</Link>

										<div className="col-md-1">
											<button className="btn btn-danger" onClick={(e)=> this._removeUser(e,user)}> X </button>
										</div>
									</div>
                )
              })}
						</div>
					</Col>
				</div>
			</div>
    );
  }

}

function mapStateToProps(state, ownProps){
    return {
        users:state.users
    };


}


function mapDispatchToProps(dispatch){
	return{
		actions : bindActionCreators(Object.assign({}, userActions),dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps )(Users);
