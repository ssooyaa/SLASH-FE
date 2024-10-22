import React from "react";
import Dropdown from "./RequestDropdown";
import CheckBox from "../common/CheckBox";
import "../feature/CreateRequestForm.css";

const CreateRequestForm = ({
  formState,
  updateFormState,
  systemTypes,
  equipmentOptions,
  taskDetail,
  handleSystemChange,
  handleEquipmentChange,
  toggleModal,
  onSubmit,
}) => {
  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  const renderDropdown = (label, items, selectedItem, onSelect) => (
    <Dropdown
      items={items}
      label={selectedItem || `${label}을 선택하세요`}
      onSelect={onSelect}
    />
  );

  const taskTypes = ["서비스 요청", "장애 요청"];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={toggleModal}>
          &times;
        </button>
        <div className="modal-header">
          <h3>요청 등록</h3>
          {renderDropdown("요청 유형", taskTypes, formState.taskType, (value) =>
            updateFormState("taskType", value)
          )}
        </div>

        <form onSubmit={onSubmit}>
          <div className="request-info-box">
            <div className="request-header">
              <h3>요청 정보</h3>
              {formState.taskType === "장애 요청" && (
                <CheckBox
                  id="serviceRelevanceCheckbox"
                  label="서비스 제공 여부"
                  checked={formState.isServiceRelevance}
                  onChange={(checked) =>
                    updateFormState("isServiceRelevance", checked)
                  }
                />
              )}
            </div>

            <table className="request-table">
              <tbody>
                <tr>
                  <td>{renderLabel("시스템 유형")}</td>
                  <td>
                    {renderDropdown(
                      "시스템",
                      systemTypes,
                      formState.selectedSystem,
                      handleSystemChange
                    )}
                  </td>
                  <td>{renderLabel("장비 유형")}</td>
                  <td>
                    {renderDropdown(
                      "장비",
                      equipmentOptions,
                      formState.selectedEquipment,
                      handleEquipmentChange
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="request-table">
              <tbody>
                <tr>
                  <td>{renderLabel("업무유형")}</td>
                  <td>
                    {renderDropdown(
                      "업무",
                      taskDetail,
                      formState.taskDetail,
                      (value) => updateFormState("taskDetail", value)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="request-info-box">
            <h3>요청 내용</h3>
            <table className="request-table">
              <tbody>
                <tr>
                  <td>{renderLabel("제목")}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="제목을 입력하세요 최대(50글자)"
                      value={formState.title}
                      onChange={(e) => updateFormState("title", e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <textarea
              className="request-content"
              placeholder="내용을 입력하세요"
              rows="5"
              value={formState.content}
              onChange={(e) => updateFormState("content", e.target.value)}
            />
          </div>

          <div className="form-footer">
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
