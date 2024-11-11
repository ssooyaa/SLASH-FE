import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchEvaluationDetail,
  fetchEvaluationEquipment,
} from "../../../../../api/CommonService";
import "../../../../../styles/CommonTable.css";
const EvaluationDetailTable = () => {
  const { evaluationItemId, year, month, day } = useParams();
  const [id, setId] = useState(null);
  const [date, setDate] = useState("");
  const [evaluationItems, setEvaluationItems] = useState(null);
  const [taskTypes, setTaskTypes] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);

  useEffect(() => {
    const loadEvaluationDetail = async () => {
      try {
        const data = await fetchEvaluationDetail(evaluationItemId);
        if (data && data.success) {
          setEvaluationItems(data.data.evaluationItems);
          setTaskTypes(data.data.taskTypes);
        }
      } catch (error) {
        console.error("Error fetching evaluation detail:", error);
      }
    };

    loadEvaluationDetail();
  }, [evaluationItemId]);

  useEffect(() => {
    //URL 파라미터를 상태로 저장
    if (evaluationItemId && year && month && day) {
      setId(evaluationItemId);
      setDate(`${year}-${month}-${day}`);
    }
  }, [evaluationItemId, year, month, day]);

  useEffect(() => {
    const loadEvaluationData = async () => {
      if (id && date) {
        try {
          const response = await fetchEvaluationEquipment(id, date);
          if (response && response.success) {
            setEvaluationData(response.data);
          }
        } catch (error) {
          console.log("Error fetching evaluation equipment data:", error);
        }
      }
    };
    loadEvaluationData();
  }, [id, date]);

  return (
    <div className="etableContainer">
      <h3>평가 항목 세부 정보</h3>
      {/* <h4>{evaluationItems.category}</h4> */}
      {evaluationItems && (
        <table className="ecustomTable">
          <thead>
            <tr>
              <th>카테고리</th>
              <th>가중치</th>
              <th>주기</th>
              <th>목적</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{evaluationItems.category}</td>
              <td>{evaluationItems.weight}</td>
              <td>{evaluationItems.period}</td>
              <td>{evaluationItems.purpose}</td>
            </tr>
            <tr>
              <th>단위</th>
              <th colSpan={3}>산출식</th>
            </tr>
            <tr>
              <td>{evaluationItems.unit}</td>
              <td colSpan={3}>{evaluationItems.formula}</td>
            </tr>
          </tbody>
        </table>
      )}

      <h3>서비스 대상 등급</h3>
      {evaluationItems && evaluationItems.serviceTargets.length > 0 && (
        <table className="ecustomTable">
          <thead>
            <tr>
              <th>등급</th>
              <th>최소값</th>
              <th>최대값</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {evaluationItems.serviceTargets.map((target, index) => (
              <tr key={index}>
                <td>{target.grade}</td>
                <td>
                  {target.min}
                  {target.minInclusive ? " 이상" : " 초과"}
                </td>
                <td>
                  {target.max}
                  {target.maxInclusive ? " 이하" : " 미만"}
                </td>
                <td>{target.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>작업 유형</h3>
      {taskTypes.length > 0 && (
        <table className="ecustomTable">
          <thead>
            <tr>
              <th>유형</th>
              <th>세부 작업</th>
              <th>마감 시간(시간)</th>
              <th>서비스 관련성</th>
              <th>포함 상태</th>
            </tr>
          </thead>
          <tbody>
            {taskTypes.map((task, index) => (
              <tr key={index}>
                <td>{task.type}</td>
                <td>{task.taskDetail}</td>
                <td>{task.deadline}h</td>
                <td>{task.serviceRelevance ? "예" : "아니오"}</td>
                <td>{task.inclusionStatus ? "포함" : "미포함"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>측정 결과</h3>
      {evaluationData.length > 0 ? (
        <table className="ecustomTable">
          <thead>
            <tr>
              <th>측정 장비</th>
              <th>측정 날짜</th>
              <th>장애 건수</th>
              <th>총 장애 시간</th>
              <th>측정 치</th>
              <th>평가 점수</th>
              <th>평가 점수(가중치 적용)</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            {evaluationData.map((item, index) => (
              <tr key={index}>
                <td>{item.targetEquipment}</td>
                <td>{item.date}</td>
                <td>{item.systemIncidentCount}</td>
                <td>{item.totalDowntime}</td>
                <td>{item.estimate}</td>
                <td>{item.score}</td>
                <td>{item.weightedScore}</td>
                <td>{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default EvaluationDetailTable;
