import React, { useState } from "react";
import "./ContractStep2.css";
import InputTable from "../../../../../feature/table/InputTable";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";

const ContractStep2 = ({
  formData,
  handleChange,
  handlePrevious,
  handleNext,
}) => {
  const [category, setCategory] = useState(
    formData.categories?.map((item) => item) || []
  );

  const handleCategory = (value) => {
    const updatedCategories = value;
    setCategory(updatedCategories);
    handleChange("categories", updatedCategories);
    console.log(formData);
  };

  const [totalTargets, setTotalTargets] = useState(formData.totalTargets);

  const handleTotalTargets = (value) => {
    setTotalTargets(value);
    handleChange("totalTargets", value);
  };

  const isValid = () => {
    if (category.length === 0 || category[0] === "") {
      alert("서비스 평가 항목을 작성해 주세요");
      return false;
    }
    if (totalTargets.length === 0 || totalTargets[0].grade === "") {
      alert("SLA 평가 등급을 설정해 주세요");
      return false;
    }
    return true;
  };

  const handleNextClick = () => {
    if (isValid()) {
      handleNext();
    }
  };

  return (
    <>
      <div className="slaInfo">
        <div className="serviceCategory">
          <div className="tableTitle inputTableTitle">
            <p>서비스 평가 항목</p>
            <span>*</span>
          </div>
          <div className="table categoryTable">
            <InputTable
              label="서비스 평가 항목"
              initialData={category}
              onDataChange={handleCategory}
            />
          </div>
        </div>
        <div className="slaEvaluation">
          <div className="tableTitle inputTableTitle">
            <p>SLA 평가 등급 설정</p>
            <span>*</span>
          </div>
          <div className="table slaTable">
            <GradeInputTable
              initialData={totalTargets}
              onDataChange={handleTotalTargets}
            />
          </div>
        </div>
      </div>
      <div className="contractButton">
        <button className="grayButton" onClick={handlePrevious}>
          이전
        </button>
        <button className="blackButton" onClick={handleNextClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default ContractStep2;
