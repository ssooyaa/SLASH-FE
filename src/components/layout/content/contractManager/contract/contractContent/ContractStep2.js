import React, { useState } from "react";
import "./ContractStep2.css";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";

const ContractStep2 = ({
  formData,
  handleChange,
  handlePrevious,
  handleNext,
}) => {
  const [totalTargets, setTotalTargets] = useState(formData.totalTargets);

  const handleTotalTargets = (value) => {
    setTotalTargets(value);
    handleChange("totalTargets", value);
  };

  const isValid = () => {
    if (totalTargets.length === 0 || totalTargets[0].grade === "") {
      alert("SLA 평가 등급을 설정해 주세요");
      return false;
    }
    return true;
  };

  const handleNextClick = () => {
    if (isValid()) {
      handleNullData();
      handleNext();
    }
  };

  const handleNullData = () => {
    //등급 미설정 데이터 지우기
    const updatedTargets = totalTargets.filter((target) => target.grade !== "");
    setTotalTargets(updatedTargets);
    handleChange("totalTargets", updatedTargets);
  };

  return (
    <>
      <div className="slaInfo">
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
