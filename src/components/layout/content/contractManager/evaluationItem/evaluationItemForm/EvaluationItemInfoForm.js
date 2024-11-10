import React, { useEffect, useState } from "react";
import "./EvaluationItemInfoForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchServiceInfo } from "../../../../../../api/CommonService";
import ServiceDetailTable from "../../../../../feature/table/ServiceDetailTable";
import GradeVerticalTable from "../../../../../feature/table/GradeVerticalTable";
import NoScoreGradeTable from "../../../../../feature/table/NoScoreGradeTable";
import TaskDetailTable from "../../../../../feature/table/TaskDetailTable";
import OneColTable from "../../../../../feature/table/OneColTable";

const EvaluationItemInfoForm = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const evaluationItemId = location.state?.evaluationItemId;

  const contractName = location.state?.contractName;

  const contractId = location.state?.contractId;

  const [evaluationItemInfo, setEvaluationItemInfo] = useState({});

  const [serviceTargets, setServiceTargets] = useState([]);

  useEffect(() => {
    if (evaluationItemId) {
      const loadData = async () => {
        try {
          const response = await fetchServiceInfo(evaluationItemId);
          setEvaluationItemInfo(response);
          setServiceTargets(response.serviceTargets);
          console.log(response);
        } catch (error) {
          console.error("Error fetching evaluation item info:", error);
        }
      };
      loadData(); // 함수를 호출하여 데이터 로드
    } else {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
  }, [evaluationItemId, navigate]); // 의존성 배열 추가

  const handleRedirect = () => {
    navigate(-1);
  };

  const handleEditEvaluationItem = (evaluationId) => {
    //수정페이지 작성 후 연결

    navigate(`/contractManager/updateEvaluationItem/${evaluationId}`, {
      state: { contractId, contractName },
    });
  };

  return (
    <div className="evaluationItemDiv">
      <div className="evaluationContractTitle">
        <span className="contractTitleSpan">*</span>
        <p>협약서: {contractName}</p>
      </div>

      <div className="evaluationItemInfoForm">
        <div className="evaluationItemInfoDetail">
          <div className="evaluationItemTitle">
            <p>{evaluationItemInfo.category}</p>
          </div>
          <div className="serviceDetailDiv">
            <div className="tableTitle">
              <p>서비스 평가 항목 상세</p>
              <span>*</span>
            </div>
            <div className="table">
              <ServiceDetailTable initialData={evaluationItemInfo} />
            </div>
          </div>
          <div className="gradeTableDetail">
            <div className="tableTitle inputTableTitle">
              <p>SLA 평가 등급</p>
              <span>*</span>
            </div>
            <div className="table">
              {evaluationItemInfo.unit === "건" ? (
                <GradeVerticalTable data={serviceTargets} />
              ) : (
                <NoScoreGradeTable data={serviceTargets} />
              )}
            </div>
          </div>
          <div className="taskTableDetail">
            {evaluationItemInfo.taskTypes &&
              evaluationItemInfo.taskTypes.length > 0 && (
                <div className="taskTableDetail">
                  <div className="tableTitle">
                    <p>업무 유형</p>
                    <span>*</span>
                  </div>
                  <div className="table taskReadTable">
                    {evaluationItemInfo.taskTypes.some(
                      (item) => item.deadline > 0
                    ) ? (
                      <TaskDetailTable
                        initialData={evaluationItemInfo.taskTypes}
                      />
                    ) : (
                      <OneColTable
                        label="업무 유형"
                        data={evaluationItemInfo.taskTypes.map(
                          (item) => item.taskDetail
                        )}
                      />
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="serviceFormButton">
          <button className="grayButton" onClick={() => handleRedirect()}>
            닫기
          </button>
          <button
            className="blackButton"
            onClick={() => handleEditEvaluationItem(evaluationItemId)}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationItemInfoForm;
