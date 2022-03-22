import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

import FlowerInfectionDangerChart from "../components_v2/FlowerInfectionDangerChart";

const ChartWrapper = styled.div`
  width: 250px;
  height: 300px;
`;

const Span = styled.span`
  background-color: "#A768AE";
`;

const FbReportCardComponent = (props) => {
  const { stationFbData, cancelSelectSpot } = props;

  return (
    <div className="card">
      <button
        type="button"
        className="btn-close"
        onClick={() => {
          cancelSelectSpot(stationFbData);
        }}
      >
        ×
      </button>
      <h3 className="card-title">{`${stationFbData.stationName}(${stationFbData.stationCode}: ${stationFbData.stationType})`}</h3>
      <h3 className="card-title">꽃감염 위험도 그래프</h3>
      {/* <!-- 그래프 사이즈 width:250px height:300px --> */}
      <FlowerInfectionDangerChart />
      <hr />
      <h3 className="card-title">꽃병징 출현</h3>
      <ul className="dise-list">
        <li>
          {/* <span className="off">6-17</span>
          <span className="off">6-19</span>
          <span className="off">6-23</span> */}
          <span className="on">06-17</span>
        </li>
        <li>
          <span className="on">06-19</span>
        </li>
        <li>
          <span className="on">06-23</span>
        </li>
      </ul>
      <hr />
      <h3 className="card-title">궤양 활성 출현</h3>
      <ul className="dise-list">
        <li>
          <span className="on">06-08</span>
        </li>
      </ul>
      <hr />
      <h3 className="card-title">궤양 병징 출현</h3>
      <ul className="dise-list">
        <li>
          <span className="on">06-14</span>
        </li>
      </ul>
      <hr />
      <h3 className="card-title">신초 증상 출현</h3>
      <ul className="dise-list">
        <li>
          <span className="off">예측없음</span>
        </li>
      </ul>
    </div>
  );
};

export default FbReportCardComponent;
