import React, {Component} from 'react';
import {Card, NavLink} from 'reactstrap';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const defaultZoom = 15;
const defaultCenter = {lat: 12.23893, lng: 109.1906241};
const locations = [
  {
    lat: 12.2406224,
    lng: 109.1956035,
    label: 'S',
    draggable: false,
    title: 'Tháp Trầm Hương Nha Trang',
    www: 'https://www.vntrip.vn/cam-nang/thap-tram-huong-diem-den-thu-vi-trong-tour-du-lich-nha-trang-1043'
  },
];

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return locations.map((location, index) => {
        return (
          <MarkerWithInfoWindow key={index.toString()} location={location}/>
        )
      }
    );
  }
}

class MarkerWithInfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const {location} = this.props;

    return (
      <Marker onClick={this.toggle} position={location} title={location.title} label={location.label}>
        {this.state.isOpen &&
        <InfoWindow onCloseClick={this.toggle}>
          <NavLink href={location.www} target="_blank">{location.title}</NavLink>
        </InfoWindow>}
      </Marker>
    )
  }
}

const GoogleMapsComponent = withScriptjs(withGoogleMap((props) => {
    return (
      <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
        {<MarkerList locations={locations}/>}
      </GoogleMap>
    );
  }
));

class ReactGoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app

  render() {
    return (
    <div className="animated fadeIn">
      <Card>
        <GoogleMapsComponent
          key="map"
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAEAvUdLih83LPnbBVyhxydBHTO1NsqyYE"
          loadingElement={<div style={{height: `100%`}}/>}
          containerElement={<div style={{height: `600px`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
        />
      </Card>
    </div>
    )
  }
}

export default ReactGoogleMaps;