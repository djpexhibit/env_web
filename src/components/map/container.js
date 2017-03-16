import React, { PropTypes as T } from 'react';
import Map, { Marker, InfoWindow } from 'google-maps-react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

export class Container extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlaceName: "",
      visitingAddress: {
          city:"",
          postalCode:"",
          streetName:""
        },
      openingHours:{
        mondayFriday:"",
        saturday:"",
        sunday:""
      },
      initCenter: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      markerElements : []
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.getBoundsZoomLevel = this.getBoundsZoomLevel.bind(this);
    this.setBounds = this.setBounds.bind(this);
  }



  componentDidMount(){
    //this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    const map = this.props;
    if(this.refs.autocomplete){
      this.renderAutoComplete();
    }
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
    this.setBounds();
  }

  fetchPlaces(){
    let markerEls = [];
    this.props.markers.map((marker,index) => {
      let ele = this.refs[index].marker;
      markerEls.push(ele);
    });

    this.setState({
      showingInfoWindow: false,
      markerElements : markerEls,
      activeMarker:markerEls[0],
      selectedPlaceName:this.props.markers[0].name,
      visitingAddress:this.props.markers[0].visitingAddress,
      openingHours:this.props.markers[0].openingHours
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }


  renderAutoComplete() {

    const {google, map} = this.props;

    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    let autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.props.loadDropOffLocations({
        "manufacture": "Apple",
        "model": "iPhone6,2",
        "latitude": place.geometry.location.lat(),
        "longitude": place.geometry.location.lng()
      });

      let center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      this.props.setCenter(center);

    });
  }

  setBounds() {
    const {google, map, markers} = this.props;

    if (!google || !map || !markers) return;

    let minMarker;
    let maxMarker;
    markers.forEach((marker) => {
      if (!minMarker) {
        minMarker = marker;
      } else {
        (minMarker.loc.lat > marker.loc.lat && minMarker.loc.lng < marker.loc.lng) ? minMarker = marker : minMarker;
      }

      if (!maxMarker) {
        maxMarker = marker;
      } else {
        (maxMarker.loc.lat < marker.loc.lat && maxMarker.loc.lng > marker.loc.lng) ? maxMarker = marker : minMarker;
      }

    });
    const bounds = new google.maps.LatLngBounds({map: map, position: new google.maps.LatLng(59.340753, 18.028518)}, {map: map, position: new google.maps.LatLng(59.409551, 17.92582)});

    map.setZoom(this.getBoundsZoomLevel(bounds, {height: this.props.height, width: this.props.width}));

    map.fitBounds();

  }

  getBoundsZoomLevel(bounds, mapDim) {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    function latRad(lat) {
        const sin = Math.sin(lat * Math.PI / 180);
        const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

  onMarkerClick(props, marker) {
    this.setState({
      selectedPlaceName: props.name,
      visitingAddress: props.visitingAddress,
      openingHours: props.openingHours,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const style = {
      width: '60vw',
      height: '50vh'
    };

    if (!this.props.loaded || !this.props.markers) {
      return <div>Loading...</div>;
    }

    const {markers} = this.props;

    return (

      <div style={style}>
        
       { 
        (this.state.initCenter.lat !== 0) ?
        <Map google={this.props.google}
                 style={{width: '80vw', height: '50vh', position: 'relative'}}
                 zoom={14}
                 initCenter={{lat:this.state.initCenter.lat, lng: this.state.initCenter.lng}}
                 center={{lat:this.state.initCenter.lat, lng: this.state.initCenter.lng}}
                 visible={true}
                 centerAroundCurrentLocation={false}
                 onClick={this.onMapClicked} >
                 <Marker name={'Location'} position={{lat:this.state.initCenter.lat, lng: this.state.initCenter.lng}} />
        </Map>
        :
        <Map google={this.props.google}
                 style={{width: '80vw', height: '50vh', position: 'relative'}}
                 zoom={14}
                 visible={true}
                 centerAroundCurrentLocation={true}
                 onClick={this.onMapClicked} />

        }
      </div>
    );
  }
}





export default Container;
