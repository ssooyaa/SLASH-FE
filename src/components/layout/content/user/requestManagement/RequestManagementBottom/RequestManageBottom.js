import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchOptions,
  fetchFilteredRequests,
} from "../../../../../../api/UserService";
import "../../../../../../styles/RequestManageBottom.css";
import CreateRequest from "../../../../../feature/request/create/CreateRequest";
import TaskDetailLabel from "../../../../../labels/taskDetail/TaskDetailLabel";
import ProcessStatusLabel from "../../../../../labels/processStatus/ProcessStatusLabel";
import SearchBar from "../../../../../common/bar/SearchBar";
import EquipmentTypeLabel from "../../../../../labels/equipmentType/EquipmentTypeLabel";
import ShowRequestDetailModal from "../../../../../feature/request/select/RequestDetailModal";

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
  const [selectedTaskType, setSelectedTaskType] = useState("전체");
  const [selectedTaskDetail, setSelectedTaskDetail] = useState("전체");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("전체");

  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenTaskType, setIsOpenTaskType] = useState(false);
  const [isOpenTaskDetail, setIsOpenTaskDetail] = useState(false);
  const [isOpenEquipmentType, setIsOpenEquipmentType] = useState(false);

  const [taskRequests, setTaskRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [taskTypeOptions, setTaskTypeOptions] = useState(["전체"]);
  const [taskDetailOptions, setTaskDetailOptions] = useState(["전체"]);
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState(["전체"]);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const statusOptions = ["전체", "접수 완료", "진행중", "처리 완료"];

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const options = await fetchOptions();
        setEquipmentTypeOptions([...options.equipmentTypeOptions]);
        setTaskTypeOptions([...options.taskTypeOptions]);
        setTaskDetailOptions([...options.taskDetailOptions]);
      } catch (error) {
        console.error("Error loading options:", error);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const loadFilteredRequests = async () => {
      try {
        const response = await fetchFilteredRequests({
          selectedTaskType,
          selectedEquipmentType,
          selectedTaskDetail,
          selectedStatus,
          searchTerm,
          page,
          size,
          statusMapping,
        });
        setTaskRequests(response.results);
        setTotalPages(response.totalPages);
        setPage(response.currentPage);
      } catch (error) {
        console.error("Error loading filtered requests:", error);
      }
    };

    loadFilteredRequests();
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

  const toggleRequestModal = () => {
    setIsRequestModalOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const openModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
  };

  return (
    <div className="requestListContainer">
      {/* 요청 목록 상단 헤더 */}
      <div className="requestHeaderContainer">
        <div className="headerTop">
          <button className="tabButton" onClick={toggleRequestModal}>
            요청 등록
          </button>
          {isRequestModalOpen && (
            <CreateRequest
              isModalOpen={isRequestModalOpen}
              toggleModal={toggleRequestModal} // 모달 상태 변경 함수 전달
              contractId={1}
            />
          )}
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
                      {taskDetailOptions.map(
                        (
                          option,
                          index // index를 key로 사용
                        ) => (
                          <label
                            key={index} // index로 key 설정
                            className={`dropdownOption ${selectedTaskDetail === option ? "boldText" : "normalText"}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedTaskDetail === option}
                              onChange={() => handleSelectTaskDetail(option)}
                            />
                            {option}
                          </label>
                        )
                      )}
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
              <tr className="clickableRow" key={task.requester || index}>
                <td onClick={() => openModal(task.id)}>{task.requesterName}</td>
                <td onClick={() => openModal(task.id)}>{task.managerName}</td>
                <td
                  className="equipmentCell"
                  onClick={() => openModal(task.id)}
                >
                  <EquipmentTypeLabel equipmentType={task.equipmentName} />
                </td>
                <td onClick={() => openModal(task.id)}>
                  <TaskDetailLabel taskDetail={task.taskDetail} />
                </td>
                <td className="truncate" onClick={() => openModal(task.id)}>
                  {task.title}
                </td>
                <td className="truncate" onClick={() => openModal(task.id)}>
                  {task.content}
                </td>
                <td onClick={() => openModal(task.id)}>
                  {formatDateTime(task.createTime)}
                </td>
                <td onClick={() => openModal(task.id)}>
                  {task.status === "COMPLETED"
                    ? formatDateTime(task.updateTime)
                    : ""}
                </td>
                {/* 마지막 <td>는 클릭 이벤트 없음 */}
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
          className="arrowButton"
          onClick={handlePreviousPageGroup}
          disabled={pageGroup === 0}
        >
          {"<"}
        </button>

        {renderPageNumbers().map((number) => (
          <button
            key={number}
            className={`pageButton ${page === number ? "activePage" : ""}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="arrowButton"
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

export default RequestManagementBottom;
