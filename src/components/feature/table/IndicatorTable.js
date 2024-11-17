import React, { useState, useEffect } from "react";
import "./IndicatorTable.css";
import { MdKeyboardArrowRight } from "react-icons/md";

const IndicatorTable = ({
  initialData,
  handleDetail,
  handleDeleteStatistics,
  handleDateUpdate,
}) => {
  const [data, setData] = useState(initialData || []);

  useEffect(() => {
    if (Array.isArray(initialData) && initialData.length > 0) {
      const singleDate = initialData[0].date; // 첫 번째 항목의 date
      handleDateUpdate(singleDate); // 상위 컴포넌트로 전달
    }
    setData(initialData);
  }, [initialData, handleDateUpdate]);

  const handleData = (id) => {
    handleDetail(id);
  };

  const handleDeleteDate = (evaluationItemId, date) => {
    handleDeleteStatistics(evaluationItemId, date);
  };

  return (
    <div className="listTable">
      <div className="listTableHead">
        <p className="listTableCategory headerP">지표구분</p>
        <p className="isAutoP headerP">자동계산여부</p>
        <p className="dateP headerP">지표측정일</p>
        <p className="approvalP headerP">승인 여부</p>
        <p className="buttonP"></p>
        <p className="deleteBtnP"></p>
      </div>
      {data.map((item, index) => (
        <div className="listTableBody" key={item.evaluationItemId || index}>
          <p className="listTableCategory">{item.category}</p>
          <p className="isAutoP">{item.isAuto ? "자동" : "수동"}</p>
          <p className="dateP dateP">{item.date}</p>
          <p className="approvalP">{item.isApprove ? "승인됨" : "미승인"}</p>
          <p className="buttonP">
            <button onClick={() => handleData(item.evaluationItemId)}>
              자세히보기
              <MdKeyboardArrowRight />
            </button>
          </p>
          <p className="deleteBtnP">
            <button
              onClick={() => handleDeleteDate(item.evaluationItemId, item.date)}
            >
              삭제하기
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default IndicatorTable;
