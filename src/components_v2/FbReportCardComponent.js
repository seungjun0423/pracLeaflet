import React, { useEffect, useState } from "react";
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import styled from "styled-components";

import FlowerInfectionDangerChart from "../components_v2/FlowerInfectionDangerChart";
import { getStationFBReport } from "../context/api";

const FbReportCardComponent = (props) => {
  const { spotInfo, targetCrop, targetYear, cancelSelectSpot, nowDateTime } =
    props;
  const [reportData, setReportData] = useState({
    chartData: null,
    bbsDates: [],
    cmsDates: [],
    cbsDates: [],
    sbsDates: [],
  });

  useEffect(() => {
    if (spotInfo) {
      console.log("getStationFBReport", nowDateTime);
      getStationFBReport(
        (data) => {
          setReportData(data);
        },
        (data) => {
          console.log(data);
        },
        targetCrop,
        targetYear,
        null,
        spotInfo
      );
    }
  }, [spotInfo, targetYear, targetCrop, nowDateTime]);

  return (
    <div className="card">
      <button
        type="button"
        className="btn-close"
        onClick={() => {
          cancelSelectSpot(spotInfo);
        }}
      >
        ×
      </button>
      <h3 className="card-title">{`${spotInfo.stationName}(${spotInfo.stationCode}: ${spotInfo.stationType})`}</h3>
      <h3 className="card-title">꽃감염 위험도 그래프</h3>
      {/* <!-- 그래프 사이즈 width:250px height:300px --> */}
      <FlowerInfectionDangerChart data={reportData.chartData} />
      <hr />
      <h3 className="card-title">꽃 병징 출현</h3>
      <ul className="dise-list">
        {reportData.bbsDates && reportData.bbsDates.length > 0 ? (
          reportData.bbsDates.map((item) => (
            <li key={item.id}>
              <span className="on">
                {item.date
                  ? new Date(item.date)
                      .toISOString()
                      .slice(5, 10)
                      .replace("-", "/")
                  : "-"}
              </span>
            </li>
          ))
        ) : (
          <li>
            <span className="off">예측 없음</span>
          </li>
        )}
        {/* <li>
          <span className="on">06-17</span>
        </li>
        <li>
          <span className="on">06-19</span>
        </li>
        <li>
          <span className="on">06-23</span>
        </li> */}
      </ul>
      <hr />
      <h3 className="card-title">궤양 활성 출현</h3>
      <ul className="dise-list">
        {reportData.cmsDates && reportData.cmsDates.length > 0 ? (
          reportData.cmsDates.map((item) => (
            <li key={item.id}>
              <span className="on">
                {item.date
                  ? new Date(item.date)
                      .toISOString()
                      .slice(5, 10)
                      .replace("-", "/")
                  : "-"}
              </span>
            </li>
          ))
        ) : (
          <li>
            <span className="off">예측 없음</span>
          </li>
        )}
      </ul>
      <hr />
      <h3 className="card-title">궤양 가지 마름 출현</h3>
      <ul className="dise-list">
        {reportData.cbsDates && reportData.cbsDates.length > 0 ? (
          reportData.cbsDates.map((item) => (
            <li key={item.id}>
              <span className="on">
                {item.date
                  ? new Date(item.date)
                      .toISOString()
                      .slice(5, 10)
                      .replace("-", "/")
                  : "-"}
              </span>
            </li>
          ))
        ) : (
          <li>
            <span className="off">예측 없음</span>
          </li>
        )}
      </ul>
      <hr />
      <h3 className="card-title">신초 병징 출현</h3>
      <ul className="dise-list">
        {/* <li>
          <span className="off">예측없음</span>
        </li> */}
        {reportData.sbsDates && reportData.sbsDates.length > 0 ? (
          reportData.sbsDates.map((item) => (
            <li key={item.id}>
              <span className="on">
                {item.date
                  ? new Date(item.date)
                      .toISOString()
                      .slice(5, 10)
                      .replace("-", "/")
                  : "-"}
              </span>
            </li>
          ))
        ) : (
          <li>
            <span className="off">예측 없음</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FbReportCardComponent;
