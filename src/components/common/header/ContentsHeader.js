import React from "react";
import { FaAsterisk, FaRegCalendar } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ContractHeader.css";
import { format } from "date-fns";
import ko from "date-fns/locale/ko"; // 한국어 로케일 import

const ContentsHeader = ({
  agreements,
  selectedAgreement,
  setSelectedAgreement,
  selectedDate,
  setSelectedDate,
  maxDate,
  dateFormat,
}) => {
  const handleAgreementChange = (e) => {
    const agreementName = e.target.value;
    const selected = agreements.find(
      (agreement) => agreement.contractName === agreementName
    );
    setSelectedAgreement(selected);
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
  };

  const inputDateFormatter = () => {
    switch (dateFormat) {
      case "year":
        return "yyyy년";
      case "month":
        return `yyyy년 MM월`;
      default:
        return `yyyy년 MM월 dd일`;
    }
  };

  return (
    <div className="topIndex">
      <FaAsterisk className="star" />
      협약서
      <select
        className="criteria2"
        value={selectedAgreement?.contractName || ""}
        onChange={handleAgreementChange}
      >
        {agreements.map((agreement) => (
          <option key={agreement.contractId} value={agreement.contractName}>
            {agreement.contractName}
          </option>
        ))}
      </select>
      <div className="datePickerContainer">
        {selectedDate && setSelectedDate && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            locale={ko}
            showYearPicker={dateFormat === "year"}
            showMonthYearPicker={dateFormat === "month"}
            dateFormat={inputDateFormatter()}
            maxDate={maxDate}
            customInput={
              <div className="datePickerContainer">
                <input
                  type="text"
                  className="criteria2"
                  value={
                    selectedDate
                      ? format(selectedDate, inputDateFormatter())
                      : ""
                  }
                  readOnly
                />
                <FaRegCalendar className="calendarIcon" />
              </div>
            }
            placeholderText={
              dateFormat === "year"
                ? "연도를 선택하세요"
                : dateFormat === "month"
                  ? "연-월을 선택하세요"
                  : "연-월-일을 선택하세요"
            }
          />
        )}
      </div>
    </div>
  );
};

export default ContentsHeader;
