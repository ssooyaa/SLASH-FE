import React from "react";
import "./ChartTable.css";

const ChartTable = ({ statistics }) => {
  const formatDowntimeToHours = (totalSeconds) => {
    const hours = totalSeconds / 3600; // 초를 시간으로 변환
    return `${hours.toFixed(3)}h`; // 소수점 세 자리까지 표시
  };

  return (
    <div className="chartTableContainer">
      <table className="chartTable">
        <thead>
          <tr>
            <th>날짜</th>
            <th>장비명</th>
            <th>등급</th>
            <th>점수 (%)</th>
            <th>총 중단 시간 (h)</th>
            <th>요청 건수</th>
          </tr>
        </thead>
        <tbody>
          {statistics.length > 0 ? (
            statistics.map((stat, index) => (
              <tr key={index}>
                <td>{stat.date.slice(0, 7)}</td>
                <td>{stat.targetEquipment}</td>
                <td>{stat.grade}</td>
                <td>{stat.score}%</td>
                <td>{formatDowntimeToHours(stat.totalDowntime)}</td>
                <td>{stat.requestCount}건</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
