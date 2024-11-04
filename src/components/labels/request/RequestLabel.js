import React from "react";
import "../../../styles/Label.css";

const RequestLabel = ({ requestType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (requestType) => {
    switch (requestType) {
      case "장애 요청":
        return { backgroundColor: "#FFE4DC", color: "#FE4853" }; // 배경: 연한 빨강, 글자: 진한 빨강
      case "서비스 요청":
        return { backgroundColor: "#F6E9FF", color: "#C66FFC" }; // 배경: 연한 보라, 글자: 오렌지
      case "시스템 요청":
        return { backgroundColor: "#f0f0f0", color: "#8c8c8c" }; // 배경: 연한 녹색, 글자: 진한 녹색
      case "기타":
        return { backgroundColor: "#EAE9E9", color: "#666666" }; // 배경: 회색, 글자: 어두운 회색
      default:
        return { backgroundColor: "#fff", color: "#000" }; // 기본값: 흰색 배경, 검은색 글자
    }
  };

  return (
    <div className="taskLabel" style={getLabelStyle(requestType)}>
      {requestType}
    </div>
  );
};

export default RequestLabel;
