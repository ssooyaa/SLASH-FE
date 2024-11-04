import React, { useState, useEffect } from "react";
import "./ServiceTemplate.css";
import ServiceDetailInputTable from "../../../../../feature/table/ServiceDetailInputTable";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";
import InputTable from "../../../../../feature/table/InputTable";
import TaskDetailInputTable from "../../../../../feature/table/TaskDetailInputTable";

const ServiceTemplate = ({ index, initialData = {}, dataChangeHandle }) => {
  const [formData, setFormData] = useState(initialData);
  const [serviceTargets, setServiceTargets] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [taskTable, setTaskTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [category, setCategory] = useState(
    initialData.category ? initialData.category : ""
  );

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedFormData);
    dataChangeHandle(index, updatedFormData);
  };

  const handleServiceTargets = (value) => {
    console.log(value);
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
    handleChange(index, "taskTypes", []);
  };

  return (
    <>
      <div className="categoryName">
        <input
          className="serviceName"
          type="text"
          value={formData.category}
          placeholder="서비스 평가 항목을 입력해 주세요"
          onChange={(e) => handleChange("category", e.target.value)}
        />
      </div>
      <div className="table serviceDetailDiv">
        <ServiceDetailInputTable
          initialData={formData}
          handleData={handleChange}
        />
      </div>
      <div className="gradeTableDetail">
        <div className="tableTitle inputTableTitle">
          <p>SLA 평가 등급</p>
          <span>*</span>
        </div>
        <div className="table">
          <GradeInputTable
            initialData={serviceTargets}
            onDataChange={handleServiceTargets}
          />
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
              onClick={() => handleRemoveTask(index)}
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
                        initialData={taskTypes.map((item) => item.taskDetail)}
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
    </>
  );
};

export default ServiceTemplate;
