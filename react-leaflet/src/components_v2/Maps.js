import React from "react";
import { divIcon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  Marker,
  Tooltip,
  // Popup,
  ScaleControl,
  ZoomControl,
  GeoJSON,
} from "react-leaflet";
import styled from "styled-components";

import "./Maps.css";
import KOREA_MAP from "../data/map/KOREA-MAP-V3.json";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Maps= (props) => {
  const {
    targetProvince,
    totalSpots,
    selectedFbOption,
    selectSpot,
    selectedStationType,
  } = props;

  const mapUrls = {
    base: "https://xdworld.vworld.kr/2d/Base/201612/{z}/{x}/{y}.png",
    hybrid: "https://xdworld.vworld.kr/2d/Hybrid/201612/{z}/{x}/{y}.png",
    satellite: "https://xdworld.vworld.kr/2d/Satellite/201612/{z}/{x}/{y}.jpeg",
  };

  // const onClickMap = (e) => {
  //   setMarker(e.latlng);
  // };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        console.log("mouseover");
      },
      mouseout: () => {
        console.log("mouseout");
      },
      click: () => {
        console.log("click");
      },
    });
  };
  return (
    <Wrapper>
      <MapContainer
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
        {selectedFbOption && totalSpots && selectedStationType
          ? totalSpots
              .filter((item) => {
                if (selectedStationType.id == 1) {
                  return true;
                } else {
                  return selectedStationType.typeName == item.stationType;
                }
              })
              .map((spot) => (
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
                  <Tooltip>{`${spot.stationName ? spot.stationName : "-"}(${
                    spot.stationCode ? spot.stationCode : "-"
                  }: ${spot.stationType ? spot.stationType : "-"})`}</Tooltip>
                </Marker>
              ))
          : null}
        <GeoJSON
          // onclick={() => {
          //   console.log("geojsonclick!!");
          // }}
          color={"black"}
          weight={2}
          opacity={0.5}
          fillColor={"white"}
          // fillOpacity={0.01}
          data={KOREA_MAP}
          onEachFeature={onEachFeature}
          // data={JEK_MAP}
        />
      </MapContainer>
    </Wrapper>
  );
};

export default Maps;
