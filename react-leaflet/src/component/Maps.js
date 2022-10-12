import React, { Component } from 'react';
import { divIcon} from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';




const Maps=()=>{ 
  return(
    <div>
      <MapContainer style={{height:"100vh"}} center={[36,129]} zoom={7}>
        <TileLayer 
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[36,129]} icon={divIcon({})}>
          <Popup>
            ok
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}


export default Maps;