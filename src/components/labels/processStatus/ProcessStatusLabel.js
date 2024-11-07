import React from "react";
import "../../../styles/Label.css";
import AssignmentButton from "../../common/button/AssignmentButton";
import { useNavigate } from "react-router-dom";

const ProcessStatusLabel = ({ processType, id }) => {
  const navigate = useNavigate();
  const getLabelStyle = (processType) => {
    switch (processType) {
      case "IN_PROGRESS":
        return { backgroundColor: "#C3DBF8", color: "#2C70F4" };
      case "COMPLETED":
        return { backgroundColor: "#C3F8DD", color: "#2e8b57" };
      default:
        return { backgroundColor: "#fff", color: "#000" };
    }
  };

  const getDisplayText = (processType) => {
    switch (processType) {
      case "REGISTERED":
        return (
          <AssignmentButton
            id={id}
            onClick={() => {
              console.log("ProcessStatusLabel에서 할당하기 클릭됨:", id);
              navigate(`request/${id}`); // 처음 클릭 시 이동
            }}
          />
        );
      case "IN_PROGRESS":
        return "진행 중";
      case "COMPLETED":
        return "처리 완료";
      default:
        return processType;
    }
  };

  return (
    <div className="label" style={getLabelStyle(processType)}>
      {getDisplayText(processType)}
    </div>
  );
};

export default ProcessStatusLabel;
