import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestManageBottom.css";
import TaskDetailLabel from "../../../../../labels/taskDetail/TaskDetailLabel";
import ProcessStatusLabel from "../../../../../labels/processStatus/ProcessStatusLabel";
import SearchBar from "../../../../../common/bar/SearchBar";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

// 한글 상태 -> 영어 enum 상태 변환 매핑
const statusMapping = {
  "접수 완료": "REGISTERED",
  진행중: "IN_PROGRESS",
  "처리 완료": "COMPLETED",
};

// 장비 유형 매핑
const equipmentTypeMapping = {
  전체: undefined,
  DB: "DB",
  백업: "백업",
  서버: "서버",
  응용프로그램: "응용프로그램",
};

const RequestManagementBottom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [selectedTaskDetail, setSelectedTaskDetail] = useState("전체");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("전체");
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenTaskType, setIsOpenTaskType] = useState(false);
  const [isOpenEquipmentType, setIsOpenEquipmentType] = useState(false);
  const [taskRequests, setTaskRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // 데이터를 필터링하고 가져오는 함수
  const fetchFilteredRequests = () => {
    axios
      .get("/requests", {
        params: {
          equipmentName:
            selectedEquipmentType !== "전체"
              ? equipmentTypeMapping[selectedEquipmentType]
              : undefined,
          taskDetail:
            selectedTaskDetail !== "전체" ? selectedTaskDetail : undefined,
          status:
            selectedStatus !== "전체"
              ? statusMapping[selectedStatus]
              : undefined,
          page,
          size,
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        if (responseData && Array.isArray(responseData.results)) {
          setTaskRequests(responseData.results);
          setTotalPages(responseData.totalPages);
          setPage(responseData.currentPage); // 현재 페이지 정보 업데이트
        } else {
          setTaskRequests([]);
          setTotalPages(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTaskRequests([]);
      });
  };

  useEffect(() => {
    fetchFilteredRequests();
  }, [selectedEquipmentType, selectedTaskDetail, selectedStatus, page, size]);

  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsOpenStatus(false);
    setPage(1); // Reset page when filter changes
  };

  const handleSelectTaskDetail = (option) => {
    setSelectedTaskDetail(option);
    setIsOpenTaskType(false);
    setPage(1); // Reset page when filter changes
  };

  const handleSelectEquipmentType = (option) => {
    setSelectedEquipmentType(option);
    setIsOpenEquipmentType(false);
    setPage(1); // Reset page when filter changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 5;

    if (totalPages <= maxDisplayPages) {
      // 전체 페이지 수가 적으면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pageNumbers;
  };

  const statusOptions = ["전체", "접수 완료", "진행중", "처리 완료"];
  const taskDetailOptions = ["전체", "장애 예방", "업무 지원", "기타"];
  const equipmentTypeOptions = ["전체", "DB", "백업", "서버", "응용프로그램"];

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="requestListContainer">
      <div className="requestHeaderContainer">
        <button className="tabButton" onClick={toggleModal}>
          요청등록
        </button>
        <SearchBar />
      </div>

      <div className="tableContainer">
        <table className="requestTable">
          <thead>
            <tr>
              <th>요청자</th>
              <th>담당자</th>
              <th>
                장비 유형
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenEquipmentType(!isOpenEquipmentType)}
                >
                  {isOpenEquipmentType && (
                    <div className="dropdownList">
                      {equipmentTypeOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${
                            selectedEquipmentType === option
                              ? "boldText"
                              : "normalText"
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
                  <span className="dropdownHeaderText">
                    {selectedEquipmentType}
                  </span>
                </div>
              </th>
              <th>
                업무 유형
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenTaskType(!isOpenTaskType)}
                >
                  {isOpenTaskType && (
                    <div className="dropdownList">
                      {taskDetailOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${
                            selectedTaskDetail === option
                              ? "boldText"
                              : "normalText"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedTaskDetail === option}
                            onChange={() => handleSelectTaskDetail(option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  <span className="dropdownHeaderText">
                    {selectedTaskDetail}
                  </span>
                </div>
              </th>
              <th>요청 제목</th>
              <th>요청 내용</th>
              <th>요청 시간</th>
              <th>완료 시간</th>
              <th>
                처리 상태
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenStatus(!isOpenStatus)}
                >
                  {isOpenStatus && (
                    <div className="dropdownList">
                      {statusOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${
                            selectedStatus === option
                              ? "boldText"
                              : "normalText"
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
                  <span className="dropdownHeaderText">{selectedStatus}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {taskRequests.map((task, index) => (
              <tr key={task.id || index}>
                <td>{task.requesterName}</td>
                <td>{task.managerName}</td>
                <td>{task.equipmentName}</td>
                <td>
                  <TaskDetailLabel taskDetail={task.taskDetail} />
                </td>
                <td>{task.title}</td>
                <td>{task.content}</td>
                <td>{formatDate(task.createTime)}</td>
                <td>
                  {task.status === "COMPLETED"
                    ? formatDate(task.updateTime)
                    : ""}
                </td>
                <td>
                  <ProcessStatusLabel processType={task.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="arrow-button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>
        {renderPageNumbers().map((number, index) =>
          number === "..." ? (
            <span key={index} className="dots">
              ...
            </span>
          ) : (
            <button
              key={number}
              className={`page-button ${page === number ? "activePage" : ""}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          )
        )}
        <button
          className="arrow-button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

// 날짜 배열을 포맷팅하는 함수
const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 6) return "Invalid date";
  const [year, month, day, hour, minute, second] = dateArray;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default RequestManagementBottom;
