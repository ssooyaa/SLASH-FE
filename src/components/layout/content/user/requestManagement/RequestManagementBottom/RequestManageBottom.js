import React, { useState } from "react";
import "./RequestManageBottom.css";
import CreateRequest from "../../../../../feature/request/create/CreateRequest";
import TaskDetailLabel from "../../../../../labels/taskDetail/TaskDetailLabel";
import ProcessStatusLabel from "../../../../../labels/processStatus/ProcessStatusLabel";

const RequestManagementBottom = () => {
  // 모달 열기/닫기 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 드롭다운 선택 상태
  const [selectedStatus, setSelectedStatus] = useState("접수완료");
  const [selectedTaskType, setSelectedTaskType] = useState("서비스요청");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("DB#1");

  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenTaskType, setIsOpenTaskType] = useState(false);
  const [isOpenEquipmentType, setIsOpenEquipmentType] = useState(false);

  // 페이지네이션 상태
  const [activePage, setActivePage] = useState(1); // 현재 활성화된 페이지

  // 드롭다운 옵션
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

  // 상태 변경 핸들러
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

  // 페이지네이션 핸들러
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // 모달 열기/닫기 핸들러
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="requestListContainer">
      {/* 요청 목록 상단 헤더 */}
      <div className="requestHeaderContainer">
        <div className="requestHeader">
          서비스 요청 목록
          <label id="toggle">
            <input role="switch" type="checkbox" className="toggle" />
          </label>
        </div>
        {/* 요청 등록 버튼 */}
        <button className="tabButton" onClick={toggleModal}>
          요청등록
        </button>
      </div>

      {/* 요청 등록 모달 */}
      {isModalOpen && (
        <CreateRequest
          isModalOpen={isModalOpen}
          toggleModal={toggleModal} // 모달 상태 변경 함수 전달
        />
      )}

      {/* 처리상태, 업무유형, 장비유형 드롭다운 */}
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

      {/* 요청 목록 테이블 */}
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
              <td>담당자</td>
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
            {/* 추가적인 데이터들을 여기에 넣으면 됩니다. */}
          </tbody>
        </table>

        {/* 페이지네이션 */}
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
