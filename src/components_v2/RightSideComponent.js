import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

import { targetCrops, fireblightStatus } from "../data/fireblightOptionData";
import { provinces } from "../data/provinces";
import LegendComponent from "../components_v2/LegendComponent";
import MapContainer from "./MapContainer";
import { getFBSpots } from "../context/api";

const getYearOptions = (minDate, todayDate) => {
  if (minDate && todayDate) {
    let yearOptions = [];
    const minDateYear = new Date(minDate).getFullYear();
    let currentYear = new Date(todayDate).getFullYear();
    while (minDateYear <= currentYear) {
      yearOptions.push(currentYear);
      currentYear -= 1;
    }
    return yearOptions;
  }
};

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const RightSideComponent = (props) => {
  const {
    maxStationCount,
    minDate,
    today,
    totalSpots,
    setTotalSpots,
    targetCrop,
    setTargetCrop,
    targetYear,
    setTargetYear,
    targetDate,
    setTargetDate,
    targetProvince,
    setTargetProvince,
    selectedSpots,
    setSelectedSpots,
    selectSpot,
  } = props;

  const [yearOptions, setYearOptions] = useState([]);
  const [selectedFbOption, setSelectedFbOption] = useState(fireblightStatus[0]);

  const onChangeTargetCrop = (e) => {
    const cropId = e.target.value;
    const target = targetCrops.filter((item) => item.id == cropId)[0];
    if (target) {
      setTargetCrop(target);
    }
  };

  const onChangeYearOption = (e) => {
    setTargetYear(e.target.value);
    if (targetDate) {
      // 만약 날짜가 선택되어있다면, 연도만 바꿔주도록
      let tempDate = new Date(targetDate);
      tempDate.setFullYear(e.target.value);
      setTargetDate(tempDate);
    }
    // let tempDate = new Date(targetDate);
    // tempDate.setFullYear(e.target.value);
    // setTargetDate(tempDate);
  };

  const onChangeProvince = (e) => {
    const provinceId = e.target.value;
    const target = provinces.filter((item) => item.id == provinceId)[0];
    if (target) {
      setTargetProvince(target);
    }
  };

  const onChangeTargetDate = (e) => {
    setTargetDate(e.target.value);
  };

  useEffect(() => {
    setYearOptions(getYearOptions(minDate, today));
    if (targetYear && targetCrop) {
      getFBSpots(
        (data) => {
          setTotalSpots(data);
        },
        (data) => {
          console.log(data);
        },
        targetCrop,
        targetYear,
        targetDate
      );
    }
  }, [targetYear, targetDate, targetCrop]);

  return (
    <div className="container right">
      <div className="select-area position-1">
        <div className="form-inline box">
          <h3>연도 조회</h3>
          <div className="form-group">
            <select className="form" onChange={onChangeTargetCrop}>
              {targetCrops.map((crop) => (
                <option id={`cropOption-${crop.id}`} value={crop.id}>
                  {crop.titleKo}
                </option>
              ))}
            </select>
            <select className="form" onChange={onChangeYearOption}>
              {yearOptions.map((year) => (
                <option id={`yearOption-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select className="form" onChange={onChangeProvince}>
              {provinces.map((province) => (
                <option
                  id={`provinceOption-${province.id}`}
                  value={province.id}
                >
                  {province.titleKo ? province.titleKo : "-"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="select-area position-2">
        <div className="form-inline box">
          <div className="form-group">
            <h3 for="">일자 조회</h3>
            <input
              id="lookUpFBDate"
              className="form"
              type="date"
              onChange={onChangeTargetDate}
              min={targetYear ? `${targetYear}-01-01` : ""}
              max={targetYear ? `${targetYear}-12-31` : ""}
              value={
                targetDate
                  ? new Date(targetDate).toISOString().slice(0, 10)
                  : ""
              }
            />
          </div>
        </div>
      </div>
      <div className="button-area box">
        <ul className="btn-list">
          {fireblightStatus.map((item) => (
            <li
              className={
                selectedFbOption.id === item.id ? "active" : "inactive"
              }
            >
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setSelectedFbOption(item);
                }}
              >
                {item.titleKo}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="legend-area box">
        <LegendComponent
          data={
            selectedFbOption && selectedFbOption.statusList
              ? selectedFbOption.statusList
              : []
          }
        />
      </div>
      <div className="map">
        <MapContainer
          targetProvince={targetProvince}
          totalSpots={totalSpots}
          selectedFbOption={selectedFbOption}
          selectSpot={selectSpot}
        />
      </div>
    </div>
  );
};

export default RightSideComponent;
