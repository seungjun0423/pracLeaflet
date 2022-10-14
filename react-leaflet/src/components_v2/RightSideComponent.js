import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LegendComponent from "./LegendComponent";
import Maps from "./Maps";
import { targetCrops, fireblightStatus } from "../data/fireblightOptionData";
import { provinces } from "../data/provinces";
import { stationTypes } from "../data/stationOptionData";
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

const RightSideComponent = (props) => {
  const {
    // maxStationCount,
    setLoading,
    setError,
    minDate,
    maxDate,
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
    // selectedSpots,
    // setSelectedSpots,
    selectSpot,
    onClickRefreshButton,
    nowDateTime,
  } = props;

  const [yearOptions, setYearOptions] = useState([]);
  const [selectedFbOption, setSelectedFbOption] = useState(fireblightStatus[0]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedStationType, setSelectedStationType] = useState(
    stationTypes[0]
  );

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

  const onChangeSelectedStationType = (e) => {
    const stationTypeId = e.target.value;
    const targetStationType = stationTypes.filter(
      (item) => item.id == stationTypeId
    )[0];
    if (targetStationType) {
      setSelectedStationType(targetStationType);
    }
  };

  useEffect(() => {
    setYearOptions(getYearOptions(minDate, today));
    if (targetYear && targetCrop) {
      getFBSpots(
        (data) => {
          setTotalSpots(data);
        },
        (data) => {
          setLoading(data);
        },
        (data) => {
          setError(data);
        },
        targetCrop,
        targetYear,
        targetDate
      );
    }
  }, [targetYear, targetDate, targetCrop, nowDateTime]);

  return (
    <div className="container right">
      <div className="select-area position-1">
        <div className="form-inline box">
          <h3>연도 조회</h3>
          <div className="form-group">
            <select className="form" onChange={onChangeTargetCrop}>
              {targetCrops.map((crop) => (
                <option key={`cropOption-${crop.id}`} value={crop.id}>
                  {crop.titleKo}
                </option>
              ))}
            </select>
            <select className="form" onChange={onChangeYearOption}>
              {yearOptions.map((year) => (
                <option key={`yearOption-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select className="form" onChange={onChangeProvince}>
              {provinces.map((province) => (
                <option
                  key={`provinceOption-${province.id}`}
                  value={province.id}
                >
                  {province.titleKo ? province.titleKo : "-"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-inline box">
          <label htmlFor="stationTypeSelector">관측지점 타입 분류</label>
          <select
            id="stationTypeSelector"
            className="form"
            onChange={onChangeSelectedStationType}
          >
            {stationTypes.map((stationType) => (
              <option key={stationType.id} value={stationType.id}>
                {stationType.typeName ? stationType.typeName : "-"}
              </option>
            ))}
          </select>
        </div>
        <div className="form-inline box">
          <button
            type="button"
            className="btn"
            onClick={() => {
              onClickRefreshButton();
              setIsButtonClicked(!isButtonClicked);
            }}
          >
            {isButtonClicked
              ? `자동 새로고침 중지 (마지막 업데이트: ${
                  nowDateTime
                    ? `${nowDateTime.toISOString().slice(0, 10)} ${nowDateTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${nowDateTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}:${nowDateTime
                        .getSeconds()
                        .toString()
                        .padStart(2, "0")}`
                    : "-"
                })`
              : "자동 새로고침 (1시간 간격)"}
          </button>
        </div>
      </div>
      <div className="select-area position-2">
        <div className="form-inline box">
          <div className="form-group">
            <h3 htmlFor="lookUpFBDate">일자 조회</h3>
            <input
              id="lookUpFBDate"
              className="form"
              type="date"
              onChange={onChangeTargetDate}
              min={targetYear ? `${targetYear}-01-01` : ""}
              max={
                targetYear && targetYear == new Date().getFullYear()
                  ? new Date(maxDate).toISOString().slice(0, 10)
                  : `${targetYear}-12-31`
              }
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
              key={item.id}
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
        <Maps
          targetProvince={targetProvince}
          totalSpots={totalSpots}
          selectedFbOption={selectedFbOption}
          selectSpot={selectSpot}
          selectedStationType={selectedStationType}
        />
      </div>
    </div>
  );
};

export default RightSideComponent;
