import React, { useEffect, useState } from "react";
import "./MiddleIndex.css";
import "../../../../../styles/Font.css";

const MiddleIndex = () => {
  const [indicatorData, setIndicatorData] = useState({
    grade: "",
    requestCount: 0,
    incidentTime: 0,
  });

  useEffect(() => {
    // 임시 데이터 사용
    const mockData = {
      success: true,
      data: {
        indicatorEtcInfo: {
          grade: "S",
          requestCount: 2,
          incidentTime: 0,
        },
      },
    };

    if (mockData && mockData.success) {
      const { grade, requestCount, incidentTime } =
        mockData.data.indicatorEtcInfo;
      setIndicatorData({ grade, requestCount, incidentTime });
    }
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchEvaluationData();
  //       if (response && response.success) {
  //         const { grade, requestCount, incidentTime } =
  //           response.data.indicatorEtcInfo;
  //         setIndicatorData({ grade, requestCount, incidentTime });
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch indicator data: ", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
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
