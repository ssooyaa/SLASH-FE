import React, { useState, useEffect } from "react";
import {
  fetchSystemAndEquipments,
  fetchTaskTypes,
  editRequest,
} from "../../../service/api/userService";
import Dropdown from "./RequestDropdown";
import "../request/RequestModal.css";
import "../request/select/RequestDetailInfoForm.css";
import "../request/RequestContentForm.css";

const EditRequestForm = ({ requestData, onCancel, onSave }) => {
  const [formState, setFormState] = useState({
    taskType: requestData?.taskType || "",
    selectedSystem: requestData?.system || "",
    selectedEquipment: requestData?.equipmentName || "",
    taskDetail: requestData?.taskDetail || "",
    title: requestData?.title || "",
    content: requestData?.content || "",
  });

  const [taskTypeData, setTaskTypeData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [taskDetailOptions, setTaskDetailOptions] = useState([]);

  useEffect(() => {
    const loadTaskTypes = async () => {
      const data = await fetchTaskTypes(1);
      setTaskTypeData(data);
    };
    loadTaskTypes();
  }, []);

  useEffect(() => {
    if (formState.taskType) {
      const selectedTypeData = taskTypeData.find(
        (task) => task.type === formState.taskType
      );
      setTaskDetailOptions(
        selectedTypeData ? selectedTypeData.typeDetails : []
      );
    }
  }, [formState.taskType, taskTypeData]);

  useEffect(() => {
    const loadEquipmentTypes = async () => {
      const data = await fetchSystemAndEquipments();
      setEquipmentData(data);
    };
    loadEquipmentTypes();
  }, []);

  const handleSystemChange = (systemName) => {
    updateFormState("selectedSystem", systemName);
    updateFormState("selectedEquipment", "");
    const selectedSystemData = equipmentData.find(
      (system) => system.systemName === systemName
    );
    setEquipmentOptions(
      selectedSystemData ? selectedSystemData.equipmentInfos : []
    );
  };

  const handleEquipmentChange = (equipmentName) => {
    updateFormState("selectedEquipment", equipmentName);
  };

  const updateFormState = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {
      title: formState.title,
      content: formState.content,
    };

    // 제목과 내용은 항상 포함하고, 다른 필드들은 변경되었을 때만 추가
    Object.keys(formState).forEach((key) => {
      if (
        formState[key] !== requestData[key] &&
        key !== "title" &&
        key !== "content"
      ) {
        updatedFields[key] = formState[key];
      }
    });

    try {
      await editRequest(requestData.requestId, updatedFields);
      alert("수정이 완료되었습니다.");
      onSave();
    } catch (error) {
      console.error(error);
      alert("수정 실패");
    }
  };

  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  return (
    <div className="requestEditModalOverlay">
      <div className="requestModalContent">
        <div className="modalHeader">
          <h3>요청 수정</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="requestDetailInfoBox">
            <table className="requestDetailTable">
              <tbody>
                <tr>
                  <td>{renderLabel("업무 유형")}</td>
                  <td>
                    <Dropdown
                      items={taskTypeData.map((task) => task.type)}
                      label={formState.taskType || "선택하세요"}
                      onSelect={(value) => updateFormState("taskType", value)}
                    />
                  </td>
                  <td>{renderLabel("세부 유형")}</td>
                  <td>
                    <Dropdown
                      items={taskDetailOptions}
                      label={formState.taskDetail || "선택하세요"}
                      onSelect={(value) => updateFormState("taskDetail", value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{renderLabel("시스템")}</td>
                  <td>
                    <Dropdown
                      items={equipmentData.map((system) => system.systemName)}
                      label={formState.selectedSystem || "선택하세요"}
                      onSelect={handleSystemChange}
                    />
                  </td>
                  <td>{renderLabel("장비")}</td>
                  <td>
                    <Dropdown
                      items={equipmentOptions}
                      label={formState.selectedEquipment || "선택하세요"}
                      onSelect={handleEquipmentChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="requestContentBox">
            <h3>요청 내용</h3>
            <table className="createRequestTable">
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
              className="requestContent"
              placeholder="내용을 입력하세요"
              rows="5"
              value={formState.content}
              onChange={(e) => updateFormState("content", e.target.value)}
            />
          </div>

          <div className="formFooter">
            <button type="submit">수정</button>
            <button type="button" onClick={onCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequestForm;
