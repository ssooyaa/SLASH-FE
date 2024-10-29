import React, { useState } from "react";
import "./RequestManageBottom.css";
import TaskDetailLabel from "../../../../../labels/taskDetail/TaskDetailLabel";
import ProcessStatusLabel from "../../../../../labels/processStatus/ProcessStatusLabel";
import RequestLabel from "../../../../../labels/request/RequestLabel";

const RequestManagementBottom = ({ ModalComponent }) => {
  const dropdowns = {
    requestType: ["서비스 요청", "장애 요청"],
    equipmentType: [
      "DB#1",
      "DB#2",
      "DB#3",
      "DB#4",
      "DB#5",
      "백업장비#1",
      "백업장비#2",
      "서버#1",
      "서버#2",
      "응용프로그램#1",
    ],
    workType: ["장애예방", "업무지원", "기타"],
    timelyStatus: ["o", "x"],
    processStatus: ["접수완료", "처리중", "처리완료"],
  };

  const [dropdownStates, setDropdownStates] = useState({
    requestType: "서비스 요청",
    equipmentType: "서버#1",
    workType: "장애예방",
    timelyStatus: "o",
    processStatus: "접수완료",
  });

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6; // 한 페이지에 표시할 데이터 수

  const openModal = (key) => setActiveDropdown(key);
  const closeModal = () => setActiveDropdown(null);

  const handleSelectOption = (key, option) => {
    setDropdownStates((prev) => ({ ...prev, [key]: option }));
    setActiveDropdown(null);
  };
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 예시 데이터
  const exampleData = [
    {
      requestType: "서비스 요청",
      equipmentType: "서버#1",
      workType: "장애예방",
      title: "업무요청 제목 1",
      content: "요청 내용 1...",
      requestTime: "2023-10-22 12:00:00",
      completionTime: "2023-10-23 12:00:00",
      timelyStatus: "o",
      processStatus: "접수완료",
    },
    {
      requestType: "서비스 요청",
      equipmentType: "서버#1",
      workType: "장애예방",
      title: "업무요청 제목 1111",
      content: "요청 내용 1111...",
      requestTime: "2023-10-22 12:00:00",
      completionTime: "2023-10-23 12:00:00",
      timelyStatus: "o",
      processStatus: "접수완료",
    },
    {
      requestType: "서비스 요청",
      equipmentType: "서버#1",
      workType: "장애예방",
      title: "업무요청 제목 1",
      content: "요청 내용 1...",
      requestTime: "2023-10-22 12:00:00",
      completionTime: "2023-10-23 12:00:00",
      timelyStatus: "o",
      processStatus: "접수완료",
    },

    {
      requestType: "서비스 요청",
      equipmentType: "백업장비#1",
      workType: "기타",
      title: "업무요청 제목 3",
      content: "요청 내용 3...",
      requestTime: "2023-10-20 09:00:00",
      completionTime: "2023-10-20 18:00:00",
      timelyStatus: "o",
      processStatus: "접수완료",
    },
    {
      requestType: "장애 요청",
      equipmentType: "응용프로그램#1",
      workType: "장애예방",
      title: "업무요청 제목 4",
      content: "요청 내용 4...",
      requestTime: "2023-10-19 15:00:00",
      completionTime: "2023-10-20 15:00:00",
      timelyStatus: "x",
      processStatus: "접수완료",
    },
    {
      requestType: "장애 요청",
      equipmentType: "응용프로그램#1",
      workType: "장애예방",
      title: "업무요청 제목 5",
      content: "요청 내용 5...",
      requestTime: "2023-10-19 15:00:00",
      completionTime: "2023-10-20 17:00:00",
      timelyStatus: "x",
      processStatus: "접수완료",
    },
  ];

  // 선택한 드롭다운 값에 따라 데이터를 필터링
  const filteredData = exampleData.filter(
    (item) =>
      item.requestType === dropdownStates.requestType &&
      item.equipmentType === dropdownStates.equipmentType &&
      item.workType === dropdownStates.workType &&
      item.timelyStatus === dropdownStates.timelyStatus &&
      item.processStatus === dropdownStates.processStatus
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  // 현재 페이지에 맞는 데이터만 슬라이싱
  const displayedData = filteredData.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // 다음 페이지 이동 핸들러
  const handleNextPage = () => {
    if (activePage < totalPages) {
      setActivePage((prevPage) => prevPage + 1);
    }
  };

  // 이전 페이지 이동 핸들러
  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };

  const renderDropdown = (key, label) => (
    <th key={key}>
      <div className="dropdownHeader" onClick={() => openModal(key)}>
        {dropdownStates[key]} <span className="arrow">▼</span>
      </div>
    </th>
  );

  return (
    <div className="requestListContainer">
      <div className="requestHeaderContainer">
        <div className="requestHeader">요청 목록</div>
        <input
          type="text"
          className="searchInput"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="tabButton">요청등록</button>
      </div>

      <div className="tableContainer">
        <table className="requestTable">
          <thead>
            <tr>
              {renderDropdown("requestType", "요청 분류")}
              {renderDropdown("equipmentType", "장비 유형")}
              {renderDropdown("workType", "업무 유형")}
              <th>요청 제목</th>
              <th>요청 내용</th>
              <th>요청 시간</th>
              <th>완료 시간</th>
              {renderDropdown("timelyStatus", "적기 처리 여부")}
              {renderDropdown("processStatus", "처리 상태")}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data, index) => (
              <tr key={index}>
                <td>
                  <RequestLabel requestType={data.requestType} />
                </td>
                <td>{data.equipmentType}</td>
                <td>
                  <TaskDetailLabel taskType={data.workType} />
                </td>
                <td>{data.title}</td>
                <td>{data.content}</td>
                <td>{data.requestTime}</td>
                <td>{data.completionTime}</td>
                <td>{data.timelyStatus}</td>
                <td>
                  <ProcessStatusLabel processType={data.processStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 모달 컴포넌트 */}
        <ModalComponent
          isOpen={!!activeDropdown}
          options={activeDropdown ? dropdowns[activeDropdown] : []}
          selectedOption={
            activeDropdown ? dropdownStates[activeDropdown] : null
          }
          onSelect={(option) => handleSelectOption(activeDropdown, option)}
          onClose={closeModal}
        />
        {/* 페이지네이션 */}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={activePage === 1}>
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={activePage === index + 1 ? "activePage" : ""}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={activePage === totalPages}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestManagementBottom;
