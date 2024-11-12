import React, { useEffect, useState } from "react";
import "./MiddleIndex.css";
import "../../../../../styles/Font.css";
import { fetchIndicators } from "../../../../../api/CommonService";

const MiddleIndex = ({ agreementId, date }) => {
  const [indicatorData, setIndicatorData] = useState({
    grade: "",
    requestCount: 0,
    incidentTime: 0,
  });

  const formatDowntimeToHours = (time) => {
    if (time < 60) {
      return `${time}m`;
    } else {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (agreementId && date) {
        try {
          const response = await fetchIndicators(agreementId, date);
          if (response && response.success) {
            const { grade, requestCount, incidentTime } =
              response.data.indicatorEtcInfo;
            setIndicatorData({ grade, requestCount, incidentTime });
          } else {
            setIndicatorData({ grade: "-", requestCount: 0, incidentTime: 0 });
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
          setIndicatorData({ grade: "-", requestCount: 0, incidentTime: 0 });
        }
      }
    };
    fetchData();
  }, [agreementId, date]);

  return (
    <div className="middle">
      <div className="totalIndex">
        <div className="title">종합평가 등급</div>
        <div className="value">{indicatorData.grade}등급</div>
        <div className="subText">{indicatorData.score}점</div>
      </div>
      <div className="totalIndex">
        <div className="title">요청 건수</div>
        <div className="value">{indicatorData.requestCount}건</div>
      </div>
      <div className="totalIndex">
        <div className="title">장애 발생 시간</div>
        <div className="value">
          {formatDowntimeToHours(indicatorData.incidentTime)}
        </div>
      </div>
    </div>
  );
};

export default MiddleIndex;
