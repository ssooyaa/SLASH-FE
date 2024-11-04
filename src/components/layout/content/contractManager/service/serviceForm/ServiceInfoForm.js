import React, { useState, useEffect } from "react";
import { fetchServiceInfo } from "../../../../../../api/UserService";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceDetailTable from "../../../../../feature/table/ServiceDetailTable";
import GradeVerticalTable from "../../../../../feature/table/GradeVerticalTable";
import TaskDetailTable from "../../../../../feature/table/TaskDetailTable";
import OneColTable from "../../../../../feature/table/OneColTable";
import "./ServiceInfoForm.css";

const ServiceInfoForm = () => {
  const location = useLocation();
  const { categoryId, categoryName } = location.state || {};

  const [data, setData] = useState(null);
  const navigate = useNavigate(); // 오타 수정

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchServiceInfo(categoryId);
      setData(response || {});
    };
    loadData();
  }, [categoryId]);

  if (!data || Object.keys(data).length === 0) {
    return <p>Loading...</p>;
  }

  const handleRedirect = () => {
    navigate("/contractManager/contract");
  };

  const handleModify = () => {
    navigate("/contractManager/createService", {
      state: { categoryId, categoryName },
    });
  };

  return (
    <div className="form">
      <div className="serviceForm">
        <div className="categoryTitle">
          <p>{data.categoryName}</p>
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
              <GradeVerticalTable data={data.serviceTargets || []} />
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
        <div className="serviceFormButton">
          <button className="grayButton" onClick={() => handleRedirect()}>
            닫기
          </button>
          <button className="blackButton" onClick={() => handleModify()}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoForm;
