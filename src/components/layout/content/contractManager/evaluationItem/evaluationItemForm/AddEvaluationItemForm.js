import React, { useState, useEffect } from "react";
import "./AddEvaluationItemForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceDetailInputTable from "../../../../../feature/table/ServiceDetailInputTable";
import InputTable from "../../../../../feature/table/InputTable";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";
import NoScoreGradeInputTable from "../../../../../feature/table/NoScoreGradeInputTable";
import TaskDetailInputTable from "../../../../../feature/table/TaskDetailInputTable";
import {
  CreateServiceDetail,
  evaluationItemInitialData,
} from "../../../../../../api/ContractManagerService";

const AddEvaluationItemForm = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const contractId = location.state?.contractId;

  const contractName = location.state?.contractName;

  const [isCustomInput, setIsCustomInput] = useState(false);

  const [formData, setFormData] = useState({
    contractId: contractId,
    category: "",
    weight: 0,
    period: "월별",
    purpose: "",
    formula: "",
    unit: "율(%)",
    serviceTargets: [],
    taskTypes: [],
  });

  const [serviceTargets, setServiceTargets] = useState([]);

  const [taskTypes, setTaskTypes] = useState([]);

  const [taskTable, setTaskTable] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "custom") {
      setIsCustomInput(true);
      setFormData((prev) => ({
        contractId: contractId,
        category: "",
        weight: 0,
        period: "월별",
        purpose: "",
        formula: "",
        unit: "율(%)",
        serviceTargets: [],
        taskTypes: [], // 직접 입력 모드일 경우 category를 초기화
      }));
    } else {
      setIsCustomInput(false);
      setFormData((prev) => ({
        ...prev,
        category: selectedValue, // 셀렉트 박스의 값으로 category 업데이트
      }));
    }
  };

  // category가 변경될 때마다 API 호출하여 데이터 업데이트
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (
        formData.category === "서비스 가동률" ||
        formData.category === "서비스요청 적기처리율" ||
        formData.category === "장애 적기처리율"
      ) {
        try {
          const data = await evaluationItemInitialData(formData.category);
          if (data) {
            setFormData((prev) => ({
              ...prev,
              ...data, // 기존 데이터에 API 데이터 병합
            }));
          }
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }
    };

    fetchCategoryData();
  }, [formData.category]); // category 값이 변경될 때마다 실행

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedFormData);
  };

  const handleServiceTargets = (value) => {
    setServiceTargets(value);
    handleChange("serviceTargets", value);
  };

  const handleTaskDetail = (value) => {
    const updatedTaskTypes = value.map((item) => {
      if (typeof item === "object") {
        return {
          type:
            formData.category === "서비스요청 적기처리율"
              ? "서비스 요청"
              : formData.category.split(" ")[0] + " 요청",
          taskDetail: item.taskDetail,
          deadline: item.deadline ? item.deadline : 0,
          serviceRelevance:
            item.serviceRelevance !== undefined ? item.serviceRelevance : false,
          inclusionStatus:
            item.inclusionStatus !== undefined ? item.inclusionStatus : false,
        };
      } else if (typeof item === "string") {
        return {
          type:
            formData.category === "서비스요청 적기처리율"
              ? "서비스 요청"
              : formData.category.split(" ")[0] + " 요청",
          taskDetail: item,
        };
      } else {
        return null;
      }
    });

    setTaskTypes(updatedTaskTypes);
    handleChange("taskTypes", updatedTaskTypes);
  };

  const handleAddTask = () => {
    setTaskTable(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleRemoveTask = () => {
    setTaskTable(false);
    setSelectedOption(null);
    setTaskTypes([]);
    handleChange("taskTypes", []);
  };

  const handleRedirect = () => {
    navigate(-1);
  };

  const isValid = () => {
    if (formData.category === "") {
      alert("평가 항목을 입력해 주세요");
      return false;
    }
    if (formData.weight === 0) {
      alert("가중치를 입력해 주세요");
      return false;
    }

    if (formData.purpose === "") {
      alert("서비스 목적을 입력해주세요");
      return false;
    }

    if (formData.formula === "") {
      alert("산출식을 입력해주세요");
      return false;
    }

    if (serviceTargets.length === 0) {
      alert("평가 점수를 입력해 주세요");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChange("contractId", contractId);

    const filterServiceTargets = formData.serviceTargets.filter(
      (target) => target.grade !== ""
    );

    const updatedTaskTypes = formData.taskTypes.filter(
      (target) => target.taskDetail !== ""
    );

    const updateFormData = {
      ...formData,
      serviceTargets: filterServiceTargets,
      taskTypes: updatedTaskTypes,
    };

    if (!isValid()) {
      return; //미입력값 있을 시 제출 불가
    }

    try {
      const response = await CreateServiceDetail(updateFormData);
      if (response) {
        alert("저장 되었습니다.");
        navigate("/contractManager/contractDetail", {
          state: { contractId },
        });
      }
    } catch (error) {
      alert("저장 실패");
      console.log("저장 실패");
    }
  };

  return (
    <div className="evaluationItemDiv">
      <div className="evaluationContractTitle">
        <span className="contractTitleSpan">*</span>
        <p>협약서: {contractName}</p>
      </div>

      <div className="evaluationItemForm">
        <div className="evaluationItemInfo">
          <div className="evaluationItemTitle">
            <select
              className={`evaluationItemTitleInput ${isCustomInput ? "shortSelect" : ""}`}
              name="category"
              value={isCustomInput ? "custom" : formData.category}
              onChange={handleSelectChange}
            >
              <option value="">서비스 항목을 선택해 주세요</option>
              <option value="서비스 가동률">서비스 가동률</option>
              <option value="서비스요청 적기처리율">
                서비스요청 적기처리율
              </option>
              <option value="장애 적기처리율">장애 적기처리율</option>
              <option value="custom">직접 입력</option>
            </select>
            {isCustomInput && (
              <input
                className="evaluationItemTitleInput customInput"
                type="text"
                name="category"
                placeholder="서비스 항목을 입력해 주세요"
                value={formData.category}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            )}
          </div>
          <div className="serviceDetailDiv">
            <div className="tableTitle inputTableTitle">
              <p>서비스 평가 항목 상세</p>
              <span>*</span>
            </div>
            <div className="table serviceDetailTable">
              <ServiceDetailInputTable
                initialData={formData}
                handleData={handleChange}
              />
            </div>
          </div>
          <div className="gradeTableDetail">
            <div className="tableTitle inputTableTitle">
              <p>SLA 평가 등급</p>
              <span>*</span>
            </div>
            <div className="table">
              {formData.unit === "건수" ? (
                <GradeInputTable
                  initialData={serviceTargets}
                  onDataChange={handleServiceTargets}
                />
              ) : (
                <NoScoreGradeInputTable
                  initialData={serviceTargets}
                  onDataChange={handleServiceTargets}
                />
              )}
            </div>
          </div>
          <div className="taskTableDetail">
            <div className="tableTitle inputTableTitle taskTitle">
              <p>업무 유형</p>
              <span>*</span>
              {!taskTable ? (
                <div onClick={handleAddTask} className="addTaskButton">
                  <button className="tableControlBtn">추가하기</button>
                </div>
              ) : (
                <div
                  onClick={() => handleRemoveTask()}
                  className="removeTaskButton"
                >
                  <button className="tableControlBtn"> 삭제하기</button>
                </div>
              )}
            </div>
            <div className="table">
              {taskTable && (
                <div className="taskOptions">
                  {!selectedOption ? (
                    <div className="addTableButton">
                      <button onClick={() => handleOptionSelect("업무유형")}>
                        업무 유형 테이블
                      </button>
                      <button onClick={() => handleOptionSelect("유형및시간")}>
                        유형 및 시간 테이블
                      </button>
                    </div>
                  ) : (
                    <div className="taskTable">
                      {selectedOption === "업무유형" && (
                        <div className="table yourTableClass">
                          <InputTable
                            label="업무 유형"
                            initialData={taskTypes.map(
                              (item) => item.taskDetail
                            )}
                            onDataChange={handleTaskDetail}
                          />
                        </div>
                      )}
                      {selectedOption === "유형및시간" && (
                        <div className="table yourTableClass">
                          <TaskDetailInputTable
                            initialData={taskTypes}
                            onDataChange={handleTaskDetail}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="serviceFormButton">
            <button className="grayButton" onClick={handleRedirect}>
              닫기
            </button>
            <button className="blackButton" onClick={(e) => handleSubmit(e)}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvaluationItemForm;
