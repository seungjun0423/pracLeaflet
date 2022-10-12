import React from "react";
import styled from "styled-components";

import "../css/loader.css";

const Div = styled.div`
  z-index: 3;
`;

const LoadingComponent = () => {
  return (
    <Div className="loader">
      <ul>
        <li id="a"></li>
        <li id="b"></li>
        <li id="c"></li>
        <li id="d"></li>
        <li id="e"></li>
        <li id="f"></li>
        <li id="g"></li>
        <li id="h"></li>
        <li id="i"></li>
      </ul>
    </Div>
  );
};

export default LoadingComponent;
