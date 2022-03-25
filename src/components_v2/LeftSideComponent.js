import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import FbReportCardComponent from "./FbReportCardComponent";

const LeftSideComponent = (props) => {
  // const { stations } = props;
  const {
    maxStationCount,
    targetCrop,
    targetYear,
    targetDate,
    selectedSpots,
    setSelectedSpots,
    cancelSelectSpot,
  } = props;
  return (
    <div className="container left">
      <h1 className="title-top">전국 과수화상병 모니터링 서비스</h1>
      <h2 className="title-sub">
        과수화상병 예측<small>/</small>
        {targetCrop ? targetCrop.titleKo : "-"}
        <small>/</small>
        {targetYear ? targetYear : "-"}
        {/* {targetDate
          ? new Date(targetDate).toISOString().slice(0, 10)
          : targetYear
          ? targetYear
          : "-"} */}
        <small className="title-small">
          {`지점 선택은 최대 ${
            maxStationCount > 0 ? maxStationCount : "-"
          }곳까지
          가능합니다.`}
        </small>
      </h2>
      <div className="pd-rl10">
        <div className="card-box">
          <div className="card-scroll">
            {!selectedSpots || selectedSpots.length < 1 ? (
              <p className="guide-text">
                선택된 지점이 없습니다.
                <br />
                오른쪽 지도에서 지점을 선택하여 주세요.
                <br />
                <small>(최대 4곳까지 선택 가능합니다.)</small>
              </p>
            ) : (
              selectedSpots.map((spotInfo) => (
                <FbReportCardComponent
                  spotInfo={spotInfo}
                  targetCrop={targetCrop}
                  targetYear={targetYear}
                  targetDate={targetDate}
                  cancelSelectSpot={cancelSelectSpot}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideComponent;
