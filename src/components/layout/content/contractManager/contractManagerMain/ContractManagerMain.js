import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ContractManagerMain.css";
import {
  fetchAllContraName,
  fetchContractInfo,
} from "../../../../../api/CommonService";
import GradeHorizonTable from "../../../../feature/table/GradeHorizonTable";
import EvaluationItemListTable from "../../../../feature/table/EvaluationItemListTable";
import { FaSearch } from "react-icons/fa";

const ContractManagerMain = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [contractId, setContractId] = useState(null);

  const [contractInfo, setContractInfo] = useState(null);

  const [contractList, setContractList] = useState([]);

  const [evaluationItems, setEvaluationItems] = useState([]);

  // 초기 계약 리스트와 첫 번째 계약 정보 로드
  useEffect(() => {
    const loadData = async () => {
      const response = await fetchAllContraName();
      setContractList(response);

      const firstContractId = location.state
        ? location.state.contractId
        : response[0].contractId;
      if (firstContractId) {
        setContractId(firstContractId);
        const initialContractInfo = await fetchContractInfo(firstContractId);
        setContractInfo(initialContractInfo);
        setEvaluationItems(initialContractInfo.evaluationItems);
      } else {
        console.warn("No contract ID found.");
      }
    };
    loadData();
  }, []);

  // 조회 버튼 클릭 시 계약 정보 로드
  const handleSearchClick = async () => {
    if (contractId) {
      const contractInfo = await fetchContractInfo(contractId);
      setContractInfo(contractInfo);
      setEvaluationItems(contractInfo.evaluationItems);
    }
  };

  const handleContractChange = (event) => {
    setContractId(Number(event.target.value));
  };

  return (
    <div className="contractManagerMainDiv">
      <div className="contractSelect">
        <span className="contractTitleSpan">*</span>
        <p>협약서</p>
        <select value={contractId ?? ""} onChange={handleContractChange}>
          {contractList.map((item) => (
            <option key={item.contractId} value={item.contractId}>
              {item.contractName}
            </option>
          ))}
        </select>
        <button className="contractMainSearchBtn" onClick={handleSearchClick}>
          <FaSearch />
          조회
        </button>
      </div>

      {contractInfo && contractInfo.contractName && (
        <div className="mainContractInfo">
          <p>협약서: {contractInfo.contractName}</p>
          <p>계약 시작일: {contractInfo.startDate}</p>
          <p>계약 만료일: {contractInfo.endDate}</p>
        </div>
      )}

      <div className="mainSlaGrade">
        <div className="mainGradeEditBtnDiv">
          <button>수정하기</button>
        </div>
        <div className="table mainTotalGrade">
          <GradeHorizonTable initialData={contractInfo?.totalTargets || []} />
        </div>
      </div>

      <div className="mainServiceCategory">
        <div className="mainGradeEditBtnDiv">
          <button>지표추가</button>
        </div>
        <div className="categoryTitle">
          <EvaluationItemListTable initialData={evaluationItems} />
        </div>
      </div>
    </div>
  );
};

export default ContractManagerMain;
