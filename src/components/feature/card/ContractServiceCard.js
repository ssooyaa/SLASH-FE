import React from "react";
import "./ContractServiceCard.css";
import GradeLabel from "../../labels/grade/GradeLabel";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

const ContractServiceCard = ({ initialData }) => {
  const navigate = useNavigate();
  const data = initialData || {};
  const categoryId = data.categoryId;
  const categoryName = data.categoryName;
  const serviceDetail = data.serviceDetailDto || {};

  const handleAddService = () => {
    // categoryId와 categoryName을 state에 담아 navigate로 전달
    navigate("/contractManager/createService", {
      state: { categoryId, categoryName },
    });
  };

  return (
    <>
      <div className="cardTitle">
        <p>{categoryName || "카테고리 없음"}</p>
      </div>
      <div className="serviceCardSection">
        {serviceDetail.formula ? (
          <div className="cardInfo">
            <div className="cardServiceInfo">
              <div className="serviceFormula">
                <p>{serviceDetail.purpose || "목적 없음"}</p>
                <IoEllipsisHorizontalSharp className="detailIcon" />
              </div>
              <div className="serviceDetailInfo">
                <p>평가주기: {serviceDetail.period || "주기 없음"}</p>
                <p>산출식: {serviceDetail.formula || "산출식 없음"}</p>
              </div>
            </div>
            <div className="cardGradeInfo">
              <GradeLabel initialData={serviceDetail.serviceTargets} />
            </div>
          </div>
        ) : (
          <FaPlus className="addIcon" onClick={handleAddService} />
        )}
      </div>
    </>
  );
};

export default ContractServiceCard;
