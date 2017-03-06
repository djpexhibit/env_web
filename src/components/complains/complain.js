import React from 'react';
import {connect} from 'react-redux';
import * as complainActions from '../../actions/complainActions';
import * as commentActions from '../../actions/commentActions';
import {bindActionCreators}  from 'redux';
import TextInput from '../common/TextInput';

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

	render(){
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

			<div>
				<form>
       				<TextInput name="details"  label="Add Response" value={this.state.comment.details} onChange={this.onChange}/>
       				<input type="submit" className="btn btn-primary" onClick={this.onSave}/>
       			</form>
			</div>

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