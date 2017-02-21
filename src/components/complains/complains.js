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
	}

	_continue(id){
		console.log(id)
	}

	render() {
		const homeStyle = {
            mainContainer : { background:'white' },
            headerPadding :{ paddingBottom:'1em' }
        };



		return(
			<div className='container'>
				
                                       
                                       
                                        	<div style={homeStyle.mainContainer}>
                        						<Col xs={12} md={10} >
                            						<div style={homeStyle.mainContainer}>
                                						<h2 style={homeStyle.headerPadding}> Complains List </h2>
                                						{this.props.complains.map( complain => {
                                								return (
                                									<Link to={'/complain/' + complain.id}>
                                            						<div onClick={() => this._continue(complain.id)}>
                                            							<Col md={3}>
                                                							{complain.type}
                                                						</Col> 
                                                						<Col md={3}>
                                                							{complain.res_person}
                                                						</Col>
                                                						<Col md={4}>
                                                							{complain.details}...
                                                						</Col>
                                            						</div>
                                            						</Link>            
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