import React from 'react';
import {connect} from 'react-redux';
import * as complainActions from '../../actions/complainActions';
import * as commentActions from '../../actions/commentActions';
import * as userActions from '../../actions/userActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';
import ContainerWrapper from '../map/containerWrapper';
import ImageZoom from 'react-medium-image-zoom'


class Complain extends React.Component{

	constructor(props) {
		super(props);
		props.actions.loadComplainById(props.params.id);
		props.actions.loadCommentById(props.params.id);
		props.actions.loadProfUsers();

		this.state={
			comment : {
				type:'ADMIN',
				details:'',
				user_id:-1,
				complain_id:props.params.id
			}
		}

		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
		this.submitToAuth = this.submitToAuth.bind(this);
		this._resolved = this._resolved.bind(this);
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

		//browserHistory.push("/complains");
	}

	submitToAuth(){
		this.props.actions.updateAuthority(this.props.params.id, this.refs.profUser.value);
	}

	_resolved(compId){
		console.log(this.props);
		this.props.actions.resolved(compId);
	}

	_toggleHidePost(compId,hide){
		this.props.actions.toggleHidePost(compId,hide);
	}

	_deletePost(compId){
		this.props.actions.deletePost(compId);
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


					<div className="row">
						Currently Assigned To : {this.props.complain[0].assignedTo}
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
						(!this.props.complain[0].closed)?
						<div className="row" style={{marginTop:"30px", borderTop:"1px solid black", paddingTop:"10px"}}>
							<input type="button" className="btn btn-primary" value="Mark as Resolved" onClick={() => this._resolved(this.props.complain[0].id)}/>
						</div>:
						<div className="row" style={{marginTop:"30px", borderTop:"1px solid black", paddingTop:"10px"}}>
							<p>THIS COMPLAIN IS ALREADY RESOLVED</p>
						</div>
					}


				</div>
			);
		}
	}

	render(){



		if(this.props.complain && this.props.complain.length > 0 ){

			let markers = [
	            {
	                name: 'marker1',
	                loc: { lat: this.props.complain[0].lat, lng: this.props.complain[0].lng }
	            }
	        ];
		return(
			<div className="container">
				<br/>
				<div className="row">
					<div className="col-md-12">
						<p>Problem: {this.props.complain[0].type}</p>
					</div>
					<div className="col-md-12">
						<p>Location : {this.props.complain[0].location} </p>
					</div>
					<div className="col-md-12">
						<p>Party : {this.props.complain[0].res_person}</p>
					</div>
					<div className="col-md-12">
						<p>Reported By: {this.props.complain[0].user}</p>
					</div>
					<div className="col-md-12">
						<p>On: {this.props.complain[0].date}</p>
					</div>
					<div className="col-md-12">
						<p>{this.props.complain[0].details}</p>
					</div>
					<div className="col-md-12">
						{this.props.complain.map( (complain,index) => {
               				return (
												<ImageZoom
													image={{
														src: complain.image,
														alt: '',
														className: 'img',
														style : { width: '10%',height: '10%' }
													}}
													zoomImage={{
														src: 'http://139.59.63.193:3000' + '/complains/'+this.props.complain[0].id+'_'+index+'.jpg',
														alt: '',
														style : { width: '100%', height: '100%' }
													}}
										/>
                            )
                        })}

					</div>

				</div>

				<div style={{width: '80vw', height: '50vh', position: 'relative'}}>
					<ContainerWrapper markers={markers} lat={this.props.complain[0].lat} lng={this.props.complain[0].lng} />
				</div>

				<div className="pex-comment-section">
					<p> Comments: </p>

			{
				this.props.comments.map( (comment) => {
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

			{
				(sessionStorage.user_session && JSON.parse(sessionStorage.user_session).type === 'ADMIN_FULL') ?

				<div>
					(!this.props.complain[0].hidden)?
						<button onClick={ this._toggleHidePost(this.props.complain[0].id,1)}>Hide</button>
					: <button onClick={ this._toggleHidePost(this.props.complain[0].id,0)}>Visible</button>

					(!this.props.complain[0].deleted)?
						<button onClick={ this._deletePost(this.props.complain[0].id)}>Delete</button>
					: null;

				</div>
				: null
			}

			</div>
		);

		}else{
			return(
				<div>No Complains</div>
			)
		}


	}
}

function mapStateToProps(state, ownProps) {
    return{
        complain:state.complain,
        comments:state.comments,
				profUsers: state.profUsers
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, complainActions, commentActions, userActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Complain);
