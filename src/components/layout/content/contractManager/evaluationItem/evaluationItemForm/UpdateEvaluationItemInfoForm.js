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

  const [firstTaskTypesLength, setFirstTaskTypesLength] = useState(0);

  const [isCustomInput, setIsCustomInput] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchServiceInfo(evaluationItemId);
      setFormData(response);
      setServiceTargets(response.serviceTargets);
      setTaskTypes(response.taskTypes || []);

      if (
        response.category !== "서비스 가동률" ||
        response.category !== "서비스요청 적기처리율" ||
        response.category !== "장애 적기처리율"
      ) {
        setIsCustomInput(true);
      }

      if (response.taskTypes && response.taskTypes.length > 0) {
        const hasNonZeroDeadline = response.taskTypes.some(
          (item) => item.deadline > 0
        );
        if (hasNonZeroDeadline) {
          setTaskTable(true);
          setSelectedOption("유형및시간");
          setFirstTaskTypesLength(response.taskTypes.length);
        } else {
          setTaskTable(true);
          setSelectedOption("업무유형");
          setFirstTaskTypesLength(response.taskTypes.length);
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
    setFormData(updatedFormData);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "custom") {
      setIsCustomInput(true);
      handleChange("category", "");
    } else {
      setIsCustomInput(false);
      handleChange("category", selectedValue);
    }
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

    if (firstTaskTypesLength !== 0) {
      alert("업무유형을 모두 삭제 시 반영되지 않습니다. 삭제 후 추가해 주세요");
      setUpdateTaskType([]);
      setTaskTypes([]);
    }
  };

  const handleRedirect = () => {
    alert("수정된 정보는 저장되지 않습니다.");
    navigate(-1);
  };

  const handleUpdateServiceTargets = (value) => {
    setUpdateServiceTargets(value);
    setServiceTargets(value);
  };

  const handleUpdateTaskTypesDetail = (value) => {
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

    setUpdateTaskType(updatedTaskTypes); // 상태 업데이트
    setTaskTypes(updatedTaskTypes);
    return updatedTaskTypes;
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
      alert("등급 설정은 필수 입니다");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateTaskType);

    const updatedServiceTargets = updateServiceTargets.filter(
      (target) => target.grade !== ""
    );
    handleChange("serviceTargets", updatedServiceTargets);

    console.log(updateServiceTargets);

    const updatedTaskTypes = updateTaskType.filter(
      (target) => target.taskDetail !== ""
    );

    handleChange("taskTypes", updatedTaskTypes);
    console.log(updatedTaskTypes);

    if (!isValid()) {
      return; //미입력값 있을 시 제출 불가
    }

    const updatedFormData = {
      ...formData,
      contractId: contractId,
      serviceTargets: updatedServiceTargets,
      taskTypes: updatedTaskTypes, // 반환된 taskTypes 배열을 할당
    };
    console.log(updatedFormData);

    if (firstTaskTypesLength > 0 && taskTypes.length === 0) {
      alert("업무유형을 모두 삭제 시 반영되지 않습니다. 삭제 후 추가해 주세요");
    }

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
            navigate(-1);
          }
        } catch (error) {
          alert("수정 실패");
          console.log("수정 실패: ", error);
        }
      } else {
        try {
          if (updateServiceTargets.length === 0) {
            updatedFormData.serviceTargets = serviceTargets;
          }

          if (updateTaskType.length === 0) {
            updateEvaluationItem.taskTypes = taskTypes;
          }
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
            <select
              className={`evaluationItemTitleInput ${isCustomInput ? "shortSelect" : ""}`}
              name="category"
              value={isCustomInput ? "custom" : formData.category}
              onChange={handleSelectChange}
            >
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
              <p>SLA 평가 등급 </p>
              <span>*</span>
            </div>
            <div className="table">
              {formData.unit === "건수" ? (
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
