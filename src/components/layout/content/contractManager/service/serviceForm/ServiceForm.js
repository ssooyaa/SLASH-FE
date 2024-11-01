import React, { useState, useEffect } from "react";
import "./ServiceForm.css";
import ServiceDetailInputTable from "../../../../../feature/table/ServiceDetailInputTable";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";
import InputTable from "../../../../../feature/table/InputTable";
import TaskDetailTable from "../../../../../feature/table/TaskDetailTable";
import { CreateServiceDetail } from "../../../../../../api/UserService";
import { useNavigate, useLocation } from "react-router-dom";

const ServiceForm = () => {
  const location = useLocation();
  const { categoryId, categoryName } = location.state || {};
  const [data, setData] = useState({});

  // useEffect(() => {
  //   if (categoryId) {
  //     //get api생성시 연결
  //   }
  // }, [categoryId]);

  const [formData, setFormData] = useState({
    categoryId: categoryId,
    weight: data.weight ? data.weight : 0,
    period: data.period ? data.period : "월별",
    formula: data.formula ? data.formula : "",
    unit: data.unit ? data.unit : "율(%)",
    serviceTargets: data.serviceTargets ? data.serviceTargets : [],
    taskTypes: data.taskTypes ? data.taskTypes : [],
  });
  const [serviceTargets, setServiceTargets] = useState(
    formData.serviceTargets || []
  );
  const [taskTypes, setTaskTypes] = useState(formData.taskTypes || []);
  const [taskTable, setTaskTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/contractManager/contract");
  };
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleServiceTargets = (value) => {
    setServiceTargets(value);
    handleChange("serviceTargets", value);
  };

  const handleTaskDetail = (value) => {
    setTaskTypes(value);
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

  const submit = async (e) => {
    e.preventDefault();
    const updatedTaskTypes = taskTypes
      .map((item) => {
        if (typeof item === "object") {
          return {
            type: categoryName.split(" ")[0] + " 요청",

            taskDetail: item.taskDetail,
            deadline: item.deadline ? item.deadline : 0,
            serviceRelevance:
              item.serviceRelevance !== undefined
                ? item.serviceRelevance
                : false,
            inclusionStatus:
              item.inclusionStatus !== undefined ? item.inclusionStatus : false,
          };
        } else if (typeof item === "string") {
          return {
            type: categoryName.split(" ")[0] + " 요청",

            taskDetail: item,
          };
        } else {
          return null; // null이나 다른 기본값을 반환
        }
      })
      .filter((item) => item !== null); // null 값 제거

    handleChange("taskTypes", updatedTaskTypes);

    const updatedFormData = {
      ...formData,
      ...(updatedTaskTypes.length > 0 && { taskTypes: updatedTaskTypes }),
    };

    try {
      console.log(updatedFormData);
      const response = await CreateServiceDetail(updatedFormData);
      if (response) {
        alert("저장완료");
        handleRedirect();

      }
    } catch (error) {
      alert("저장실패");
    }
  };

  return (
    <div className="form">
      <div className="serviceForm">
        <div className="categoryTitle">
          <p>{categoryName}</p>
        </div>
        <div className="serviceDetail">
          <div className="tableTitle">
            <p>서비스 평가 항목상세</p>
            <span>*</span>
          </div>
          <div className="table slaTable detailTable">
            <ServiceDetailInputTable
              initialData={formData}

              handleData={handleChange}
            />
          </div>
        </div>
        <div className="gradeTasksDetail">
          <div className="gradeTableDetail">
            <div className="tableTitle inputTableTitle">
              <p>SLA 평가 등급 설정</p>
              <span>*</span>
            </div>
            <div className="table slaTable">
              <GradeInputTable
                initialData={serviceTargets}
                onDataChange={handleServiceTargets}
              />
            </div>
          </div>
          {((categoryName.includes("서비스") &&
            categoryName.includes("적기")) ||
            (categoryName.includes("장애") &&
              categoryName.includes("적기"))) && (

            <div className="taskTableDetail">
              <div className="tableTitle inputTableTitle taskTitle">
                <p>업무 유형</p>
                <span>*</span>
                {!taskTable ? (
                  <div onClick={handleAddTask} className="addTaskButton">
                    <button className="tableControlBtn">추가하기</button>
                  </div>
                ) : (
                  <div onClick={handleRemoveTask} className="removeTaskButton">
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
                        <button
                          onClick={() => handleOptionSelect("유형및시간")}
                        >
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
                            <TaskDetailTable
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
          )}
        </div>
        <div className="serviceFormButton">
          <button className="grayButton" onClick={() => handleRedirect()}>
            닫기
          </button>

          <button className="blackButton" onClick={(e) => submit(e)}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
