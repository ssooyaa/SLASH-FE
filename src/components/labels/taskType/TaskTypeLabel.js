import React from "react";

const TaskTypeLabel = ({ taskType }) => {
  const getLabelStyle = (taskType) => {
    switch (taskType) {
      case "서비스 요청":
        return { backgroundColor: "#F6E9FF", color: "#C66FFC" };
      case "장애 요청":
        return { backgroundColor: "#f0ffff", color: "#008080" };
      case "기타":
        return { backgroundColor: "#f0f0f0", color: "#8c8c8c" };
    }
  };

  return (
    <div className="label" style={getLabelStyle(taskType)}>
      {taskType}
    </div>
  );
};

export default TaskTypeLabel;
