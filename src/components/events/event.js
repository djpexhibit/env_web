import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../common/TextInput';
import * as eventActions from '../../actions/eventActions';
import {browserHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


class Event extends React.Component{

  constructor(props,context){
    super(props,context);

    this.state={
      events:{
        name:'',
        location:'',
        date:''
      },
      clDate : '',
      errMsg : '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);

    this.handleChange = this.handleChange.bind(this);
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

    if(!this.state.events.name || !this.state.events.location || !this.state.events.date){
      this.setState({
        errMsg: 'Please fill the details'
      })
      return false;
    }

		this.props.actions.addEvent(this.state.events);

    this.setState({
      errMsg:'',
      events:{
        location:'',
        name:'',
        date:''
      },
      clDate:''
    })

	}


  loadEvents(){
    this.props.actions.loadEvents();
  }

  deleteEvent(id){
    this.props.actions.deleteEvent(id);
  }

  handleChange(date) {
    let fDate = date.toDate();

    let day = fDate.getDate();
    let monthIndex = fDate.getMonth();
    let year = fDate.getFullYear();

    const events = this.state.events;
    events.date = year + '-' + (monthIndex+1) + '-' + day

    this.setState({
      clDate: moment(date),
      events: events
    });
  }

  render(){
    let error = this.props.location.query.error;

    return(
      <div>
        <div className="row" style={{marginBottom:'20px'}}>
          <div className="col-md-8 col-md-offset-2">
				        { error?
					             <div style={{color:"red"}}>
						                   Authentication Failed
					             </div>:null
				        }
                {
                  this.state.errMsg?
                  <div style={{color:"red"}}>
                          {this.state.errMsg}
                  </div>:null
                }


                  <label for="narea">Event
                    <textarea style={{verticalAlign:'top',marginLeft:'5px'}} id="narea" name="name" cols="40" rows="5" value={this.state.events.name} onChange={this.onChange}></textarea>
                  </label>


                <TextInput
                  name="location"
                  label="Location"
                  value={this.state.events.location}
                  onChange={this.onChange} />

                <label>Date</label>
                <DatePicker dateFormat="YYYY-MM-DD" selected={this.state.clDate} onChange={this.handleChange} />
                <br/>
                <input type="submit" className="btn btn-primary" onClick={this.onSave}/>

          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="row" style={{marginBottom:'10px'}}>
              <div className="col-md-3" style={{fontWeight:'bold'}}>
                Event
              </div>
              <div className="col-md-3" style={{fontWeight:'bold'}}>
                Location
              </div>
              <div className="col-md-3" style={{fontWeight:'bold'}}>
                Date
              </div>
              <div className="col-md-3" style={{fontWeight:'bold'}}>
                Remove
              </div>
            </div>
            {
              this.props.events.map(event => {
                return (
                  <div className="row" style={{marginBottom:'10px', borderBottom:'1px solid black'}}>
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
