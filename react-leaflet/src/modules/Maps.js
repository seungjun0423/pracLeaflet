import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';




class Maps extends Component {
  constructor(){
    super();
    this.state={
      lat: 51.505,
      lng: 10,
      zoom:13,
    }
  }
  render(){
    const position =[this.state.lat,this.state.lng];
    return(
      <div>
        <MapContainer style={{height:"100vh"}} center={position} zoom={this.state.zoom}>
          <TileLayer 
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
  
        </MapContainer>
      </div>
    )
  }
}

export default Maps;