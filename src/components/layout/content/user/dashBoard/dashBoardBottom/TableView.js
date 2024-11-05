import React from "react";
import "./TableView.css";

const TableView = ({ selectedCriteria, contractData }) => {
  if (!contractData || contractData.isTerminate) {
    return <p>계약이 종료되었거나 데이터를 불러올 수 없습니다.</p>;
  }

  // 선택된 평가 항목에 맞는 데이터를 찾음
  const evaluationItem = contractData.evaluationItems.find(
    (item) => item.category === selectedCriteria
  );

  if (!evaluationItem) {
    return <p>해당 평가 항목에 대한 데이터가 없습니다.</p>;
  }

  // 조건에 따른 표시 형식 설정 함수
  const formatRange = (target) => {
    const minText = target.minInclusive
      ? `${target.min} 이상`
      : `${target.min} 초과`;
    const maxText = target.maxInclusive
      ? `${target.max} 이하`
      : `${target.max} 미만`;
    return `${minText} ~ ${maxText}`;
  };

  return (
    <div>
      <h2>서비스 평가항목</h2>
      <table className="goalTable">
        <thead>
          <tr>
            <th>평가 지표 구분</th>
            <th>측정 주기</th>
            <th>평가지표 내용</th>
            <th>측정 단위</th>
            <th>평가지표 가중치</th>
            <th>평가 점수</th>
            <th>평가점수(가중치반영)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{evaluationItem.category}</td>
            <td>{evaluationItem.period}</td>
            <td>{evaluationItem.purpose}</td>
            <td>{evaluationItem.unit}</td>
            <td>{evaluationItem.weight}</td>
            <td>{evaluationItem.serviceTargets[0].score}</td>
            <td>
              {evaluationItem.serviceTargets[0].score *
                (evaluationItem.weight / 100)}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>서비스 목표</h2>
      <table className="goalTable">
        <thead>
          <tr>
            <th>처리율</th>
            {evaluationItem.serviceTargets.map((target, index) => (
              <th key={index}>{formatRange(target)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>서비스 목표</td>
            {evaluationItem.serviceTargets.map((target, index) => (
              <td key={index}>
                {target.grade === "A"
                  ? "목표수준(A)"
                  : `기본범위(${target.grade})`}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
