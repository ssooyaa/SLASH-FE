import React, { useState, useEffect } from "react";
import "./ContractInfoForm.css";
import { fetchContractInfo } from "../../../../../../api/UserService";
import GradeHorizonTable from "../../../../../feature/table/GradeHorizonTable";
import ServiceInfoForm from "../../service/serviceForm/ServiceInfoForm";
import { useParams, useNavigate } from "react-router-dom";

const ContractInfoForm = () => {
  const { contractId } = useParams();

  const [contract, setContract] = useState(null);

  const [evaluationItemInfos, setEvaluationItemInfos] = useState([]);

  const navigator = useNavigate();

  const [editModeOn, setEditModeOn] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchContractInfo(contractId);
      console.log(response);
      setContract(response);
      setEvaluationItemInfos(response.evaluationItems || []);
      setEditModeOn(response.isTerminate);
    };
    loadData();
  }, [contractId]);

  if (!contract) {
    return <p>로딩중....</p>;
  }

  const handleRedirect = () => {
    //계약관리페이지 구현 후 작성
  };

  const handleEditMode = () => {
    navigator(`/contractManager/updateContract/${contractId}`);
  };

  return (
    <div className="contractInfoTemplate">
      <div className="contractInformation">
        <div className="contractTitle">
          <p>SLA 협약서</p>
          {editModeOn ? null : (
            <button className="blackButton" onClick={() => handleEditMode()}>
              수정
            </button>
          )}
        </div>
        <div className="companyInfo">
          <p>회사이름: {contract.companyName}</p>
          <p>계약시작일: {contract.startDate}</p>
          <p>계약종료일: {contract.endDate}</p>
        </div>
        <div className="contractInfoDiv">
          <div className="table totalTable">
            <div className="tableTitle">
              <p>SLA 평가 등급</p>
              <span>*</span>
            </div>
            <GradeHorizonTable initialData={contract.totalTargets} />
          </div>
          <div className="cardSection">
            {evaluationItemInfos.map((item, index) => (
              <div key={index} className="serviceInfoCard">
                <ServiceInfoForm initialData={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="serviceFormButton">
          <button className="blackButton" onClick={handleRedirect}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractInfoForm;
