import React from "react";
import "./MonthPicker.css";

const MonthPicker = ({ year, setYear, month, setMonth, onChange }) => {
  const changeYear = (direction) => {
    const newYear = year + direction;
    setYear(newYear); // 부모 컴포넌트의 연도 상태 업데이트
    onChange(newYear, month); // 데이터 변경 핸들러 호출
  };

  const selectMonth = (selectedMonth) => {
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    setMonth(formattedMonth); // 부모 컴포넌트의 월 상태 업데이트
    onChange(year, formattedMonth); // 데이터 변경 핸들러 호출
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="yearMonthPicker">
      <div className="yearSelector">
        <button onClick={() => changeYear(-1)}>&lt;</button>
        <span>{year}</span>
        <button onClick={() => changeYear(1)}>&gt;</button>
      </div>
      <div className="monthGrid">
        {months.map((m, index) => (
          <div
            key={index}
            className={`month ${String(index + 1).padStart(2, "0") === month ? "selected" : ""}`}
            onClick={() => selectMonth(index + 1)}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
