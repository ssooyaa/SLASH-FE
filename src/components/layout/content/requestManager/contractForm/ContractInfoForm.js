import React, { useState, useEffect } from "react";
import "./ContractInfoForm.css";
import { fetchContractInfo } from "../../../../../../api/UserService";
import GradeHorizonTable from "../../../../../feature/table/GradeHorizonTable";
import OneColTable from "../../../../../feature/table/OneColTable";
import ContractServiceCard from "../../../../../feature/card/ContractServiceCard";

const ContractInfoForm = () => {
  const [contract, setContract] = useState(null);
  const [evaluationItemInfos, setEvaluationItemInfos] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchContractInfo();
      console.log(response);
      setContract(response.contract);
      setEvaluationItemInfos(response.evaluationItemInfos);
    };
    loadData();
  }, []);

  if (!contract) {
    return <p>로딩중....</p>;
  }

  return (
    <div className="contractInfoTemplate">
      <div className="contractInfo">
        <div className="contractTitle">
          <p>SLA 협약서</p>
          <button className="blackButton">수정</button>
        </div>
        <div className="companyInfo">
          <p>회사이름: {contract.companyName}</p>
          <p>
            계약시작일: {contract.startDate[0]}.{contract.startDate[1]}.
            {contract.startDate[2]}
          </p>
          <p>
            계약종료일: {contract.endDate[0]}.{contract.endDate[1]}.
            {contract.endDate[2]}
          </p>
        </div>
        <div className="contractInfoDiv">
          <div className="table totalTable">
            <div className="tableTitle">
              <p>SLA 평가 등급</p>
              <span>*</span>
            </div>
            <GradeHorizonTable initialData={contract.totalTargets} />
          </div>
          <div className="table categoryTable">
            <div className="tableTitle">
              <p>서비스 평가 항목</p>
              <span>*</span>
            </div>
            <OneColTable
              label={"서비스 평가 항목"}
              data={evaluationItemInfos.map((item) => item.categoryName)}
            />
          </div>
          <div className="cardSection">
            {evaluationItemInfos.map((item, index) => {
              return (
                <div key={index} className="serviceInfoCard">
                  <ContractServiceCard initialData={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContractInfoForm;
