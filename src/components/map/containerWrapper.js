import React, { Component } from 'react';
import {Container} from './container';
import Map, { GoogleApiWrapper} from 'google-maps-react';

const __GAPI_KEY__ = 'AIzaSyBfCXt9x7IGtBgqaCUxehq_Gb-hmAeFy2w';

class ContainerWrapper extends Component {

  constructor(props, context) {
    super(props, context);
  }

    render() {
      const props = this.props;
      const {google} = this.props;
      const {center} = this.props;

      return (
        <Map google={google}
            style={{width: '80vw', height: '50vh', position: 'relative'}}
            className={'map'}
            center={center}
            visible={false}>
            <Container {...props} />
        </Map>
      );
    }
}

ContainerWrapper.propTypes = {
  google: React.PropTypes.object.isRequired
};

ContainerWrapper.propTypes = {
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  center: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.object
  ])
};

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__,
  version: '3.26'
})(ContainerWrapper);
