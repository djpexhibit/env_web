import React from 'react';
import {connect} from 'react-redux';
import * as specieActions from '../../actions/specieActions';
import {bindActionCreators} from 'redux';
import {Col, PageHeader, Jumbotron, Form, Input, ButtonInput } from 'react-bootstrap';
import {Link} from 'react-router';

class Species extends React.Component{

	constructor(props) {
		super(props);

		this.props.actions.loadSpecies();

		this._continue = this._continue.bind(this);
		this._removeSpecie = this._removeSpecie.bind(this);
	}

	_continue(id){
		console.log(id)
	}

	_removeSpecie(e,specie){
		this.props.actions.removeSpecie(specie);
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
							<h2 style={homeStyle.headerPadding}> Species List </h2>
							{this.props.species.map( specie => {
								return (
									<div className="row" style={{marginBottom:"5px", padding:"5px", borderBottom:"1px solid #aaa9aa"}}>
										<Link to={'/specie/' + specie.id}>
											<div onClick={() => this._continue(specie.id)}>
												<Col md={3}>
													{specie.type}
												</Col>
												<Col md={3}>
													{specie.name}
												</Col>
												<Col md={5}>
													{specie.specname}
												</Col>
											</div>
										</Link>

										<div className="col-md-1">
											<button className="btn btn-danger" onClick={(e)=> this._removeSpecie(e,specie)}> X </button>
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
        species:state.species
    };


}


function mapDispatchToProps(dispatch){
	return{
		actions : bindActionCreators(Object.assign({}, specieActions),dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps )(Species);
