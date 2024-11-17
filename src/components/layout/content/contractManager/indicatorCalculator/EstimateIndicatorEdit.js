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
  const evaluationItemId = searchParams.get("evaluationItemId");
  const date = searchParams.get("date");

  const [evaluationItem, setEvaluationItem] = useState(null);
  const [evaluationData, setEvaluationData] = useState([]);
  const [statisticsId, setStatisticsId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editData, setEditData] = useState({
    grade: "",
    score: "",
    weightedScore: "",
  });

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 수정 핸들러: 입력 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // 수정/지표 확정 토글
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // 수정 모드 진입 시 마지막 데이터 값으로 초기화
      const lastItem = evaluationData[evaluationData.length - 1];
      setEditData({
        grade: lastItem.grade || "",
        score: lastItem.score || "",
        weightedScore: lastItem.weightedScore || "",
      });
    } else {
      handleSaveEdit(); // 지표 확정 시 저장
    }
  };

  // 수정 데이터 저장
  const handleSaveEdit = async () => {
    try {
      await fetchEditStatistics(statisticsId, editData);
      alert("지표가 확정되었습니다.");
      await loadEvaluationData(); // 수정 후 데이터 재조회
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("Error saving edited statistics:", error);
      alert("수정 중 오류 발생");
    }
  };

  // 평가 항목 세부 데이터 로드
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

  // 측정 결과 데이터 로드
  const loadEvaluationData = async () => {
    try {
      const response = await fetchEvaluationEquipment(evaluationItemId, date);
      if (response && response.success) {
        setEvaluationData(response.data);
        if (response.data.length > 0) {
          const lastItem = response.data[response.data.length - 1];
          setStatisticsId(lastItem.statisticsId); // 마지막 statisticsId 저장
        }
      } else {
        setEvaluationData([]);
        setStatisticsId(null); // 데이터 없음 처리
      }
    } catch (error) {
      console.error("Error fetching evaluation equipment data:", error);
      setEvaluationData([]);
      setStatisticsId(null); // 에러 발생 시 초기화
    }
  };

  useEffect(() => {
    if (evaluationItemId) {
      loadEvaluationDetail();
    }
  }, [evaluationItemId]);

  useEffect(() => {
    if (evaluationItemId && date) {
      loadEvaluationData();
    }
  }, [evaluationItemId, date]);

  return (
    <div className="etableContainer">
      <h3>평가 항목 세부 정보</h3>
      {evaluationItem ? (
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
          </tbody>
        </table>
      ) : (
        <p>평가 항목 데이터를 불러오는 중입니다.</p>
      )}

      <h3>서비스 대상 등급</h3>
      {evaluationItem?.serviceTargets?.length > 0 ? (
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

      <h3>측정 결과</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <button
          style={{
            backgroundColor: "#121824",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "auto", // 오른쪽으로 밀기 위한 스타일
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
                <td>{item.estimate}</td>
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
                    {item.score !== -1 && <td>{item.score}</td>}
                    {item.weightedScore !== -1 && <td>{item.weightedScore}</td>}
                    {item.grade !== -1 && <td>{item.grade}</td>}
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
