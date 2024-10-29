import React from "react";
import CreateRequestInfoForm from "./CreateRequestInfoForm.js";
import Dropdown from "../RequestDropdown";
import RequestContentForm from "../RequestContentForm.js";
import "./CreateRequestForm.css";

const CreateRequestForm = ({
  formState,
  updateFormState,
  taskTypes,
  systemTypes,
  equipmentOptions,
  taskDetailOptions,
  handleSystemChange,
  handleEquipmentChange,
  toggleModal,
  onSubmit,
}) => {
  const renderDropdown = (label, items, selectedItem, onSelect) => (
    <Dropdown
      items={items}
      label={selectedItem || `${label}`}
      onSelect={onSelect}
    />
  );

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={toggleModal}>
          &times;
        </button>
        <div className="modalHeader">
          <h3>요청 등록</h3>
          {renderDropdown("요청 유형", taskTypes, formState.taskType, (value) =>
            updateFormState("taskType", value)
          )}
        </div>

        <form onSubmit={onSubmit}>
          <CreateRequestInfoForm
            formState={formState}
            updateFormState={updateFormState}
            taskTypes={taskTypes}
            systemTypes={systemTypes}
            equipmentOptions={equipmentOptions}
            taskDetailOptions={taskDetailOptions}
            handleSystemChange={handleSystemChange}
            handleEquipmentChange={handleEquipmentChange}
          />
          <RequestContentForm
            formState={formState}
            updateFormState={updateFormState}
            isEditable={true}
          />
          <div className="formFooter">
            <button type="submit">저장</button>
            <button type="button" onClick={toggleModal}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestForm;
