import React, { useState, useEffect } from "react";
import "./IndicatorTable.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const IndicatorTable = ({ initialData, handleDetail }) => {
  const [data, setData] = useState(initialData || []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("EvaluationItemListTable 데이터: ", initialData); // data 값 확인
    setData(initialData);
  }, [initialData]);

  const handleData = (id) => {
    handleDetail(id);
  };

  return (
    <div className="listTable">
      <div className="listTableHead">
        <p className="listTableCategory headerP">지표구분</p>
        <p className="isAutoP headerP">자동계산여부</p>
        <p className="dateP headerP">지표측정일</p>
        <p className="approvalP headerP">승인 여부</p>
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

export default IndicatorTable;
