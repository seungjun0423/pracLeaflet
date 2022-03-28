import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackDrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 3;
  opacity: 0.4;
`;

const ModalMessageBox = styled.div`
  position: absolute;
  width: 500px;
  height: 100px;
  padding: 5px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
  z-index: 7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RefreshButton = styled.button`
  border-radius: 5px;
`;

const ServerErrorModalComponent = (props) => {
  // const { message } = props;
  const message = "해당 API가 원활하지 않습니다. 재시도하여 주세요.";
  return (
    <ModalWrapper>
      <ModalBackDrop />
      <ModalMessageBox>
        <p>{message}</p>
        <RefreshButton
          onClick={() => {
            window.location.reload();
          }}
        >
          새로고침 버튼
        </RefreshButton>
      </ModalMessageBox>
    </ModalWrapper>
  );
};

export default ServerErrorModalComponent;
