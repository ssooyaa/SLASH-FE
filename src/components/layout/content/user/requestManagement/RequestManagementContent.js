import React, {useEffect, useState} from "react";
import "../../../../../styles/Content.css";
import {FaBars} from "react-icons/fa6";
import {IoPersonCircle} from "react-icons/io5";
import RequestManagementBottom from "../requestManagement/RequestManagementBottom/RequestManageBottom";
import RequestManagementTop from "../requestManagement/RequestManagementTop/RequestManagementTop";
import {fetchContractInfo, fetchIndicators} from "../../../../../api/CommonService";
import ContractHeaderV3 from "../../../../common/header/ContractHeaderV3";

const RequestManagementContent = ({isNavOpen, toggleNav, effectClass}) => {
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [contractInfo, setContractInfo] = useState({});
  // 오늘 날짜로 초기 설정
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`; // 오늘 날짜를 기본값으로 설정
  });


  // 콜백 함수 정의
  const handleContractSelection = async (agreementId) => {
    console.log("들어오니? ", agreementId);
    const contractDataInfo = await fetchContractInfo(agreementId);
    console.log("contractDataInfo", contractDataInfo)
    setContractInfo(contractDataInfo.contractId);

  };

  useEffect(() => {
    if (selectedAgreementId) {
      console.log("selectedAgreementId", selectedAgreementId);
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
        <FaBars/>
      </button>

      {/* 프로필 및 환영 메시지 추가 */}
      <div className="profileSection">
        <div className="profileInfo">
          <IoPersonCircle className="profileImg"/>
          <span className="welcomeText">관리자님 환영합니다</span>
        </div>
      </div>
      <hr className="divider"/>
      <div className="content">
        <div className="contentBox">
          <ContractHeaderV3 onContractSelect={handleContractSelection}
                            onDateSelect={setSelectedDate}
                            setSelectedAgreementId={setSelectedAgreementId}
                            selectedAgreementId={selectedAgreementId}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}/>
          <RequestManagementTop selectedDate={selectedDate} selectedAgreementId={selectedAgreementId}/>
          <RequestManagementBottom/>
        </div>
      </div>
    </div>
  );
};

export default RequestManagementContent;
