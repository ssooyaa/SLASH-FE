import React from "react";
import "../../../styles/Label.css";

const AssignmentButton = ({ onClick }) => {

  return (
    <div
      className="label"
      style={{ backgroundColor: "#121824", color: "#FFFFFF" }}
      onClick={onClick}
    >
      할당하기
    </div>
  );
};

export default AssignmentButton;
