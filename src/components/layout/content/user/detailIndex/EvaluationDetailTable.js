import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEvaluationDetail,
  fetchEvaluationEquipment,
  downloadPdf,
} from "../../../../../api/CommonService";
import "../../../../../styles/CommonTable.css";

const EvaluationDetailTable = () => {
  const { evaluationItemId, date } = useParams();
  const [evaluationItem, setEvaluationItem] = useState(null);
  const [evaluationData, setEvaluationData] = useState([]);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleDownloadPdf = async () => {
    try {
      const data = await downloadPdf(evaluationItemId, date);

      // Blob 데이터를 사용하여 PDF 파일 다운로드
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "statistics.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("PDF 다운로드 오류:", error);
    }
  };

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
      <div className="etableHeader">
        <h3>평가 항목 세부 정보</h3>
        <button
          onClick={handleDownloadPdf}
          className="pdfDownloadButton"
        ></button>
      </div>
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
              {evaluationData.some((item) => item.targetEquipment !== -1) && (
                <th>측정 장비</th>
              )}
              {evaluationData.some((item) => item.date !== -1) && (
                <th>측정 날짜</th>
              )}
              {evaluationData.some(
                (item) => item.systemIncidentCount !== -1
              ) && <th>장애 건수</th>}
              {evaluationData.some((item) => item.totalDowntime !== -1) && (
                <th>총 장애 시간</th>
              )}
              {evaluationData.some((item) => item.estimate !== -1) && (
                <th>측정 치</th>
              )}
              {evaluationData.some((item) => item.score !== -1) && (
                <th>평가 점수</th>
              )}
              {evaluationData.some((item) => item.weightedScore !== -1) && (
                <th>평가 점수(가중치 적용)</th>
              )}
              {evaluationData.some((item) => item.grade !== -1) && (
                <th>등급</th>
              )}
            </tr>
          </thead>
          <tbody>
            {evaluationData.map((item, index) => (
              <tr key={index}>
                {item.targetEquipment !== -1 && <td>{item.targetEquipment}</td>}
                {item.date !== -1 && <td>{item.date}</td>}
                {item.systemIncidentCount !== -1 && (
                  <td>{item.systemIncidentCount}</td>
                )}
                {item.totalDowntime !== -1 && <td>{item.totalDowntime}</td>}
                {item.estimate !== -1 && <td>{item.estimate}</td>}
                {item.score !== -1 && <td>{item.score}</td>}
                {item.weightedScore !== -1 && <td>{item.weightedScore}</td>}
                {item.grade !== -1 && <td>{item.grade}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>해당 날짜에 대한 데이터가 없습니다.</p>
      )}

      <button className="egrayButton" onClick={handleRedirect}>
        닫기
      </button>
    </div>
  );
};

export default EvaluationDetailTable;
