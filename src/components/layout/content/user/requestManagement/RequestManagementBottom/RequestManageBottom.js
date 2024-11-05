import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../../../styles/RequestManageBottom.css";
import CreateRequest from "../../../../../feature/request/create/CreateRequest";
import TaskDetailLabel from "../../../../../labels/taskDetail/TaskDetailLabel";
import ProcessStatusLabel from "../../../../../labels/processStatus/ProcessStatusLabel";
import SearchBar from "../../../../../common/bar/SearchBar";
import EquipmentTypeLabel from "../../../../../labels/equipmentType/EquipmentTypeLabel";
import ShowRequestDetailModal from "../../../../../feature/request/select/RequestDetailModal";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

// 한글 상태 -> 영어 enum 상태 변환 매핑
const statusMapping = {
  "접수 완료": "REGISTERED",
  진행중: "IN_PROGRESS",
  "처리 완료": "COMPLETED",
};

const RequestManagementBottom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [selectedTaskDetail, setSelectedTaskDetail] = useState("전체");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("전체");

  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenTaskDetail, setIsOpenTaskDetail] = useState(false);
  const [isOpenEquipmentType, setIsOpenEquipmentType] = useState(false);

  const [taskRequests, setTaskRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // 동적 드롭다운 옵션 상태
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

      setEquipmentTypeOptions(systemsResponse.data);
      setTaskDetailOptions(taskDetailResponse.data);
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
          keyword: searchTerm, // 검색어 추가
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
    setPage(1); // Reset page when filter changes
  };

  const handleSelectTaskDetail = (option) => {
    setSelectedTaskDetail(option);
    setIsOpenTaskDetail(false);
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset page when search changes
  };

  const [pageGroup, setPageGroup] = useState(0);

  const renderPageNumbers = () => {
    const maxDisplayPages = 6; // 한번에 표시할 페이지 수
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

  const statusOptions = ["전체", "접수 완료", "진행중", "처리 완료"];

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  //모달 열고 requestId 설정
  const openModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  //모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
  };

  return (
    <div className="requestListContainer">
      {/* 요청 목록 상단 헤더 */}
      <div className="requestHeaderContainer">
        <div className="headerTop">
          <button className="tabButton" onClick={toggleModal}>
            요청 등록
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="tableContainer">
        <table className="requestTable">
          <thead>
            <tr>
              <th>요청자</th>
              <th>담당자</th>
              <th>
                <div
                  className="customDropdown"
                  onClick={() => setIsOpenEquipmentType(!isOpenEquipmentType)}
                >
                  <span className="dropdownHeaderLabel">장비 유형 : </span>
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
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {taskRequests.map((task, index) => (
              <tr key={task.requester || index}>
                <td onClick={() => openModal(task.requester)}>
                  {task.requesterName}
                </td>
                <td onClick={() => openModal(task.requester)}>
                  {task.managerName}
                </td>
                <td
                  className="equipmentCell"
                  onClick={() => openModal(task.requester)}
                >
                  <EquipmentTypeLabel equipmentType={task.equipmentName} />
                </td>
                <td onClick={() => openModal(task.requester)}>
                  <TaskDetailLabel taskDetail={task.taskDetail} />
                </td>
                <td
                  className="truncate"
                  onClick={() => openModal(task.requester)}
                >
                  {task.title}
                </td>
                <td
                  className="truncate"
                  onClick={() => openModal(task.requester)}
                >
                  {task.content}
                </td>
                <td onClick={() => openModal(task.requester)}>
                  {formatDate(task.createTime)}
                </td>
                <td onClick={() => openModal(task.requester)}>
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
        {/* 모달이 열려 있을 때만 ShowRequestDetailModal 컴포넌트 표시 */}
        {isModalOpen && (
          <ShowRequestDetailModal
            toggleModal={closeModal}
            requestId={selectedRequestId}
          />
        )}
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

const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 5) return "Invalid date";
  const [year, month, day, hour, minute] = dateArray;
  return `${year}.${month}.${day} ${hour}시${minute}분`;
};

export default RequestManagementBottom;
