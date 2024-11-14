import React, { useState, useEffect } from "react";
import GradeChart from "../../../../feature/chart/GradeChart";
import "./MiddleIndex.css";

const MiddleIndex = ({ initialData }) => {
  const [indicatorData, setIndicatorData] = useState({
    grade: "",
    score: 0,
  });
  const [indicatorList, setIndicatorList] = useState([]);

  useEffect(() => {
    if (initialData) {
      setIndicatorData(initialData.indicatorEtcInfo || { grade: "", score: 0 });
      setIndicatorList(initialData.indicatorList || []);
    }
  }, [initialData]);

  return (
    <div className="middle">
      <div className="totalIndex">
        <div className="title">종합평가 등급</div>
        <div className="value">{indicatorData.grade}등급</div>
        <div className="subText">{indicatorData.score}점</div>
      </div>
      <div className="monthChart">
        <GradeChart indicatorList={indicatorList} />
      </div>
    </div>
  );
};

export default MiddleIndex;
