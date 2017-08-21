import React from 'react';
import {connect} from 'react-redux';
import * as specieActions from '../../actions/specieActions';
import * as specieCommentActions from '../../actions/specieCommentActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';
import ContainerWrapper from '../map/containerWrapper';

class Specie extends React.Component{

	constructor(props) {
		super(props);
		props.actions.loadSpecieById(props.params.id);
		props.actions.loadSpeciesCommentById(props.params.id);

		this.state={
			comment : {
				type:'ADMIN',
				details:'',
				user_id:-1,
				species_id:props.params.id
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
		this.props.actions.addSpeciesComment(this.state.comment);

		//browserHistory.push("/species");
	}

	_generateCommentSection(){

		if(sessionStorage.user_session && JSON.parse(sessionStorage.user_session).type === 'ADMIN_FULL'){
			return(
				<div>

					<div className="row">
							<div className="row">
								<div className="col-md-12">
								<textarea placeholder="Add Response" name="details" className="form-control" rows="7" value={this.state.comment.details} onChange={this.onChange} />
								</div>
							</div>
							<div className="row" style={{marginTop:"5px"}}>
								<div className="col-md-2 col-md-offset-10">
									<input type="submit" value="Add Comment" className="btn btn-primary" onClick={this.onSave}/>
								</div>
							</div>
					</div>


					{/*<div className="row">
						Currently Assigned To : {this.props.specie[0].assignedTo}
					</div>

					<div className="row">
						<div className="row">
							<div className="col-md-6">
								<select  className="form-control" ref="profUser" >
									{
										this.props.profUsers.map(profUser =>
											 <option value={profUser.id}>{profUser.name}</option>
										)
									}
								</select>
							</div>
							<div className="col-md-3">
								<input type="button" className="btn btn-primary" value="Submit to authorities" onClick={() => this.submitToAuth()}/>
							</div>
						</div>

					</div>

					{
						(!this.props.specie[0].closed)?
						<div className="row" style={{marginTop:"30px", borderTop:"1px solid black", paddingTop:"10px"}}>
							<input type="button" className="btn btn-primary" value="Mark as Resolved" onClick={() => this._resolved(this.props.complain[0].id)}/>
						</div>:
						<div className="row" style={{marginTop:"30px", borderTop:"1px solid black", paddingTop:"10px"}}>
							<p>THIS COMPLAIN IS ALREADY RESOLVED</p>
						</div>
					}*/}


				</div>
			);
		}
	}

	render(){



		if(this.props.specie && this.props.specie.length > 0 ){

			let markers = [
	            {
	                name: 'marker1',
	                loc: { lat: this.props.specie[0].lat, lng: this.props.specie[0].lng }
	            }
	        ];

		return(
			<div className="container">
				<br/>
				<div className="row">
					<div className="col-md-12">
						<p>Problem: {this.props.specie[0].type}</p>
					</div>
					<div className="col-md-12">
						<p>Location : {this.props.specie[0].location} </p>
					</div>
					<div className="col-md-12">
						<p>Party : {this.props.specie[0].res_person}</p>
					</div>
					<div className="col-md-12">
						<p>Reported By: {this.props.specie[0].user}</p>
					</div>
					<div className="col-md-12">
						<p>On: {this.props.specie[0].date}</p>
					</div>
					<div className="col-md-12">
						<p>{this.props.specie[0].details}</p>
					</div>
					<div className="col-md-12">
						{this.props.specie.map( specie => {
               				return (
                            	<img src={specie.image} />
                            )
                        })}

					</div>
				</div>

				<div style={{width: '80vw', height: '50vh', position: 'relative'}}>
					<ContainerWrapper markers={markers} lat={this.props.specie[0].lat} lng={this.props.specie[0].lng} />
				</div>

				<div className="pex-comment-section">
					<p> Comments: </p>

			{
				this.props.speciesComments.map( (comment) => {
					return <div className="row">
						<div className="col-md-12">
							<div>name: {comment.user}</div>
						</div>
						<div className="col-md-12">
							<div>on: {comment.date}</div>
						</div>
						<div className="col-md-12">
							<p>{comment.details}</p>
						</div>
					</div>
				})
			}


			{ this._generateCommentSection()}



			</div>

			</div>
		);

		}else{
			return(
				<div>No Species</div>
			)
		}


	}
}

function mapStateToProps(state, ownProps) {
	debugger;
    return{
        specie:state.specie,
        speciesComments:state.speciesComments
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, specieActions, specieCommentActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Specie);
