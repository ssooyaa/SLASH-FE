import React from "react";
import "../../../styles/Label.css";

const AssignmentButton = ({ onClick, id }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id); // 클릭 시 handleAssign 함수만 실행
    }
  };

  return (
    <div
      className="label"
      style={{ backgroundColor: "#121824", color: "#FFFFFF" }}
      onClick={handleClick}
    >
      할당하기
    </div>
  );
};

export default AssignmentButton;
