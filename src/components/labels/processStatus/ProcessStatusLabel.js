import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Label.css";
import AssignmentButton from "../../common/button/AssignmentButton";

const ProcessStatusLabel = ({ processType, id, isContractManager }) => {
  const navigate = useNavigate();

  const getLabelStyle = (processType) => {
    if (processType === "REGISTERED" && isContractManager) {
      // AssignmentButton이 렌더링될 때는 스타일을 기본값으로 설정
      return {};
    }
    switch (processType) {
      case "IN_PROGRESS":
        return { backgroundColor: "#C3DBF8", color: "#2C70F4" };
      case "COMPLETED":
        return { backgroundColor: "#C3F8DD", color: "#2e8b57" };
      case "REGISTERED":
        return { backgroundColor: "#FFEFDC", color: "#FF9A16" }; // 접수 완료 스타일
      default:
        return { backgroundColor: "#fff", color: "#000" };
    }
  };

  const getDisplayText = (processType) => {
    if (processType === "REGISTERED") {
      if (isContractManager) {
        // ContractManagerBottom에서만 AssignmentButton을 렌더링
        return (
          <AssignmentButton
            id={id}
            onClick={() => {
              console.log("ProcessStatusLabel에서 할당하기 클릭됨:", id);
              navigate(`request/${id}`); // 이동 처리
            }}
          />
        );
      } else {
        // 다른 컴포넌트에서는 '접수 완료' 텍스트만 렌더링
        return "접수 완료";
      }
    }

    switch (processType) {
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
