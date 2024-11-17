import React, { useEffect, useState } from "react";
import "../../../../styles/Content.css"; // 공통 Content css 파일 import
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import RequestManagerTop from "./requestManagerTop/RequestManagerTop";
import RequestManagerBottom from "./requestManagerBottom/RequestManagerBottom";
import ContractHeaderV2 from "../../../common/header/ContractHeaderV2";
import { fetchContractInfo } from "../../../../api/CommonService";

const RequestManagerMainContent = ({ isNavOpen, toggleNav, effectClass }) => {
  const [selectedAgreementId, setSelectedAgreementId] = useState(
    localStorage.getItem("selectedAgreementId") || null
  );
  const [contractInfo, setContractInfo] = useState({});

  //콜백 함수 정의
  const handleContractSelection = (agreementId) => {
    setSelectedAgreementId(agreementId);

    //localStorage에 값 저장
    localStorage.setItem("selectedAgreementId", agreementId);
  };

  useEffect(() => {
    if (selectedAgreementId) {
      console.log(selectedAgreementId);
      handleContractSelection(selectedAgreementId);
    }
  }, [selectedAgreementId]);

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
          <ContractHeaderV2
            onContractSelect={handleContractSelection}
            setSelectedAgreementId={setSelectedAgreementId}
            selectedAgreementId={selectedAgreementId}
          />
          <RequestManagerTop contractId={selectedAgreementId} />
          <RequestManagerBottom agreementId={selectedAgreementId} />
        </div>
      </div>
    </div>
  );
};

export default RequestManagerMainContent;
