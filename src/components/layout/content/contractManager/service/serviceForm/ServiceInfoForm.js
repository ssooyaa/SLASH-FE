import React from "react";
import ServiceDetailTable from "../../../../../feature/table/ServiceDetailTable";
import GradeVerticalTable from "../../../../../feature/table/GradeVerticalTable";
import TaskDetailTable from "../../../../../feature/table/TaskDetailTable";
import OneColTable from "../../../../../feature/table/OneColTable";
import NoScoreGradeTable from "../../../../../feature/table/NoScoreGradeTable";
import "./ServiceInfoForm.css";

const ServiceInfoForm = ({ initialData }) => {
  const data = initialData;

  return (
    <div className="form">
      <div className="serviceForm">
        <div className="evaluationItemTitle">
          <p>{data.category}</p>
        </div>
        <div className="serviceInfoDetail">
          <div className="tableTitle">
            <p>서비스 평가 항목상세</p>
            <span>*</span>
          </div>
          <div className="table detailTable">
            <ServiceDetailTable initialData={data} />
          </div>
        </div>
        <div className="gradeTasksDetail">
          <div className="gradeTableDetail">
            <div className="tableTitle">
              <p>SLA 평가 등급 설정</p>
              <span>*</span>
            </div>
            <div className="table infoTable">
              {data.unit === "건" ? (
                <GradeVerticalTable data={data.serviceTargets || []} />
              ) : (
                <NoScoreGradeTable data={data.serviceTargets} />
              )}
            </div>
          </div>
          {data.taskTypes && data.taskTypes.length > 0 && (
            <div className="taskTableDetail">
              <div className="tableTitle">
                <p>업무 유형</p>
                <span>*</span>
              </div>
              <div className="table taskReadTable">
                {data.taskTypes[0].deadline !== 0 ? (
                  <TaskDetailTable initialData={data.taskTypes} />
                ) : (
                  <OneColTable
                    label="업무 유형"
                    data={data.taskTypes.map((item) => item.taskDetail)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoForm;
