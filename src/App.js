import React, { useState, useEffect, useRef } from "react";
// import React, { useEffect, useState, useRef, useCallback } from "react";
import ResizePanel from "react-resize-panel";
// import axios from "axios";
import styled from "styled-components";

import "./css/common.css";
import "./css/layout.css";
// import stations from "./data/station.json";
// import fbSpots from "./data/fireblightSpots.json";
import { provinces } from "./data/provinces";
import LeftSideComponent from "./components_v2/LeftSideComponent";
import RightSideComponent from "./components_v2/RightSideComponent";
import ServerErrorModalComponent from "./components_v2/ServerErrorModalComponent";
// import { targetCrops, fireblightStatus } from "./data/fireblightOptionData";
import { targetCrops } from "./data/fireblightOptionData";
import LoadingComponent from "./components_v2/LoadingComponent";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;

const LeftContentsWrapper = styled.div`
  box-sizing: border-box;
  min-width: 405px;
  height: 100%;
  padding-right: 10px;
`;

const RightContentsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function App() {
  const maxStationCount = 4;
  const today = new Date();
  const minDate = new Date("2021-01-01");
  // const mapComponentRef = React.createRef();

  const [error, setError] = useState("에러");
  const [loading, setLoading] = useState(true);
  const [totalSpots, setTotalSpots] = useState([]);
  const [targetCrop, setTargetCrop] = useState(targetCrops[0]);
  const [targetYear, setTargetYear] = useState(today.getFullYear());
  // 디폴트가 연도만 선택되어야하는 것이라서 targetDate를 초기화할 때 공백으로 초기화
  const [targetDate, setTargetDate] = useState();
  const [targetProvince, setTargetProvince] = useState(provinces[0]);
  const [selectedSpots, setSelectedSpots] = useState([]);
  // 새로고침 관리를 위한
  const [refreshOn, setRefreshOn] = useState(false);
  const [delay, setDelay] = useState(1000 * 60 * 60); // 60분 간격
  // const [delay, setDelay] = useState(5000); //테스트용 5초간격
  const [nowDateTime, setNowDateTime] = useState();

  const cancelSelectSpot = (targetSpot) => {
    setSelectedSpots([
      ...selectedSpots.filter((item) => item.id !== targetSpot.id),
    ]);
  };

  const selectSpot = (targetSpot) => {
    // console.log("selectSpot", targetSpot);
    let isAlreadySelected = selectedSpots.filter(
      (item) => item.id == targetSpot.id
    )[0];
    if (isAlreadySelected) {
      alert("이미 선택된 지점입니다.");
      return;
    }
    if (selectedSpots.length < maxStationCount) {
      setSelectedSpots([...selectedSpots, targetSpot]);
      return;
    }
    alert(`최대 ${maxStationCount}곳까지 선택 가능합니다.`);
  };

  useInterval(() => {
    if (refreshOn) {
      // // 새로고침은 현재 연도의 데이터를 가져오도록 설정
      const nowDate = new Date();
      setNowDateTime(nowDate);
      setTargetYear(nowDate.getFullYear());
      // setTargetDate(nowDate);
      setTargetDate();
      // // console.log("refreshOn", nowDate);
    } else {
      return;
    }
  }, delay);

  useEffect(() => {}, []);

  return (
    <>
      {error ? <ServerErrorModalComponent /> : null}
      {loading ? <LoadingComponent /> : null}
      <Wrapper>
        {/* <div className="flex-box"> */}
        <ContentsWrapper>
          {/* <div className="flex-body"> */}
          <ResizePanel
            direction="e"
            style={{ zIndex: 2 }}
            // style={{
            //   width: "100%",
            //   height: "100%",
            // }}
          >
            <LeftContentsWrapper>
              {/* <div className="flex-left"> */}

              <LeftSideComponent
                setError={setError}
                setLoading={setLoading}
                maxStationCount={maxStationCount}
                targetCrop={targetCrop}
                targetYear={targetYear}
                targetDate={targetDate}
                selectedSpots={selectedSpots}
                setSelectedSpots={setSelectedSpots}
                cancelSelectSpot={cancelSelectSpot}
                nowDateTime={nowDateTime}
              />
            </LeftContentsWrapper>
          </ResizePanel>
          <RightContentsWrapper>
            {/* <div className="flex-right"> */}
            <RightSideComponent
              setError={setError}
              setLoading={setLoading}
              maxStationCount={maxStationCount}
              minDate={minDate}
              today={today}
              totalSpots={totalSpots}
              setTotalSpots={setTotalSpots}
              targetCrop={targetCrop}
              setTargetCrop={setTargetCrop}
              targetYear={targetYear}
              setTargetYear={setTargetYear}
              targetDate={targetDate}
              setTargetDate={setTargetDate}
              targetProvince={targetProvince}
              setTargetProvince={setTargetProvince}
              selectedSpots={selectedSpots}
              setSelectedSpots={setSelectedSpots}
              selectSpot={selectSpot}
              nowDateTime={nowDateTime}
              onClickRefreshButton={() => {
                if (!refreshOn) {
                  // alert("최신 날짜의 정보를 불러옵니다. (1시간 간격)");
                  alert("가장 최신 연도의 정보를 불러옵니다. (1시간 간격)");
                }
                setRefreshOn(!refreshOn);
                const nowDate = new Date();
                setNowDateTime(nowDate);
                setTargetYear(nowDate.getFullYear());
                setTargetDate();
                console.log("onClickRefreshButton");
              }}
            />
          </RightContentsWrapper>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
}

export default App;
