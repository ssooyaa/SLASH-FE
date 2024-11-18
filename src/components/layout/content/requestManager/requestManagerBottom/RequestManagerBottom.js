import React, { useEffect, useState } from "react";
import {
  fetchOptions,
  fetchFilteredRequests,
} from "../../../../../api/UserService";
import "../../../../../styles/RequestManageBottom.css";
import SearchBar from "../../../../common/bar/SearchBar";
import EquipmentTypeLabel from "../../../../labels/equipmentType/EquipmentTypeLabel";
import TaskDetailLabel from "../../../../labels/taskDetail/TaskDetailLabel";
import TaskTypeLabel from "../../../../labels/taskType/TaskTypeLabel";
import ProcessStatusLabel from "../../../../labels/processStatus/ProcessStatusLabel";
import ShowRequestDetailModal from "../../../../feature/request/select/RequestDetailModal";

const statusMapping = {
  "접수 완료": "REGISTERED",
  진행중: "IN_PROGRESS",
  "처리 완료": "COMPLETED",
};

const statusOptions = ["전체", "접수 완료", "진행중", "처리 완료"];

const RequestManagerBottom = ({ agreementId, date }) => {
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
  const [size, setSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [taskTypeOptions, setTaskTypeOptions] = useState(["전체"]);
  const [taskDetailOptions, setTaskDetailOptions] = useState(["전체"]);
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState(["전체"]);

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
    console.log("Agreement ID:", agreementId);
    console.log("Date:", date);

    const loadFilteredRequests = async () => {
      if (agreementId) {
        try {
          let year, month;

          // date 값이 있으면 year와 month를 추출
          if (date) {
            [year, month] = date.split("-");
          }

          const response = await fetchFilteredRequests({
            selectedTaskType,
            selectedEquipmentType,
            selectedTaskDetail,
            selectedStatus,
            searchTerm,
            page,
            size,
            statusMapping,
            contractId: agreementId, // agreementId 매핑
            year: year || undefined, // date 없으면 year 제외
            month: month || undefined, // date 없으면 month 제외
          });

          setTaskRequests(response.results);
          setTotalPages(response.totalPages);
          setPage(response.currentPage);
        } catch (error) {
          console.error("Error loading filtered requests:", error);
        }
      } else {
        console.warn("Agreement ID is missing. Skipping request.");
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
    agreementId, // dependency 추가
    date, // dependency 추가
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

  const openModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
    console.log(requestId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
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
                          className={`dropdownOption ${
                            selectedTaskType === option
                              ? "boldText"
                              : "normalText"
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
                      {taskDetailOptions.map((option, index) => (
                        <label
                          key={index}
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
              <tr
                key={task.id || index}
                className="clickableRow"
                onClick={() => openModal(task.id)}
              >
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
      {isModalOpen && (
        <ShowRequestDetailModal
          toggleModal={closeModal}
          requestId={selectedRequestId}
        />
      )}
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
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export default RequestManagerBottom;
