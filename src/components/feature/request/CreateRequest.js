import React, { useState, useEffect } from "react";
import CreateRequestForm from "./CreateRequestForm";
import {
  fetchSystemAndEquipments,
  fetchTaskDetails,
  createRequest,
} from "../../../service/api/userService";

const CreateRequest = ({ isModalOpen, toggleModal }) => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [taskDetail, setTaskDetail] = useState([]);

  const [formState, setFormState] = useState({
    taskType: "서비스 요청",
    isServiceRelevance: false,
    selectedSystem: "",
    selectedEquipment: "",
    taskDetail: "",
    title: "",
    content: "",
  });

  const updateFormState = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // taskType에 따라 taskDetails 로드
  useEffect(() => {
    const loadTaskDetails = async () => {
      const data = await fetchTaskDetails(formState.taskType);
      if (data) {
        setTaskDetail(data);
      }
    };

    if (formState.taskType) {
      loadTaskDetails();
    }
  }, [formState.taskType]);

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
      taskType: formState.taskType,
      equipmentName: formState.selectedEquipment,
      taskDetail: formState.taskDetail,
      serviceRelevance: formState.isServiceRelevance,
      title: formState.title,
      content: formState.content,
    };

    try {
      const response = await createRequest(taskRequestDto);
      if (response) {
        console.log("들어옴-----------");
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
          systemTypes={equipmentData.map((system) => system.systemName)}
          equipmentOptions={equipmentOptions}
          taskDetail={taskDetail}
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
