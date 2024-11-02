import React from "react";
import "../../../styles/Label.css";

const TaskDetailLabel = ({ taskDetail }) => {
  // 통일된 스타일 설정
  const labelStyle = {
    backgroundColor: "#f0f0f0", // 파란색 배경
    color: "#666666", // 흰색 텍스트
  };

  return (
    <div className="label" style={labelStyle}>
      {taskDetail}
    </div>
  );
};

export default TaskDetailLabel;
