import React,{Component, useState,useEffect,useRef, Fragment} from 'react';
import { MapContainer, TileLayer, useMap,Marker, Popup} from 'react-leaflet';

import "../modules/Map.css"

const Maps = () =>{
  const [state, setstate] = useState({'lat':51,'lon':10,'zoom':13});

  return(
    <Fragment>
      <MapContainer center={[35.9078,128.9]} zoom={13} scrollWheelZoom={false}>
        <TileLayer 
          url="https://xdworld.vworld.kr/2d/hybrid/201612/{z}/{x}/{y}/jpeg" 
        />
        <Marker position={[35.9078,128.9]}>
        </Marker>
      </MapContainer>
    </Fragment>
  )
}
export default Maps