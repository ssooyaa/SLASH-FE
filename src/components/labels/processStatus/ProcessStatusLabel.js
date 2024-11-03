import React from "react";
import "../../../styles/Label.css";

const ProcessStatusLabel = ({ processType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (processType) => {
    switch (processType) {
      case "처리중":
        return { backgroundColor: "#ffefef", color: "#ff4d4f" }; // 배경: 연한 빨강, 글자: 진한 빨강
      case "처리완료":
        return { backgroundColor: "#fff0f6", color: "#d46b08" }; // 배경: 연한 보라, 글자: 오렌지
      case "접수완료":
        return { backgroundColor: "#fff7e6", color: "#ffa940" }; // 배경: 연한 주황, 글자: 주황
      default:
        return { backgroundColor: "#fff", color: "#000" }; // 기본값: 흰색 배경, 검은색 글자
    }
  };

  return (
    <div className="taskLabel" style={getLabelStyle(processType)}>
      {processType}
    </div>
  );
};

export default ProcessStatusLabel;
