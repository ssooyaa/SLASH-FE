import React, { useState } from "react";
import "./ContractForm.css";
import ContractHeader from "../contractHeader/ContractHeader";
import ContractStep1 from "../contractContent/ContractStep1";
import ContractStep2 from "../contractContent/ContractStep2";
import ContractCheck from "../contractContent/ContractCheck";
import { CreateContract } from "../../../../../../services/api/userService";

const ContractForm = () => {
  const steps = [
    {
      number: 1,
      label: "기본 정보 입력",
      detail: "회사 정보 및 계약기간을 설정합니다.",
    },
    {
      number: 2,
      label: "SLA 지표 설정",
      detail: "SLA 평가를 위한 기준을 작성합니다.",
    },
    {
      number: 3,
      label: "계약 확인 및 완료",
      detail: "계약의 내용을 확인해 주세요",
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    startDate: null,
    endDate: null,
    totalTargets: [],
    categories: [],
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateContract(formData);
      if (response) {
        alert("계약 생성 성공");
        //확인 후 이동 로직 설정
      }
    } catch (error) {
      alert("계약 생성 실패");
      console.log("생성 실패: ", error);
    }
  };

  const handleClose = () => {
    console.log("닫기");
    //닫은 후 리다이렉트 페이지 등 로직 설정
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContractStep1
            formData={formData}
            handleChange={handleChange}
            handleClose={handleClose}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <ContractStep2
            formData={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <ContractCheck
            currentStep={currentStep}
            formData={formData}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="contractTemplate">
      <ContractHeader steps={steps} currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};

export default ContractForm;
