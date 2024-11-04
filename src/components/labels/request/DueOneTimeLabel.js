import React from "react";
import "../../../styles/Label.css";

const DueOnTimeLabel = ({ dueOnTime }) => {
  const getLabelStyle = (dueOnTime) => {
    switch (dueOnTime) {
      case true:
        return { backgroundColor: "#C3DBF8", color: "#2C70F4" };
      case false:
        return { backgroundColor: "#F6F6F6", color: "#666666" };
      default:
        return { backgroundColor: "#fff", color: "#000" };
    }
  };

  return (
    <div className="taskLabel" style={getLabelStyle(dueOnTime)}>
      {dueOnTime ? "적기 처리 완료" : "지연 처리"}
    </div>
  );
};

export default DueOnTimeLabel;
