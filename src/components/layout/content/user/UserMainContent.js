import React, { useState } from "react";
import "../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import DashBoardBottom from "./dashBoard/dashBoardBottom/DashBoardBottom";
import UserHeaderV1 from "../../../common/header/UserHeaderV1";
import { fetchContractInfo } from "../../../../api/CommonService";

const UserMainContent = ({ isNavOpen, toggleNav, effectClass }) => {
  // 상태 정의: ContractHeaderV1에서 받은 값을 저장
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [contractInfo, setContractInfo] = useState({});

  // 콜백 함수 정의
  const handleContractSelection = (agreementId, date) => {
    setSelectedAgreementId(agreementId);
    setSelectedDate(date);
    const fetchContract = async (agreementId) => {
      const contractDataInfo = await fetchContractInfo(agreementId);
      setContractInfo(contractDataInfo);
    };
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
          <UserHeaderV1 onContractSelect={handleContractSelection} />
          <DashBoardBottom
            agreementId={selectedAgreementId}
            date={selectedDate}
            contractInfo={contractInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMainContent;
