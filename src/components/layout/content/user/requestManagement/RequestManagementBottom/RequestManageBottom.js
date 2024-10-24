import React, { useState } from "react";
import "./RequestManageBottom.css";
import TaskDetailLabel from "../../../../../labels/taskDetail/TaskDetailLabel";
import ProcessStatusLabel from "../../../../../labels/processStatus/ProcessStatusLabel";

const RequestManagementBottom = () => {
  // State for each dropdown
  const [selectedStatus, setSelectedStatus] = useState("접수완료");
  const [selectedTaskType, setSelectedTaskType] = useState("서비스요청");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("DB#1");

  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenTaskType, setIsOpenTaskType] = useState(false);
  const [isOpenEquipmentType, setIsOpenEquipmentType] = useState(false);

  // State for pagination
  const [activePage, setActivePage] = useState(1); // 현재 활성화된 페이지

  // Dropdown options
  const statusOptions = ["접수완료", "처리중", "처리완료"];
  const taskTypeOptions = ["서비스 요청", "장애 요청"];
  const equipmentTypeOptions = [
    "DB#1",
    "DB#2",
    "DB#3",
    "DB#4",
    "DB#5",
    "백업장비#1",
    "백업장비#2",
    "백업장비#3",
    "백업장비#4",
    "백업장비#5",
    "서버#1",
    "서버#2",
    "서버#3",
    "서버#4",
    "서버#5",
    "응용프로그램#1",
    "응용프로그램#2",
    "응용프로그램#3",
    "응용프로그램#4",
    "응용프로그램#5",
  ];

  // Handlers for each dropdown
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsOpenStatus(false);
  };

  const handleSelectTaskType = (option) => {
    setSelectedTaskType(option);
    setIsOpenTaskType(false);
  };

  const handleSelectEquipmentType = (option) => {
    setSelectedEquipmentType(option);
    setIsOpenEquipmentType(false);
  };

  // Handler for pagination click
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="requestListContainer">
      {/* Tabs for list management */}
      <div className="requestHeaderContainer">
        <div className="requestHeader">
          서비스 요청 목록
          <label id="toggle">
            <input role="switch" type="checkbox" className="toggle" />
          </label>
        </div>

        <button className="tabButton">요청등록</button>
      </div>

      {/* 처리상태, 업무유형, 장비유형 Dropdowns */}
      <div className="dropdownContainer">
        <div className="customDropdown">
          <div
            className="dropdownHeader"
            onClick={() => setIsOpenEquipmentType(!isOpenEquipmentType)}
          >
            장비유형:{" "}
            <span className={selectedEquipmentType ? "boldText" : "normalText"}>
              {selectedEquipmentType}
            </span>
            <span className="arrow">{isOpenEquipmentType ? "▲" : "▼"}</span>
          </div>
          {isOpenEquipmentType && (
            <div className="dropdownList">
              {equipmentTypeOptions.map((option) => (
                <label
                  key={option}
                  className={`dropdownOption ${
                    selectedEquipmentType === option ? "boldText" : "normalText"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedEquipmentType === option}
                    onChange={() => handleSelectEquipmentType(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="customDropdown">
          <div
            className="dropdownHeader"
            onClick={() => setIsOpenTaskType(!isOpenTaskType)}
          >
            업무유형:{" "}
            <span className={selectedTaskType ? "boldText" : "normalText"}>
              {selectedTaskType}
            </span>
            <span className="arrow">{isOpenTaskType ? "▲" : "▼"}</span>
          </div>
          {isOpenTaskType && (
            <div className="dropdownList">
              {taskTypeOptions.map((option) => (
                <label
                  key={option}
                  className={`dropdownOption ${
                    selectedTaskType === option ? "boldText" : "normalText"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTaskType === option}
                    onChange={() => handleSelectTaskType(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="customDropdown">
          <div
            className="dropdownHeader"
            onClick={() => setIsOpenStatus(!isOpenStatus)}
          >
            처리상태:{" "}
            <span className={selectedStatus ? "boldText" : "normalText"}>
              {selectedStatus}
            </span>
            <span className="arrow">{isOpenStatus ? "▲" : "▼"}</span>
          </div>
          {isOpenStatus && (
            <div className="dropdownList">
              {statusOptions.map((option) => (
                <label
                  key={option}
                  className={`dropdownOption ${
                    selectedStatus === option ? "boldText" : "normalText"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedStatus === option}
                    onChange={() => handleSelectStatus(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Layout */}
      <div className="tableContainer">
        <table className="requestTable">
          <thead>
            <tr>
              <th>요청자</th>
              <th>담당자</th>
              <th>장비 유형</th>
              <th>업무 유형</th>
              <th>요청 제목</th>
              <th>요청 시간</th>
              <th>완료 시간</th>
              <th>처리 상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>aaa1234</td>
              <td>22222</td>
              <td>#서버1</td>
              <td>
                <TaskDetailLabel taskType="장애예방" />
              </td>
              <td>업무요청 제목입니다.</td>
              <td>2023-10-22 11:00:00</td>
              <td>2023-10-22 12:00:00</td>
              <td>
                <ProcessStatusLabel processType="처리완료" />
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button>{"<"}</button>
          {Array.from({ length: 4 }, (_, index) => (
            <button
              key={index + 1}
              className={activePage === index + 1 ? "activePage" : ""}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default RequestManagementBottom;
