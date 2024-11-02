import React from "react";
import "../../../styles/Label.css";

const ProcessStatusLabel = ({ processType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (processType) => {
    switch (processType) {
      case "REGISTERED":
        return { backgroundColor: "#FFEFDC", color: "#FF9A16" };
      case "IN_PROGRESS":
        return { backgroundColor: "#C3DBF8", color: "#2C70F4" };
      case "COMPLETED":
        return { backgroundColor: "#C3F8DD", color: "#2e8b57" };
      default:
        return { backgroundColor: "#fff", color: "#000" }; // 기본값: 흰색 배경, 검은색 글자
    }
  };

  //표시할 텍스트를 processType에 따라 설정
  const getDisplayText = (processType) => {
    switch (processType) {
      case "REGISTERED":
        return "접수 완료";
      case "IN_PROGRESS":
        return "진행 중";
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
