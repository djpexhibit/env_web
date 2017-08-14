import React from 'react';
import {connect} from 'react-redux';
import * as complainActions from '../../actions/complainActions';
import {bindActionCreators} from 'redux';
import {Col, PageHeader, Jumbotron, Form, Input, ButtonInput } from 'react-bootstrap';
import {Link} from 'react-router';

class Complains extends React.Component{

	constructor(props) {
		super(props);

		this.props.actions.loadComplains();

		this._continue = this._continue.bind(this);
		this._removeComplain = this._removeComplain.bind(this);
	}

	_continue(id){
		console.log(id)
	}

	_removeComplain(e,complain){
		this.props.actions.removeComplain(complain);
	}

	_loadImg(id){
		let imgPath = `/complains/${id}_0.jpg`;
		return(
			<img src={imgPath} style={{"width":"200px";"height":"200px"}} />
		)
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
							<h2 style={homeStyle.headerPadding}> Complains List </h2>
							{this.props.complains.map( complain => {
								return (
									<div className="row" style={{marginBottom:"5px", padding:"5px", borderBottom:"1px solid #aaa9aa"}}>
										<Link to={'/complain/' + complain.id}>
											<div onClick={() => this._continue(complain.id)}>
												<Col md={3}>
													{this._loadImg(complain.id)}
												</Col>
												<Col md={3}>
													{complain.type}
												</Col>
												<Col md={2}>
													{complain.res_person}
												</Col>
												<Col md={3}>
													{complain.details}...
												</Col>
											</div>
										</Link>

										{
											(sessionStorage.user_session && JSON.parse(sessionStorage.user_session).type === 'ADMIN_FULL')?

										<div className="col-md-1">
											<button className="btn btn-danger" onClick={(e)=> this._removeComplain(e,complain)}> X </button>
										</div>
										:null
										}
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
        complains:state.complains
    };


}


function mapDispatchToProps(dispatch){
	return{
		actions : bindActionCreators(Object.assign({}, complainActions),dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps )(Complains);
