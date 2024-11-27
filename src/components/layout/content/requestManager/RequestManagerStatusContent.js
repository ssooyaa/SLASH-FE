import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import RequestManagerBottom from "./requestManagerBottom/RequestManagerBottom";
import ContentsHeader from "../../../common/header/ContentsHeader";
import { fetchAllContractName } from "../../../../api/CommonService";

const RequestManagerStatusContent = ({ isNavOpen, toggleNav, effectClass }) => {
  // 전체 계약 정보 조회
  const [agreements, setAgreements] = useState([]);

  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); //전월기준으로 +1 하지 않음
    return `${year}-${month}`;
  };

  const maxDate = getMaxDate();

  // 계약정보를 불러오는 함수
  const fetchInitialContracts = async () => {
    try {
      const data = await fetchAllContractName();
      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          setAgreements(data);
          setSelectedAgreement(data[0]);
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0"); //전월기준으로 +1 하지 않음
          const date = `${year}-${month}`;
          setSelectedDate(date);
        }
      }
    } catch (error) {
      console.error("Failed to fetch contracts: ", error);
    }
  };

  // agreement, 날짜가 변할 경우 새로운 contractData fetch
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAgreement || !selectedDate) {
        // 초기값이 없을 경우 fetchInitialContracts를 호출하여 설정
        await fetchInitialContracts();
        console.log(selectedAgreement);
        console.log(selectedDate);
      }
    };
    fetchData();
  }, [selectedAgreement, selectedDate]);

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
          <ContentsHeader
            agreements={agreements}
            selectedAgreement={selectedAgreement}
            setSelectedAgreement={setSelectedAgreement}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            maxDate={maxDate}
            dateFormat={`month`}
          />
          {/* 상태를 자식 컴포넌트로 전달 */}
          <RequestManagerBottom
            agreementId={selectedAgreement?.contractId}
            date={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestManagerStatusContent;
