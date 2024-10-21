import React, { useState } from "react";
import { BsTable } from "react-icons/bs";
import { FiPieChart } from "react-icons/fi";
import "./BottomSection.css"; // 스타일을 위한 CSS 파일

const BottomContainer = () => {
  const [selectedOption, setSelectedOption] = useState("전체");
  const [activeButton, setActiveButton] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button); // 클릭한 버튼을 활성화 상태로 설정
  };

  return (
    <div className="bottomContainer">
      {/* 드롭다운과 버튼들을 한 줄로 배치 */}
      <div className="topSection">
        <div className="dropdownContainer">
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="전체">전체</option>
            <option value="서비스 가동률">서비스 가동률</option>
            <option value="서비스 요청 적기 처리율">
              서비스 요청 적기 처리율
            </option>
            <option value="장애 요청 적기 처리율">장애 요청 적기 처리율</option>
          </select>
        </div>

        <div className="iconButtons">
          <button
            className={`iconButton tableButton ${
              activeButton === "table" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("table")}
          >
            <BsTable />
          </button>
          <button
            className={`iconButton chartButton ${
              activeButton === "chart" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("chart")}
          >
            <FiPieChart />
          </button>
        </div>
      </div>

      {/* 타이틀을 아래에 배치 */}
      <div className="titleContainer">
        <span>SLA 지표</span>
      </div>
    </div>
  );
};

export default BottomContainer;
