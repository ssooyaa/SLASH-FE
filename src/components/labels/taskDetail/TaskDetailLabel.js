import React from "react";
import "../../../styles/Label.css";

const TaskDetailLabel = ({ taskType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (taskType) => {
    switch (taskType) {
      case "단순장애":
        return { backgroundColor: "#ffefef", color: "#ff4d4f" }; // 배경: 연한 빨강, 글자: 진한 빨강
      case "복합장애":
        return { backgroundColor: "#fff0f6", color: "#d46b08" }; // 배경: 연한 보라, 글자: 오렌지
      case "업무지원":
        return { backgroundColor: "#e6fffb", color: "#00a854" }; // 배경: 연한 녹색, 글자: 진한 녹색
      case "장애예방":
        return { backgroundColor: "#fff7e6", color: "#ffa940" }; // 배경: 연한 주황, 글자: 주황
      case "기타":
        return { backgroundColor: "#f0f0f0", color: "#8c8c8c" }; // 배경: 회색, 글자: 어두운 회색
      default:
        return { backgroundColor: "#fff", color: "#000" }; // 기본값: 흰색 배경, 검은색 글자
    }
  };

  return (
    <div className="taskLabel" style={getLabelStyle(taskType)}>
      {taskType}
    </div>
  );
};

export default TaskDetailLabel;
