import React from "react";
import "../../../styles/Label.css";

const TaskDetailLabel = ({ taskType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (taskType) => {
    switch (taskType) {
      case "단순장애":
        return { backgroundColor: "#ffefef", color: "#ff4d4f" };
      case "복합장애":
        return { backgroundColor: "#fff0f6", color: "#d46b08" };
      case "업무지원":
        return { backgroundColor: "#C3F8DD", color: "#06D86F" };
      case "장애예방":
        return { backgroundColor: "#FFE4DC", color: "#FE4853" };
      case "기타":
        return { backgroundColor: "#f0f0f0", color: "#8c8c8c" };
    }
  };

  return (
    <div className="taskLabel" style={getLabelStyle(taskType)}>
      {taskType}
    </div>
  );
};

export default TaskDetailLabel;
