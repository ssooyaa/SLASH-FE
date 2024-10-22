import React, { useState, useEffect, useCallback } from "react";
import CreateRequestForm from "../../../components/feature/CreateRequestForm";
import {
  fetchSystemAndEquipments,
  fetchTaskDetails,
  createRequest,
} from "../../../service/userService";

const CreateRequestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  // requestType에 따라 taskTypes 로드
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

  useEffect(() => {
    const loadEquipmentTypes = async () => {
      const data = await fetchSystemAndEquipments();
      setEquipmentData(data);
    };
    loadEquipmentTypes();
  }, []);

  const systemTypes = equipmentData.map((system) => system.systemName);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TaskRequestDto 형식에 맞는 데이터를 생성
    const taskRequestDto = {
      taskType: formState.taskType, // 업무 유형
      equipmentName: formState.selectedEquipment, // 장비 ID
      taskDetail: formState.taskDetail, // 업무 세부 내용
      serviceRelevance: formState.isServiceRelevance, // 서비스 제공 여부
      title: formState.title, // 제목
      content: formState.content, // 내용
    };

    try {
      const response = await createRequest(taskRequestDto);
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>요청 등록</button>
      {isModalOpen && (
        <CreateRequestForm
          formState={formState}
          updateFormState={updateFormState}
          systemTypes={systemTypes}
          equipmentOptions={equipmentOptions}
          taskDetail={taskDetail}
          handleSystemChange={handleSystemChange}
          handleEquipmentChange={handleEquipmentChange}
          toggleModal={toggleModal}
          onSubmit={handleSubmit} // 제출 핸들러 전달
        />
      )}
    </div>
  );
};

export default CreateRequestPage;
