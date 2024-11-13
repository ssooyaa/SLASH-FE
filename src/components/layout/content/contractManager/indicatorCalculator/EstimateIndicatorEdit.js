import React, { useEffect, useState } from "react";
import { fetchEditStatistics } from "../../../../../api/ContractManagerService";
import "../../../../../styles/CommonTable.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../../../../styles/Common.css";
import "./EstimateIndicator.css";
import {
  fetchEvaluationDetail,
  fetchEvaluationEquipment,
} from "../../../../../api/CommonService";

const EstimateIndicatorEdit = () => {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("contractId");
  const evaluationItemId = searchParams.get("evaluationItemId");
  const date = searchParams.get("date");

  const [evaluationItem, setEvaluationItem] = useState(null);
  const [evaluationData, setEvaluationData] = useState([]);
  const [editData, setEditData] = useState({
    grade: "",
    score: "",
    weightedScore: "",
  });
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 관리

  const navigate = useNavigate();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // `수정하기` 버튼을 누르면 현재 데이터로 초기화
      const lastItem = evaluationData[evaluationData.length - 1];
      setEditData({
        grade: lastItem.grade || "",
        score: lastItem.score || "",
        weightedScore: lastItem.weightedScore || "",
      });
    } else {
      // `지표 확정`을 누르면 수정한 값 반영
      handleSaveEdit();
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetchEditStatistics(evaluationItemId, editData);
      if (response && response.success) {
        alert("지표가 확정되었습니다.");
        await loadEvaluationData(); // 데이터 새로고침
        setIsEditing(false); // 수정 모드 종료
      } else {
        alert("지표 확정 실패");
      }
    } catch (error) {
      console.error("Error editing statistics:", error);
      alert("수정 중 오류 발생");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRedirect = () => {
    navigate(-1); // 이전 페이지로 이동
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

  useEffect(() => {
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        <h3 style={{ margin: 0 }}>측정 결과</h3>
        <button
          style={{
            backgroundColor: "#121824",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleEditToggle}
        >
          {isEditing ? "지표 확정" : "수정하기"}
        </button>
      </div>

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
              <th>평가 점수</th>
              <th>평가 점수(가중치 적용)</th>
              <th>등급</th>
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
                {index === evaluationData.length - 1 ? (
                  <>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          name="score"
                          value={editData.score}
                          onChange={handleChange}
                          style={{ width: "80px" }}
                        />
                      ) : (
                        item.score
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          name="weightedScore"
                          value={editData.weightedScore}
                          onChange={handleChange}
                          style={{ width: "80px" }}
                        />
                      ) : (
                        item.weightedScore
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="grade"
                          value={editData.grade}
                          onChange={handleChange}
                          style={{ width: "80px" }}
                        />
                      ) : (
                        item.grade
                      )}
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.score}</td>
                    <td>{item.weightedScore}</td>
                    <td>{item.grade}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>해당 날짜에 대한 데이터가 없습니다.</p>
      )}

      <button
        className="ecloseBtn"
        style={{
          backgroundColor: "#121824",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={handleRedirect}
      >
        닫기
      </button>
    </div>
  );
};

export default EstimateIndicatorEdit;
