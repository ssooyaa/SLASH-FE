import React, { useState } from "react";
import "./UserMain.css";
import { BsTable } from "react-icons/bs";
import { FiPieChart } from "react-icons/fi";
import DateSelectBar from "./dropdown/DateSelectBar";

const UserMain = () => {
  const [selectedOption, setSelectedOption] = useState("전체");
  const [activeButton, setActiveButton] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button); // 클릭한 버튼을 활성화 상태로 설정
  };

  return (
    <div className="headerContainer">
      <div className="content">
        <DateSelectBar />
      </div>
    </div>
  );
};

export default UserMain;
