import React from "react";
import "./BottomTable.css";

const BottomTable = () => {
  return (
    <table className="customTable">
      <thead>
        <tr>
          <th>지표 구분</th>
          <th>담당자</th>
          <th>지표 측정일</th>
          <th>평가 점수</th>
          <th>평가 등급</th>
        </tr>
      </thead>
      <tbody>
        <tr className="highlightedRow">
          <td>장비운영 - 서비스 가동률</td>
          <td>자동계산</td>
          <td>2024.10.31</td>
          <td>99.8%</td>
          <td>
            A <a href="#">자세히 보기 &gt;</a>
          </td>
        </tr>
        <tr>
          <td>서비스 요청 적기 처리율</td>
          <td>김수지</td>
          <td>2024.10.31</td>
          <td>95.5%</td>
          <td>
            A <a href="#">자세히 보기 &gt;</a>
          </td>
        </tr>
        <tr className="highlightedRow">
          <td>장애 요청 적기 처리율</td>
          <td>자동계산</td>
          <td>2024.10.31</td>
          <td>90</td>
          <td>
            A <a href="#">자세히 보기 &gt;</a>
          </td>
        </tr>
        <tr>
          <td colSpan="4">전체</td>
          <td>S</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BottomTable;
