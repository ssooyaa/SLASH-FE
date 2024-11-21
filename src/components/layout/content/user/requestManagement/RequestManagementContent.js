import React, { useEffect, useState } from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import RequestManagementBottom from "../requestManagement/RequestManagementBottom/RequestManageBottom";
import RequestManagementTop from "../requestManagement/RequestManagementTop/RequestManagementTop";
import ContentsHeader from "../../../../../components/common/header/ContentsHeader";
import { fetchAllContractName } from "../../../../../api/UserService";

const RequestManagementContent = ({ isNavOpen, toggleNav, effectClass }) => {
  const [agreements, setAgreements] = useState([]);

  // agreement와 date의 경우 새로고침시에 정보를 유지하기 위해 세션에 해당 정보 저장
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

  // 해당 페이지에서 이용하는 날짜 형식
  const dateFormatter = (date) => {
    if (!date) return ""; // date가 null 또는 undefined일 경우 빈 문자열 반환

    const [year, month] = date.split("-");
    return `${year}-${month}`; // "YYYY-MM" 형식으로 반환
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAgreement || !selectedDate) {
        // 초기값이 없을 경우 fetchInitialContracts를 호출하여 설정
        await fetchInitialContracts();
      }
    };
    fetchData();
  }, [selectedAgreement, selectedDate]);

  // 초기화 : 해당 페이지가 랜더링되었을 때, 최상위 컴포넌트가 해당 정보를 관리하는 것이 타당해 보임.
  useEffect(() => {
    fetchInitialContracts();
  }, []);

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
          <ContentsHeader
            agreements={agreements}
            selectedAgreement={selectedAgreement}
            setSelectedAgreement={setSelectedAgreement}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            maxDate={maxDate}
            dateFormat={`month`}
          />
          <RequestManagementTop
            selectedDate={dateFormatter(selectedDate)}
            selectedAgreementId={selectedAgreement?.contractId}
          />
          <RequestManagementBottom
            agreementId={selectedAgreement?.contractId}
            date={dateFormatter(selectedDate)}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestManagementContent;
