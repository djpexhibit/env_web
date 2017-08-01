import React from 'react';
import {connect} from 'react-redux';
import * as complainActions from '../../actions/complainActions';
import * as commentActions from '../../actions/commentActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';
import ContainerWrapper from '../map/containerWrapper';

class Complain extends React.Component{

	constructor(props) {
		super(props);
		props.actions.loadComplainById(props.params.id);
		props.actions.loadCommentById(props.params.id);

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

		let markers = [
            {
                name: 'marker1',
                loc: { lat: this.props.complain[0].lat, lng: this.props.complain[0].lng }
            }
        ];

		if(this.props.complain && this.props.complain.length > 0 ){
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
						{this.props.complain.map( complain => {
               				return (
                            	<img src={complain.image} />
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
        comments:state.comments
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, complainActions, commentActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Complain);
