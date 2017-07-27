import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../common/TextInput';
import * as eventActions from '../../actions/eventActions';
import {browserHistory} from 'react-router'


class Event extends React.Component{

  constructor(props,context){
    super(props,context);

    this.state={
      events:{
        name:'',
        location:'',
        date:''
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount(){
    this.loadEvents();
  }

  onChange(e){
		const field = e.target.name;
		const events = this.state.events;
		events[field] = e.target.value;
		return this.setState({events:events})
	}

  onSave(event) {
		event.preventDefault();
    console.log(">>>>>");
    console.log(this.state.events);
		this.props.actions.addEvent(this.state.events);
		//browserHistory.push("/home/complains");
	}


  loadEvents(){
    this.props.actions.loadEvents();
  }

  deleteEvent(id){
    this.props.actions.deleteEvent(id);
  }

  render(){
    let error = this.props.location.query.error;
    console.log("^^^^^^");
    console.log(this.props);
    return(
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
				        { error?
					             <div style={{color:"red"}}>
						                   Authentication Failed
					             </div>:null
				        }
                <TextInput
                  name="name"
                  label="Name"
                  value={this.state.events.name}
                  onChange={this.onChange}/>

                <TextInput
                  name="location"
                  label="Location"
                  value={this.state.events.location}
                  onChange={this.onChange} />

                <TextInput
                  name="date"
                  label="Date"
                  value={this.state.events.date}
                  onChange={this.onChange} />

                <input type="submit" className="btn btn-primary" onClick={this.onSave}/>

          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-md-3">
                Event
              </div>
              <div className="col-md-3">
                Location
              </div>
              <div className="col-md-3">
                Date
              </div>
              <div className="col-md-3">
                Remove
              </div>
            </div>
            {
              this.props.events.map(event => {
                return (
                  <div className="row">
                    <div className="col-md-3">
                      {event.name}
                    </div>
                    <div className="col-md-3">
                      {event.location}
                    </div>
                    <div className="col-md-3">
                      {event.date}
                    </div>
                    <div className="col-md-3">
                      <button onClick={() => this.deleteEvent(event.id)}>X</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions : bindActionCreators(Object.assign({}, eventActions),dispatch)
	};
}

function mapStateToProps(state, ownProps){
    return {
        events:state.events
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
