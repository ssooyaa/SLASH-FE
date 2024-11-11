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

  useEffect(() => {
    const fetchData = async () => {
      if (agreementId && date) {
        // agreementId와 date가 유효한 경우에만 요청
        try {
          const response = await fetchIndicators(agreementId, date);

          if (response && response.success) {
            const { grade, requestCount, incidentTime } =
              response.data.indicatorEtcInfo;
            setIndicatorData({ grade, requestCount, incidentTime });
          } else {
            // 실패 시 기본값 설정
            setIndicatorData({ grade: "-", requestCount: 0, incidentTime: 0 });
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
          // 오류 발생 시 기본값 설정
          setIndicatorData({ grade: "-", requestCount: 0, incidentTime: 0 });
        }
      }
    };
    fetchData();
  }, [agreementId, date]); // 의존성 배열에 agreementId와 date 추가
  return (
    <div className="middle">
      <div className="totalIndex">
        <div className="title">종합평가 등급</div>
        <div className="value">{indicatorData.grade}</div>
        <div className="subText">{indicatorData.score}점</div>
      </div>
      <div className="totalIndex">
        <div className="title">요청 건수</div>
        <div className="value">{indicatorData.requestCount}건</div>
      </div>
      <div className="totalIndex">
        <div className="title">장애 발생 시간</div>
        <div className="value">{indicatorData.incidentTime}h</div>
      </div>
    </div>
  );
};

export default MiddleIndex;
