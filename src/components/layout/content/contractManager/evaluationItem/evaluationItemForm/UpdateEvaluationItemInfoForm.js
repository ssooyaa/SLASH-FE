import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchServiceInfo } from "../../../../../../api/CommonService";
import {
  fetchModifyIsPossible,
  updateEvaluationItem,
  createEvaluationItem,
} from "../../../../../../api/ContractManagerService";
import ServiceDetailInputTable from "../../../../../feature/table/ServiceDetailInputTable";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";
import NoScoreGradeInputTable from "../../../../../feature/table/NoScoreGradeInputTable";
import InputTable from "../../../../../feature/table/InputTable";
import TaskDetailInputTable from "../../../../../feature/table/TaskDetailInputTable";

const UpdateEvaluationItemInfoForm = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const contractId = location.state?.contractId;

  const contractName = location.state?.contractName;

  const { evaluationItemId } = useParams();

  const [formData, setFormData] = useState({
    contractId: contractId,
    evaluationItemId: evaluationItemId,
    category: "",
    weight: 0,
    period: "월별",
    formula: "",
    unit: "율(%)",
    serviceTargets: [],
    taskTypes: [],
  });

  const [taskTable, setTaskTable] = useState(false);

  const [updateServiceTargets, setUpdateServiceTargets] = useState([]);

  const [updateTaskType, setUpdateTaskType] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const [serviceTargets, setServiceTargets] = useState([]);

  const [taskTypes, setTaskTypes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchServiceInfo(evaluationItemId);
      console.log(response);
      setFormData(response);
      setServiceTargets(response.serviceTargets);
      setTaskTypes(response.taskTypes || []);

      if (response.taskTypes && response.taskTypes.length > 0) {
        const hasNonZeroDeadline = response.taskTypes.some(
          (item) => item.deadline > 0
        );
        if (hasNonZeroDeadline) {
          setTaskTable(true);
          setSelectedOption("유형및시간");
        } else {
          setTaskTable(true);
          setSelectedOption("업무유형");
        }
      }
    };
    loadData();
  }, [evaluationItemId]);

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };
    console.log(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleAddTask = () => {
    setTaskTable(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleRemoveTask = () => {
    console.log("삭제");
    setTaskTable(false);
    setSelectedOption(null);
    setUpdateTaskType([]);
    setTaskTypes([]);
    console.log("taskTable: ", taskTable);
    console.log("selectedOption: ", selectedOption);
    console.log("taskTypes: ", taskTypes);
    console.log("update", updateTaskType);
  };

  const handleRedirect = () => {
    alert("수정된 정보는 저장되지 않습니다.");
    navigate(-1);
  };

  const handleUpdateServiceTargets = (value) => {
    setUpdateServiceTargets(value);
  };

  const handleUpdateTaskTypesDetail = (value) => {
    const updatedTaskTypes = value.map((item) => {
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

    setUpdateTaskType(updatedTaskTypes); // 상태 업데이트

    return updatedTaskTypes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateTaskType);

    const updatedServiceTargets = updateServiceTargets.filter(
      (target) => target.grade !== ""
    );
    handleChange("serviceTargets", updatedServiceTargets);

    const updatedTaskTypes = updateTaskType.filter(
      (target) => target.taskDetail !== ""
    );

    handleChange("taskTypes", updatedTaskTypes);

    const updatedFormData = {
      ...formData,
      serviceTargets: updatedServiceTargets,
      taskTypes: updatedTaskTypes, // 반환된 taskTypes 배열을 할당
    };

    console.log(updatedFormData);

    if (evaluationItemId) {
      const isModify = await fetchModifyIsPossible(contractId);
      if (isModify) {
        try {
          const updatedEvaluationItem = await updateEvaluationItem(
            evaluationItemId,
            updatedFormData
          );
          console.log(updatedFormData);
          if (updatedEvaluationItem) {
            alert("수정 완료");
            navigate("/contractManager/contractDetail", {
              state: { contractId },
            });
          }
        } catch (error) {
          alert("수정 실패");
          console.log("수정 실패: ", error);
        }
      } else {
        try {
          const postEvaluationItem = await createEvaluationItem(
            evaluationItemId,
            updatedFormData
          );
          if (postEvaluationItem) {
            alert("수정 완료");
            navigate("/contractManager/contractDetail", {
              state: { contractId },
            });
          }
        } catch (error) {
          alert("수정 실패");
          console.log("수정 실패: ", error);
        }
      }
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
              <p>SLA 평가 등급 </p>
              <span>*</span>
            </div>
            <div className="table">
              {formData.unit === "건" ? (
                <GradeInputTable
                  initialData={serviceTargets}
                  onDataChange={handleUpdateServiceTargets}
                />
              ) : (
                <NoScoreGradeInputTable
                  initialData={serviceTargets}
                  onDataChange={handleUpdateServiceTargets}
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
                            initialData={
                              taskTypes.map((item) => item.taskDetail) || []
                            }
                            onDataChange={handleUpdateTaskTypesDetail}
                          />
                        </div>
                      )}
                      {selectedOption === "유형및시간" && (
                        <div className="table yourTableClass">
                          <TaskDetailInputTable
                            initialData={taskTypes}
                            onDataChange={handleUpdateTaskTypesDetail}
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
export default UpdateEvaluationItemInfoForm;
