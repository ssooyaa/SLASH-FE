import React from "react";
import "../../../styles/Label.css";

const EquipmentTypeLabel = ({ equipmentType }) => {
  const getLabelStyle = (equipmentType) => {
    switch (equipmentType) {
      default:
        return { backgroundColor: "#ffefef", color: "#fd9595" };
    }
  };

  return (
    <div className="label" style={getLabelStyle(equipmentType)}>
      {equipmentType}
    </div>
  );
};

export default EquipmentTypeLabel;
