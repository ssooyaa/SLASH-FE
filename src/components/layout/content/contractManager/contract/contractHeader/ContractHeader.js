import React, { useRef } from "react";
import "./ContractHeader.css";
import checkedIcon from "../../../../../../assets/images/contractChecked.png";

const ContractHeader = ({ steps, currentStep }) => {
  const stepRefs = useRef([]);

  return (
    <div className="contractHeader">
      <p className="contractHeaderTitle">{steps[currentStep - 1].label}</p>
      <p className="titleDetail">{steps[currentStep - 1].detail}</p>
      <div className="stepContainer">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="stepContent"
            ref={(el) => (stepRefs.current[index] = el)}
          >
            {/* 모든 스텝에 대해 선을 고정 */}
            <div className="stepLine"></div> {/* 선을 먼저 그리기 */}
            <div
              className={`step ${step.number <= currentStep ? "active" : ""}`}
            >
              {step.number <= currentStep ? (
                <img src={checkedIcon} alt="완료" className="checkIcon" />
              ) : (
                <div className="stepNumber">{step.number}</div>
              )}
            </div>
            <div className="stepLabel">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractHeader;
