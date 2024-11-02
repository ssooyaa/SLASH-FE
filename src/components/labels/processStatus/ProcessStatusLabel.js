import React from "react";
import "../../../styles/Label.css";

const ProcessStatusLabel = ({ processType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (processType) => {
    switch (processType) {
      case "REGISTERED":
        return { backgroundColor: "#ffefef", color: "#ff4d4f" }; // 배경: 연한 빨강, 글자: 진한 빨강
      case "IN_PROGRESS":
        return { backgroundColor: "#fff0f6", color: "#d46b08" }; // 배경: 연한 보라, 글자: 오렌지
      case "COMPLETED":
        return { backgroundColor: "#fff7e6", color: "#ffa940" }; // 배경: 연한 주황, 글자: 주황
      default:
        return { backgroundColor: "#fff", color: "#000" }; // 기본값: 흰색 배경, 검은색 글자
    }
  };

  //표시할 텍스트를 processType에 따라 설정
  const getDisplayText = (processType) => {
    switch (processType) {
      case "REGISTERED":
        return "접수완료";
      case "IN_PROGRESS":
        return "진행중";
      case "COMPLETED":
        return "처리 완료";
      default:
        return processType;
    }
  };

  return (
    <div className="label" style={getLabelStyle(processType)}>
      {getDisplayText(processType)}
    </div>
  );
};

export default ProcessStatusLabel;
