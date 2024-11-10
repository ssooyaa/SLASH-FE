import React, { useState } from "react";
import "./AddEvaluationItemForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceDetailInputTable from "../../../../../feature/table/ServiceDetailInputTable";
import InputTable from "../../../../../feature/table/InputTable";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";
import NoScoreGradeInputTable from "../../../../../feature/table/NoScoreGradeInputTable";
import TaskDetailInputTable from "../../../../../feature/table/TaskDetailInputTable";
import { CreateServiceDetail } from "../../../../../../api/ContractManagerService";

const AddEvaluationItemForm = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const contractId = location.state?.contractId;

  const contractName = location.state?.contractName;

  const [formData, setFormData] = useState({
    contractId: 0,
    category: "",
    weight: 0,
    period: "월별",
    formula: "",
    unit: "율(%)",
    serviceTargets: [],
    taskTypes: [],
  });

  const [serviceTargets, setServiceTargets] = useState([]);

  const [taskTypes, setTaskTypes] = useState([]);

  const [taskTable, setTaskTable] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };
    console.log(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleServiceTargets = (value) => {
    setServiceTargets(value);
    handleChange("serviceTargets", value);
  };

  const handleTaskDetail = (value) => {
    setTaskTypes(value);
    const updatedTaskTypes = taskTypes.map((item) => {
      if (typeof item === "object") {
        return {
          type: formData.category.split(" ")[0] + " 요청",
          taskDetail: item.taskDetail,
          deadline: item.deadline ? item.deadline : 0,
          serviceRelevance:
            item.serviceRelevance !== undefined ? item.serviceRelevance : false,
          inclusionStatus:
            item.inclusionStatus !== undefined ? item.inclusionStatus : false,
        };
      } else if (typeof item === "string") {
        return {
          type: formData.category.split(" ")[0] + " 요청",
          taskDetail: item,
        };
      } else {
        return null;
      }
    });
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
    //계약 리스트페이지 작성 후 추가 예정
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    handleChange("contractId", contractId);

    const filterServiceTargets = formData.serviceTargets.filter(
      (target) => target.grade !== ""
    );

    const updateFormData = {
      ...formData,
      serviceTargets: filterServiceTargets,
    };

    try {
      const response = await CreateServiceDetail(updateFormData);
      if (response) {
        console.log("저장 되었습니다.");
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
            <input
              className="serviceName"
              type="text"
              value={formData.category}
              placeholder="서비스 평가 항목을 입력해 주세요"
              onChange={(e) => handleChange("category", e.target.value)}
            />
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
              {formData.unit === "건" ? (
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
