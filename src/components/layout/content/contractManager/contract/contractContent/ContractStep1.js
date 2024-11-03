import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarMonth } from "react-icons/md";
import "./ContractStep1.css";

const ContractStep1 = ({ formData, handleChange, handleNext, handleClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const calendarRef = useRef(null);

  const handleCalendarClick = (field, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCurrentPicker(field);
    setShowCalendar(true);
    setCalendarPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.right + window.scrollX - 230,
    });
  };

  const handleDateChange = (date) => {
    if (currentPicker === "startDate") {
      handleChange("startDate", date);
    } else {
      handleChange("endDate", date);
    }
    setShowCalendar(false);
  };

  const isValid = () => {
    if (!formData.companyName) {
      alert("회사명을 입력해주세요");
      return false;
    }
    if (!formData.startDate) {
      alert("계약시작일을 입력해주세요");
      return false;
    }
    if (!formData.endDate) {
      alert("계약종료일을 입력해주세요");
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
      <div className="contractContent">
        <div className="data">
          <p>회사이름</p>
          <input
            className="companyData"
            type="text"
            name="companyName"
            placeholder="회사 이름"
            value={formData.companyName || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="data">
          <p>계약시작일</p>
          <div className="dateInput">
            <input
              className="companyData"
              name="startDate"
              placeholder="DD/MM/YYYY"
              value={
                formData.startDate
                  ? formData.startDate.toLocaleDateString("en-GB")
                  : ""
              }
              readOnly
            />
            <MdCalendarMonth
              className="calendarIcon"
              onClick={(e) => handleCalendarClick("startDate", e)}
            />
          </div>
        </div>
        <div className="data">
          <p>계약종료일</p>
          <div className="dateInput">
            <input
              className="companyData"
              name="endDate"
              placeholder="DD/MM/YYYY"
              value={
                formData.endDate
                  ? formData.endDate.toLocaleDateString("en-GB")
                  : ""
              }
              readOnly
            />
            <MdCalendarMonth
              className="calendarIcon"
              onClick={(e) => handleCalendarClick("endDate", e)}
            />
          </div>
        </div>
        {showCalendar && (
          <div
            className="calendarModal"
            ref={calendarRef}
            style={{
              top: `${calendarPosition.top}px`,
              left: `${calendarPosition.left}px`,
            }}
          >
            <DatePicker
              selected={
                currentPicker === "startDate"
                  ? formData.startDate
                  : formData.endDate
              }
              onChange={handleDateChange}
              inline
              minDate={
                currentPicker === "startDate" ? new Date() : formData.startDate
              } // StartDate는 오늘부터, EndDate는 StartDate 이후
            />
          </div>
        )}
      </div>
      <div className="contractButton">
        <button className="grayButton" onClick={handleClose}>
          닫기
        </button>
        <button className="blackButton" onClick={handleNextClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default ContractStep1;
