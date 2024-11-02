import React from "react";
import "../../../styles/Label.css";

const TaskDetailLabel = ({ taskDetail }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (taskDetail) => {
    switch (taskDetail) {
      case "단순 장애":
        return { backgroundColor: "#ffefef", color: "#ff4d4f" };
      case "복합 장애":
        return { backgroundColor: "#fff0f6", color: "#d46b08" };
      case "업무 지원":
        return { backgroundColor: "#C3F8DD", color: "#06D86F" };
      case "장애 예방":
        return { backgroundColor: "#FFE4DC", color: "#FE4853" };
      case "기타":
        return { backgroundColor: "#f0f0f0", color: "#8c8c8c" };
    }
  };

  return (
    <div className="label" style={getLabelStyle(taskDetail)}>
      {taskDetail}
    </div>
  );
};

export default TaskDetailLabel;
