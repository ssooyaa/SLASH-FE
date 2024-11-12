import React, {useState} from 'react';
import {FaBars} from "react-icons/fa6";
import {IoPersonCircle} from "react-icons/io5";
import RequestManagerBottom from "./requestManagerBottom/RequestManagerBottom";
import ContractHeaderV1 from "../../../common/header/ContractHeaderV1";

const RequestManagerStatusContent = ({ isNavOpen, toggleNav, effectClass }) => {
  // 상태 정의: ContractHeaderV1에서 받은 값을 저장
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // 콜백 함수 정의
  const handleContractSelection = (agreementId, date) => {
    setSelectedAgreementId(agreementId);
    setSelectedDate(date);
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
          {/* 자식 컴포넌트에 콜백 함수 전달 */}
          <ContractHeaderV1 onContractSelect={handleContractSelection} />
          {/* 상태를 자식 컴포넌트로 전달 */}
          <RequestManagerBottom agreementId={selectedAgreementId} date={selectedDate}/>
        </div>
      </div>
    </div>
  );
};

export default RequestManagerStatusContent;