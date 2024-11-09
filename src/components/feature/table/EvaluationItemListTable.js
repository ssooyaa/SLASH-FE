import React, { useState, useEffect } from "react";
import "./EvaluationItemList.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EvaluationItemListTable = ({ initialData }) => {
  const [data, setData] = useState(initialData || []);

  const navigator = useNavigate();

  useEffect(() => {
    console.log("EvaluationItemListTable 데이터: ", initialData); // data 값 확인
    setData(initialData);
  }, [initialData]);

  const handleAddEvaluationItem = () => {
    //페이지 구현 후 이동
  };

  const handleEvaluationItemDetail = (evaluationItemId) => {
    console.log(evaluationItemId);
    // navigator();
    //상세페이지 구현 후 직성
  };

  return (
    <div className="listTable">
      <div className="listTableHead">
        <p className="IndicatorP headerP">지표구분</p>
        <p className="isAutoP headerP">자동계산여부</p>
        <p className="periodP headerP">측정 주기</p>
        <p className="buttonP"></p>
      </div>
      {data.length === 0 ? (
        <div className="noData">평가 항목을 등록하세요</div>
      ) : (
        data.map((item, index) => (
          <div className="listTableBody" key={item.id || index}>
            <p className="IndicatorP">{item.category}</p>
            <p className="isAutoP">
              {item.autoCalculation ? "자동 계산" : "수동 계산"}
            </p>
            <p className="periodP">{item.period}</p>
            <p className="buttonP">
              <button
                onClick={() =>
                  handleEvaluationItemDetail(item.evaluationItemId)
                }
              >
                자세히보기
                <MdKeyboardArrowRight />
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default EvaluationItemListTable;
