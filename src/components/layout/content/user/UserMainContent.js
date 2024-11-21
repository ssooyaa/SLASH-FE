import React, { useState, useEffect } from "react";
import "../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import DashBoardBottom from "./dashBoard/dashBoardBottom/DashBoardBottom";
import { fetchContractInfo } from "../../../../api/CommonService";
import { fetchAllContractName } from "../../../../api/UserService";
import ContentsHeader from "../../../../components/common/header/ContentsHeader";

const UserMainContent = ({ isNavOpen, toggleNav, effectClass }) => {
  const [contractInfo, setContractInfo] = useState({});

  // 전체 계약 정보 조회
  const [agreements, setAgreements] = useState([]);

  // agreement와 date의 경우 새로고침시에 정보를 유지하기 위해 세션에 해당 정보 저장
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // 계약정보를 불러오는 함수
  const fetchInitialContracts = async () => {
    try {
      const data = await fetchAllContractName();
      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          setAgreements(data);
          // 초기에 세션에 저장된 agreement가 없다면 세션에 신규 등록
          setSelectedAgreement(data[0]);
          const today = new Date();
          setSelectedDate(today);
        }
      }
    } catch (error) {
      console.error("Failed to fetch contracts: ", error);
    }
  };

  // 해당 페이지에서 이용하는 날짜 형식
  const dateFormatter = (date) => {
    if (!date) return ""; // 유효하지 않은 날짜 처리
    if (date instanceof Date) {
      // Date 객체일 경우
      return date.toISOString().split("T")[0];
    }
    if (typeof date === "string") {
      // 문자열일 경우
      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    }
    return ""; // 기타 타입일 경우 빈 문자열 반환
  };

  // 초기화 : 해당 페이지가 랜더링되었을 때, 최상위 컴포넌트가 해당 정보를 관리하는 것이 타당해 보임.
  useEffect(() => {
    fetchInitialContracts();
  }, []);

  // agreement, 날짜가 변할 경우 새로운 contractData fetch
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAgreement || !selectedDate) {
        // 초기값이 없을 경우 fetchInitialContracts를 호출하여 설정
        await fetchInitialContracts();
      }

      if (selectedAgreement && selectedDate) {
        console.log("계약변경: ", selectedAgreement);
        console.log("날짜 변경: ", selectedDate);
        try {
          const response = await fetchContractInfo(
            selectedAgreement.contractId,
            dateFormatter(selectedDate)
          );
          if (response && response.success) {
            setContractInfo(response);
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
        }
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
          <ContentsHeader
            agreements={agreements}
            selectedAgreement={selectedAgreement}
            setSelectedAgreement={setSelectedAgreement}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            maxDate={new Date()}
          />
          <DashBoardBottom
            agreementId={selectedAgreement?.contractId}
            date={dateFormatter(selectedDate)}
            contractInfo={contractInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMainContent;
