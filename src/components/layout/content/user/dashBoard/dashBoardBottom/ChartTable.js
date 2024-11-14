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

  // statistics가 배열인지 확인하고 기본값 설정
  const safeStatistics = Array.isArray(statistics) ? statistics : [];

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
        {safeStatistics.length > 0 ? (
          safeStatistics.map((stat, index) => (
            <tr key={index}>
              {/* stat.date가 undefined일 경우 안전하게 처리 */}
              <td>{stat.date ? stat.date.slice(0, 10) : "정보 없음"}</td>
              <td>{stat.targetEquipment}</td>
              <td>{stat.grade}</td>
              <td>{stat.score}%</td>
              <td>{formatDowntimeToHours(stat.totalDowntime)}</td>
              <td>{stat.requestCount}건</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">데이터가 없습니다.</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
