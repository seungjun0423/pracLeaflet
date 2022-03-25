import React, { useState } from "react";
import { divIcon } from "leaflet";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  Marker,
  Tooltip,
  Popup,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import styled from "styled-components";

import "./MapContainer.css";
import InformationInTooltip from "./InformationInTooltip";
import InformationInPopup from "./InformationInPopup";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContainer = (props) => {
  const { targetProvince, totalSpots, selectedFbOption, selectSpot } = props;

  const mapUrls = {
    base: "https://xdworld.vworld.kr/2d/Base/201612/{z}/{x}/{y}.png",
    hybrid: "https://xdworld.vworld.kr/2d/Hybrid/201612/{z}/{x}/{y}.png",
    satellite: "https://xdworld.vworld.kr/2d/Satellite/201612/{z}/{x}/{y}.jpeg",
  };

  // const onClickMap = (e) => {
  //   setMarker(e.latlng);
  // };

  return (
    <Wrapper>
      <Map
        center={
          targetProvince && targetProvince.center
            ? [targetProvince.center.lat, targetProvince.center.lon]
            : [35.9078, 128.9]
        }
        zoom={targetProvince && targetProvince.zoom ? targetProvince.zoom : 11}
        minZoom={7}
        style={{ width: "100%" }}
        // onClick={onClickMap}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <ScaleControl
          metric={true}
          imperial={false}
          ScaleControl={true}
        ></ScaleControl>
        <TileLayer url={mapUrls.satellite} attribution="VWORLD" />
        <WMSTileLayer url={mapUrls.hybrid} />
        {selectedFbOption && totalSpots
          ? totalSpots.map((spot) => (
              <Marker
                onclick={() => {
                  selectSpot(spot);
                }}
                key={spot.id}
                position={[spot["lat"], spot["lon"]]}
                icon={divIcon({
                  className: "",
                  iconSize: [24, 24],
                  html: `<div style="background:${
                    spot[selectedFbOption.title]["color"]
                      ? spot[selectedFbOption.title]["color"]
                      : "white"
                  }; opacity: 0.8; height:24px; border-radius:50%;"><div/>`,
                })}
              >
                <Tooltip>{`${spot.stationName}(${spot.stationCode}: ${spot.stationType})`}</Tooltip>
              </Marker>
            ))
          : null}
      </Map>
    </Wrapper>
  );
};

export default MapContainer;
