import React from 'react';
import {connect} from 'react-redux';
import * as advActions from '../../actions/advActions';
import {bindActionCreators}  from 'redux';

class Adv extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewUrl: ''
		};
	}

	_handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    this.props.actions.addAdv(this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    console.log(">>>>>>>>> 111");
    console.log(e)

    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(file)

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

	render() {
		return(
			<div className="col-md-8 col-md-offset-2 pex-login-box">
				<form onSubmit={(e)=>this._handleSubmit(e)}>
					<input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
					<button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
				</form>
				<div className="imgPreview">
					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
    return{
        advs:state.advs
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, advActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Adv);