import React from "react";
import "./ChartTable.css";

const ChartTable = ({ statistics }) => {
  const formatDowntimeToHours = (totalMinutes) => {
    if (totalMinutes < 60) {
      // 1시간 미만이면 분으로 표시
      return `${totalMinutes}m`;
    } else {
      // 1시간 이상이면 시간과 분으로 표시
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
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
            <th>총 중단 시간</th>
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
