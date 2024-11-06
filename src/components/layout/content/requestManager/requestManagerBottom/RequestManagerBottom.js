import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../styles/RequestManageBottom.css";
import SearchBar from "../../../../common/bar/SearchBar";
import EquipmentTypeLabel from "../../../../labels/equipmentType/EquipmentTypeLabel";
import TaskDetailLabel from "../../../../labels/taskDetail/TaskDetailLabel";
import TaskTypeLabel from "../../../../labels/taskType/TaskTypeLabel";
import ProcessStatusLabel from "../../../../labels/processStatus/ProcessStatusLabel";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

// 한글 상태 -> 영어 enum 상태 변환 매핑
const statusMapping = {
  "접수 완료": "REGISTERED",
  진행중: "IN_PROGRESS",
  "처리 완료": "COMPLETED",
};

const statusOptions = ["전체", "접수 완료", "진행중", "처리 완료"];

const RequestManagerBottom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [selectedTaskType, setSelectedTaskType] = useState("전체");
  const [selectedTaskDetail, setSelectedTaskDetail] = useState("전체");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("전체");

  // 드롭다운 열기/닫기 상태 분리
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenTaskType, setIsOpenTaskType] = useState(false);
  const [isOpenTaskDetail, setIsOpenTaskDetail] = useState(false);
  const [isOpenEquipmentType, setIsOpenEquipmentType] = useState(false);

  const [taskRequests, setTaskRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // 동적 드롭다운 옵션 상태
  const [taskTypeOptions, setTaskTypeOptions] = useState(["전체"]);
  const [taskDetailOptions, setTaskDetailOptions] = useState(["전체"]);
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState(["전체"]);

  // 드롭다운 옵션 데이터를 백엔드에서 가져오는 함수
  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const [systemsResponse, taskTypeResponse, taskDetailResponse] =
        await Promise.all([
          axios.get("/common/systems", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("/common/task-type", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("/common/task-detail", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      // `data` 속성 안에 있는 배열만 가져오도록 수정
      setEquipmentTypeOptions(
        Array.isArray(systemsResponse.data.data)
          ? systemsResponse.data.data
          : []
      );
      setTaskDetailOptions(
        Array.isArray(taskDetailResponse.data.data)
          ? taskDetailResponse.data.data
          : []
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  // 페이지 로드 시 옵션 데이터를 가져옴
  useEffect(() => {
    fetchOptions();
  }, []);

  // 데이터를 필터링하고 가져오는 함수
  const fetchFilteredRequests = () => {
    const token = localStorage.getItem("accessToken");

    axios
      .get("/common/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: selectedTaskType !== "전체" ? selectedTaskType : undefined,
          equipmentName:
            selectedEquipmentType !== "전체"
              ? selectedEquipmentType
              : undefined,
          taskDetail:
            selectedTaskDetail !== "전체" ? selectedTaskDetail : undefined,
          status:
            selectedStatus !== "전체"
              ? statusMapping[selectedStatus]
              : undefined,
          keyword: searchTerm,
          page,
          size,
        },
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        if (responseData && Array.isArray(responseData.results)) {
          setTaskRequests(responseData.results);
          setTotalPages(responseData.totalPages);
          setPage(responseData.currentPage);
        } else {
          setTaskRequests([]);
          setFilteredRequests([]);
          setTotalPages(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTaskRequests([]);
        setFilteredRequests([]);
      });
  };

  useEffect(() => {
    fetchFilteredRequests();
  }, [
    selectedTaskType,
    selectedEquipmentType,
    selectedTaskDetail,
    selectedStatus,
    page,
    size,
    searchTerm,
  ]);

  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsOpenStatus(false);
    setPage(1);
  };

  const handleSelectTaskType = (option) => {
    setSelectedTaskType(option);
    setIsOpenTaskType(false);
    setPage(1);
  };

  const handleSelectTaskDetail = (option) => {
    setSelectedTaskDetail(option);
    setIsOpenTaskDetail(false);
    setPage(1);
  };

  const handleSelectEquipmentType = (option) => {
    setSelectedEquipmentType(option);
    setIsOpenEquipmentType(false);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const [pageGroup, setPageGroup] = useState(0);

  const renderPageNumbers = () => {
    const maxDisplayPages = 6;
    const startPage = pageGroup * maxDisplayPages + 1;
    const endPage = Math.min(startPage + maxDisplayPages - 1, totalPages);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleNextPageGroup = () => {
    if ((pageGroup + 1) * 6 < totalPages) {
      setPageGroup(pageGroup + 1);
    }
  };

  const handlePreviousPageGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="requestListContainer">
      <div className="requestHeaderContainer">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="tableContainer">
        <table className="requestTable">
          <thead>
            <tr>
              <th>
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenTaskType(!isOpenTaskType)}
                >
                  <span className="dropdownHeaderLabel">요청 분류 : </span>
                  <span className="dropdownHeaderText">{selectedTaskType}</span>
                  {isOpenTaskType && (
                    <div className="dropdownList">
                      {taskTypeOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${selectedTaskType === option ? "boldText" : "normalText"}`}
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
              </th>
              <th>
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenEquipmentType(!isOpenEquipmentType)}
                >
                  <span className="dropdownHeaderLabel">시스템 유형 : </span>
                  <span className="dropdownHeaderText">
                    {selectedEquipmentType}
                  </span>
                  {isOpenEquipmentType && (
                    <div className="dropdownList">
                      {equipmentTypeOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${selectedEquipmentType === option ? "boldText" : "normalText"}`}
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
              </th>
              <th>
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenTaskDetail(!isOpenTaskDetail)}
                >
                  <span className="dropdownHeaderLabel">업무 유형 : </span>
                  <span className="dropdownHeaderText">
                    {selectedTaskDetail}
                  </span>
                  {isOpenTaskDetail && (
                    <div className="dropdownList">
                      {taskDetailOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${selectedTaskDetail === option ? "boldText" : "normalText"}`}
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
                </div>
              </th>
              <th>요청 제목</th>
              <th>요청 내용</th>
              <th>요청 시간</th>
              <th>완료 시간</th>
              <th>
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenStatus(!isOpenStatus)}
                >
                  <span className="dropdownHeaderLabel">처리 상태 : </span>
                  <span className="dropdownHeaderText">{selectedStatus}</span>
                  {isOpenStatus && (
                    <div className="dropdownList">
                      {statusOptions.map((option) => (
                        <label
                          key={option}
                          className={`dropdownOption ${selectedStatus === option ? "boldText" : "normalText"}`}
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
              </th>
            </tr>
          </thead>

          <tbody>
            {taskRequests.map((task, index) => (
              <tr key={task.id || index}>
                <td>
                  <TaskTypeLabel taskType={task.type} />
                </td>
                <td className="equipmentCell">
                  <EquipmentTypeLabel equipmentType={task.equipmentName} />
                </td>

                <td>
                  <TaskDetailLabel taskDetail={task.taskDetail} />
                </td>
                <td className="truncate">{task.title}</td>
                <td className="truncate">{task.content}</td>
                <td>{formatDateTime(task.createTime)}</td>
                <td>
                  {task.status === "COMPLETED"
                    ? formatDateTime(task.updateTime)
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

      <div className="pagination">
        <button
          className="arrow-button"
          onClick={handlePreviousPageGroup}
          disabled={pageGroup === 0}
        >
          {"<"}
        </button>

        {renderPageNumbers().map((number) => (
          <button
            key={number}
            className={`page-button ${page === number ? "activePage" : ""}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="arrow-button"
          onClick={handleNextPageGroup}
          disabled={(pageGroup + 1) * 6 >= totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export default RequestManagerBottom;
