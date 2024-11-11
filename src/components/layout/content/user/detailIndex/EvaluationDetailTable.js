import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchEvaluationDetail,
  fetchEvaluationEquipment,
} from "../../../../../api/CommonService";
import "../../../../../styles/CommonTable.css";
const EvaluationDetailTable = () => {
  const { evaluationItemId, date } = useParams();
  const [evaluationItem, setEvaluationItem] = useState(null);
  const [taskTypes, setTaskTypes] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);

  useEffect(() => {
    const loadEvaluationDetail = async () => {
      try {
        const data = await fetchEvaluationDetail(evaluationItemId);
        if (data && data.success) {
          setEvaluationItem(data.data);
        }
      } catch (error) {
        console.error("Error fetching evaluation detail:", error);
      }
    };

    if (evaluationItemId) {
      loadEvaluationDetail();
    }
  }, [evaluationItemId]);

  useEffect(() => {
    const loadEvaluationData = async () => {
      try {
        // Fetch data using the API
        const response = await fetchEvaluationEquipment(evaluationItemId, date);
        if (response && response.success) {
          setEvaluationData(response.data);
        } else {
          setEvaluationData([]);
        }
      } catch (error) {
        console.error("Error fetching evaluation equipment data:", error);
        setEvaluationData([]);
      }
    };

    if (evaluationItemId && date) {
      loadEvaluationData();
    }
  }, [evaluationItemId, date]);

  return (
    <div className="etableContainer">
      <h3>평가 항목 세부 정보</h3>
      {evaluationItem && (
        <>
          <table className="ecustomTable">
            <thead>
              <tr>
                <th>카테고리</th>
                <th>가중치</th>
                <th>주기</th>
                <th>목적</th>
                <th>자동 계산 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{evaluationItem.category}</td>
                <td>{evaluationItem.weight}</td>
                <td>{evaluationItem.period}</td>
                <td>{evaluationItem.purpose}</td>
                <td>{evaluationItem.isAuto ? "자동" : "수동"}</td>
              </tr>
              <tr>
                <th>단위</th>
                <th colSpan={4}>산출식</th>
              </tr>
              <tr>
                <td>{evaluationItem.unit}</td>
                <td colSpan={4}>{evaluationItem.formula}</td>
              </tr>
            </tbody>
          </table>

          <h3>서비스 대상 등급</h3>
          {evaluationItem.serviceTargets &&
          evaluationItem.serviceTargets.length > 0 ? (
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
                {evaluationItem.serviceTargets.map((target, index) => (
                  <tr key={index}>
                    <td>{target.grade}</td>
                    <td>
                      {target.min} {target.minInclusive ? "이상" : "초과"}
                    </td>
                    <td>
                      {target.max} {target.maxInclusive ? "이하" : "미만"}
                    </td>
                    <td>{target.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>서비스 대상 등급 데이터가 없습니다.</p>
          )}
        </>
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
        <p>해당 날짜에 대한 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default EvaluationDetailTable;
