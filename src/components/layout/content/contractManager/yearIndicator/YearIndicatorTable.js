import React, { useState, useEffect } from "react";
import { fetchYearIndicators } from "../../../../../api/CommonService";
import BottomTable from "../statisticsResults/BottomTable";
import "../../contractManager/yearIndicator/YearIndicator.css";

const YearIndicatorTable = ({ contractId, date }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchYearIndicators(contractId, date);
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.log("연간 지표 조회 시 에러 발생", error);
      }
    };

    fetchData();
  }, [contractId, date]);

  return (
    <div className="yearIndicatorTable">
      {data.map((item, index) =>
        item.indicatorEtcInfo || item.indicatorList ? (
          <div key={index} className="tableContainer">
            <div className="monthLabel">{index + 1} 월 통계</div>
            <BottomTable initialData={item} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default YearIndicatorTable;
