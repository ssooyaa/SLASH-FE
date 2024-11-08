import React, { useState, useEffect } from "react";
import CreateRequestForm from "./CreateRequestForm";
import {
  fetchSystemAndEquipments,
  fetchTaskTypes,
  createRequest,
} from "../../../../service/api/userService";

const CreateRequest = ({ isModalOpen, toggleModal, contactId }) => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [taskTypeData, setTaskTypeData] = useState([]);
  const [taskDetailOptions, setTaskDetailOptions] = useState([]);

  const [formState, setFormState] = useState({
    contractId: contactId,
    taskType: "",
    isServiceRelevance: false,
    selectedSystem: "",
    selectedEquipment: "",
    taskDetail: "",
    title: "",
    content: "",
  });

  //taskTypes 로드
  useEffect(() => {
    const loadTaskTypes = async (contractId) => {
      const data = await fetchTaskTypes(contactId);
      setTaskTypeData(data);
    };
    loadTaskTypes();
  }, []);

  const updateFormState = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  //taskType 변경 시 taskDetailOptions 업데이트
  useEffect(() => {
    const selectedTypeData = taskTypeData.find(
      (task) => task.type === formState.taskType
    );
    setTaskDetailOptions(selectedTypeData ? selectedTypeData.typeDetails : []);
  }, [formState.taskType, taskTypeData]);

  // 장비 데이터를 로드하는 부분
  useEffect(() => {
    const loadEquipmentTypes = async () => {
      const data = await fetchSystemAndEquipments();
      setEquipmentData(data);
    };
    loadEquipmentTypes();
  }, []);

  // 시스템에 맞는 장비 선택
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

  // 요청 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskRequestDto = {
      contractId: formState.contractId,
      type: formState.taskType,
      equipmentName: formState.selectedEquipment,
      taskDetail: formState.taskDetail,
      serviceRelevance: formState.isServiceRelevance,
      title: formState.title,
      content: formState.content,
    };

    try {
      const response = await createRequest(taskRequestDto);
      if (response) {
        toggleModal();
      }
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <CreateRequestForm
          formState={formState}
          updateFormState={updateFormState}
          taskTypes={taskTypeData.map((task) => task.type)}
          systemTypes={equipmentData.map((system) => system.systemName)}
          equipmentOptions={equipmentOptions}
          taskDetailOptions={taskDetailOptions}
          handleSystemChange={handleSystemChange}
          handleEquipmentChange={handleEquipmentChange}
          toggleModal={toggleModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateRequest;
