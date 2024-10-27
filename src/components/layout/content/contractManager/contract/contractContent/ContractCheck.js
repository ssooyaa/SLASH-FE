import React, { useState } from "react";
import "./ContractCheck.css";
import OneColTable from "../../../../../feature/table/OneColTable";
import GradeVerticalTable from "../../../../../feature/table/GradeVerticalTable";

const ContractCheck = ({ formData, handlePrevious, handleSubmit }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const isValid = () => {
    if (!isAgreed) {
      alert("계약 내용에 동의해주세요");
      return false;
    }
    return true;
  };

  const handleSubmitClick = () => {
    if (isValid()) {
      handleSubmit();
    }
  };

  // 체크박스의 체크 상태를 관리하는 핸들러
  const handleCheckboxChange = (value) => {
    setIsAgreed(value);
  };

  return (
    <>
      <div className="contract">
        <div className="companyInfo">
          <p>회사명: {formData.companyName}</p>
          <p>계약 시작일: {formData.startDate.toLocaleDateString()}</p>
          <p>계약 종료일: {formData.endDate.toLocaleDateString()}</p>
        </div>
        <div className="contractInfo">
          <div className="serviceCategory">
            <div className="tableTitle">
              <p>서비스 평가 항목</p>
              <span>*</span>
            </div>
            <div className="table categoryTable">
              <OneColTable
                label="서비스 평가 항목"
                data={formData.categories}
              />
            </div>
          </div>
          <div className="slaEvaluation">
            <div className="tableTitle">
              <p>SLA 평가 등급 설정</p>
              <span>*</span>
            </div>
            <div className="table slaTable">
              <GradeVerticalTable data={formData.totalTargets} />
            </div>
          </div>
        </div>
        <div className="agreement">
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            />{" "}
            계약 내용에 동의합니다.
          </label>
        </div>
      </div>
      <div className="contractButton">
        <button className="grayButton" onClick={handlePrevious}>
          이전
        </button>
        <button
          type="submit"
          className="blackButton"
          onClick={handleSubmitClick}
        >
          제출
        </button>
      </div>
    </>
  );
};
export default ContractCheck;
