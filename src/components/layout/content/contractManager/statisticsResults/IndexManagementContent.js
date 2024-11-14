import React, { useState, useEffect } from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import MiddleIndex from "./MiddleIndex";
import ContractHeaderV1 from "../../../../common/header/ContractHeaderV1";
import BottomTable from "./BottomTable";
import { fetchIndicators } from "../../../../../api/CommonService";

const IndexManagementContent = ({ isNavOpen, toggleNav, effectClass }) => {
  // 상태 정의: ContractHeaderV1에서 받은 값을 저장
  const [selectedAgreementId, setSelectedAgreementId] = useState(
    localStorage.getItem("selectedAgreementId") || null
  );
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || ""
  );

  const [data, setData] = useState({});

  // 콜백 함수 정의
  const handleContractSelection = (agreementId, date) => {
    setSelectedAgreementId(agreementId);
    setSelectedDate(date);
    console.log("계약", agreementId, "날짜", date);

    // localStorage에 값 저장
    localStorage.setItem("selectedAgreementId", agreementId);
    localStorage.setItem("selectedDate", date);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAgreementId && selectedDate) {
        try {
          const response = await fetchIndicators(
            selectedAgreementId,
            selectedDate
          );
          if (response && response.success) {
            setData(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
        }
      }
    };
    fetchData();
  }, [selectedAgreementId, selectedDate]);

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
          {/* <ContractHeaderV1 onContractSelect={handleContractSelection} /> */}
          {/* 상태를 자식 컴포넌트로 전달 */}
          <MiddleIndex initialData={data} />
          <BottomTable initialData={data} />
        </div>
      </div>
    </div>
  );
};

export default IndexManagementContent;
