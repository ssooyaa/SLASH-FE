import React from "react";
import "../../../styles/Label.css";

const RequestLabel = ({ requestType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (requestType) => {
    switch (requestType) {
      case "장애 요청":
        return { backgroundColor: "#FFE4DC", color: "#FE4853" };
      case "서비스 요청":
        return { backgroundColor: "#F6E9FF", color: "#C66FFC" };
      case "시스템 요청":
        return { backgroundColor: "#f0f0f0", color: "#8c8c8c" };
      case "기타":
        return { backgroundColor: "#EAE9E9", color: "#666666" };
      default:
        return { backgroundColor: "#fff", color: "#000" };
    }
  };

  return (
    <div className="label" style={getLabelStyle(requestType)}>
      {requestType}
    </div>
  );
};

export default RequestLabel;
