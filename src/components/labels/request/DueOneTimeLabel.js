import React from "react";
import "../../../styles/Label.css";

const DueOnTimeLabel = ({ dueOnTime }) => {
  const getLabelStyle = (dueOnTime) => {
    switch (dueOnTime) {
      case true:
        return { backgroundColor: "#00C853", color: "#FFFFFF" };
      case false:
        return { backgroundColor: "#FFC107", color: "#FFFFFF" };
      default:
        return { backgroundColor: "#FF5252", color: "#212121" };
    }
  };

  return (
    <div className="label" style={getLabelStyle(dueOnTime)}>
      {dueOnTime ? "적기 처리 완료" : "지연 처리"}
    </div>
  );
};

export default DueOnTimeLabel;
