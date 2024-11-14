import React, {useEffect, useState} from "react";
import "../../../../styles/Content.css"; // 공통 Content css 파일 import
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import RequestManagerTop from "./requestManagerTop/RequestManagerTop";
import RequestManagerBottom from "./requestManagerBottom/RequestManagerBottom";
import ContractHeaderV2 from "../../../common/header/ContractHeaderV2";
import {fetchContractInfo} from "../../../../api/CommonService";

const RequestManagerMainContent = ({ isNavOpen, toggleNav, effectClass }) => {

  // 상태 정의: ContractHeaderV1에서 받은 값을 저장
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [contractInfo, setContractInfo] = useState({});

  // 콜백 함수 정의
  const handleContractSelection = (agreementId) => {
    setSelectedAgreementId(agreementId);
    console.log("들어오니?");
    console.log("들어오니? ", agreementId);
    const fetchContract = async (agreementId) => {
      const contractDataInfo = await fetchContractInfo(agreementId);
      setContractInfo(contractDataInfo);
    };
    fetchContract(agreementId);
  };

  return (
    <div
      className={`pageContent pageContentOffcanvas${effectClass} ${
        isNavOpen ? "jsOpened" : ""
      }`}
    >
      <button
        className={`navOpenBtn ${isNavOpen ? "jsHidden" : ""}`}
        onClick={toggleNav}
      >
        <FaBars />
      </button>

      {/* 프로필 및 환영 메시지 추가 */}
      <div className="profileSection">
        <div className="profileInfo">
          <IoPersonCircle className="profileImg" />
          <span className="welcomeText">관리자님 환영합니다</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="content">
        <div className="contentBox">
          <ContractHeaderV2 onContractSelect={handleContractSelection}/>
          <RequestManagerTop agreementId={selectedAgreementId}/>
          <RequestManagerBottom />
        </div>
      </div>
    </div>
  );
};

export default RequestManagerMainContent;
