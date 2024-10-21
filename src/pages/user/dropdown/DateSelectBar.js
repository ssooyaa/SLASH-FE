import React, { useState } from "react";
import "./DateSelectBox.css";
import GradeChart from "../chart/GradeChart";

const DateSelectBar = () => {
  const [selectedType, setSelectedType] = useState("MONTH"); // 초기 값을 'MONTH'로 설정
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("8");
  const [selectedQuarter, setSelectedQuarter] = useState("1");

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const years = ["2024", "2023", "2022", "2021", "2020"];
  const quarters = ["1", "2", "3", "4"];

  const total_request = 9;
  const processed_timely = 4;
  const delayed_processing_cases = 5;

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const Month = () => {
    return (
      <div className="date-select-component">
        <select
          name="month"
          id="month"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const Quarter = () => {
    return (
      <div className="date-select-component">
        <select
          name="quarter"
          id="quarter"
          onChange={(e) => setSelectedQuarter(e.target.value)}
          value={selectedQuarter}
        >
          {quarters.map((quarter) => (
            <option key={quarter} value={quarter}>
              {quarter}분기
            </option>
          ))}
        </select>
      </div>
    );
  };

  const Year = () => {
    return (
      <div className="date-select-component">
        <select
          name="years"
          id="years"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          style={{
            maxHeight: "100px",
            overflowY: "auto",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const TotalGrade = () => {
    const grade = "S";
    const total = 96.8 + "점";

    return (
      <div className="total-grade-content">
        <h3>종합 평가 등급</h3>
        <div className="grade">{grade}</div>
        <div className="total">{total}</div>
      </div>
    );
  };

  return (
    <>
      <div className="date-select-box">
        <div className="date-select-component">
          <select onChange={handleTypeChange} value={selectedType}>
            {["MONTH", "QUARTER", "YEAR"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <Year />
        {selectedType === "MONTH" && <Month />}
        {selectedType === "QUARTER" && <Quarter />}
      </div>

      <div className="grid">
        <div className="total-grade-box">
          <TotalGrade></TotalGrade>
        </div>

        <div className="grade-chart">
          <GradeChart />
        </div>
        <div className="column">
          <div className="column_content">
            <h3>
              <span className="number">{total_request}</span>건
            </h3>
            <span>전체 요청 건수</span>
          </div>

          <div className="column_content">
            <h3>
              <span className="number">{processed_timely}</span>건
            </h3>
            <span>적기 처리 건수</span>
          </div>

          <div className="column_content">
            <h3>
              <span className="number">{delayed_processing_cases}</span>건
            </h3>
            <span>지연 처리 건수</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateSelectBar;
