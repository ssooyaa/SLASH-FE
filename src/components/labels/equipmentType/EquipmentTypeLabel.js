import React from "react";
import "../../../styles/Label.css";

const EquipmentTypeLabel = ({ equipmentType }) => {
  // 스타일을 taskType에 따라 동적으로 설정
  const getLabelStyle = (equipmentType) => {
    switch (equipmentType) {
      default:
        return { backgroundColor: "#ffefef", color: "#fd9595" }; // 기본값: 흰색 배경, 검은색 글자
    }
  };

  return (
    <div className="label" style={getLabelStyle(equipmentType)}>
      {equipmentType}
    </div>
  );
};

export default EquipmentTypeLabel;
