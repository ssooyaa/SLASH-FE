import React from "react";
import "./TableView.css";
import GradeHorizonTable from "../../../../../feature/table/GradeHorizonTable";

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

  return (
    <div>
      <h2>서비스 평가항목</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th className="evaluationCategory">평가 지표 구분</th>
              <th>측정 주기</th>
              <th className="contentCol">평가지표 내용</th>
              <th>측정 단위</th>
              <th>평가지표 가중치</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{evaluationItem.category}</td>
              <td>{evaluationItem.period}</td>
              <td>{evaluationItem.purpose}</td>
              <td>{evaluationItem.unit}</td>
              <td>{evaluationItem.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>서비스 목표</h2>
      <div className="table">
        <GradeHorizonTable initialData={evaluationItem.serviceTargets} />
      </div>
    </div>
  );
};

export default TableView;
