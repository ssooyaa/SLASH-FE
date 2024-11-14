import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const StatisticsListTable = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const handleData = () => {};
  return (
    <div className="listTable">
      <div className="listTableHead">
        <p className="listTableCategory headerP">지표구분</p>
        <p className="isAutoP headerP">자동계산여부</p>
        <p className="dateP headerP">측정월</p>
        <p className="scoreP headerP">평가 점수</p>
        <p className="weightScoreP headerP">평가 점수(가중치 적용)</p>
        <p className="gradeP headerP">평가 등급</p>
        <p className="buttonP"></p>
      </div>
      {data.map((item, index) => (
        <div className="listTableBody" key={item.evaluationItemId || index}>
          <p className="listTableCategory">{item.category}</p>
          <p className="isAutoP">{item.isAuto ? "자동" : "수동"}</p>
          <p className="dateP dateP">{item.calculatedDate}</p>
          <p className="approvalP">{item.isApprove ? "승인됨" : "미승인"}</p>
          <p className="buttonP">
            <button onClick={() => handleData(item.evaluationItemId)}>
              자세히보기
              <MdKeyboardArrowRight />
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
export default StatisticsListTable;
