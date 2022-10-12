import React, { useEffect } from "react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  padding: 5px;
`;

const LegendTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  box-sizing: border-box;
  margin-bottom: 5px;
`;
const ColorLabel = styled.span`
  padding-left: 5px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "11")}px;
  line-height: ${(props) => (props.fontSize ? props.fontSize : "11")}px;
`;
const Color = styled.div`
  height: ${(props) => (props.height ? props.height : "20")}px;
  width: 50px;
  background-color: ${(props) => (props.color ? props.color : "white")};
`;
const ColorWrapper = styled.div`
  display: flex;
  // box-sizing: border-box;
  // align-items: flex-end;
  // justify-content: center;
  align-items: center;
`;
const EmptyWrapper = styled.div`
  display: flex;
  // justify-content: center;
  align-items: center;
`;

const LegendComponent = (props) => {
  const { data } = props;

  useEffect(() => {}, [data]);

  if (!data) {
    return (
      <Wrapper>
        <LegendTitle>지점 색상 범례</LegendTitle>
        <EmptyWrapper>-</EmptyWrapper>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <LegendTitle>지점 색상 범례</LegendTitle>
      {data.map((item) => (
        <ColorWrapper key={item.id}>
          <Color color={item.color} />
          <ColorLabel>{item.titleKo ? item.titleKo : "-"}</ColorLabel>
        </ColorWrapper>
      ))}
    </Wrapper>
  );
};

export default LegendComponent;
