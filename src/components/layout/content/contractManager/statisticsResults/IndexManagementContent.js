import React, { useState, useEffect } from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import MiddleIndex from "./MiddleIndex";
import ContentsHeader from "../../../../../components/common/header/ContentsHeader";
import { fetchIndicators } from "../../../../../api/CommonService";
import { fetchAllContractName } from "../../../../../api/UserService";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";
import "./IndexManagementContent.css";

const IndexManagementContent = ({ isNavOpen, toggleNav, effectClass }) => {
  // 전체 계약 정보 조회
  const [agreements, setAgreements] = useState([]);

  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [contractData, setContractData] = useState({});

  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()).padStart(2, "0"); //전월기준으로 +1 하지 않음
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
          const month = String(today.getMonth()).padStart(2, "0"); //전월기준으로 +1 하지 않음
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
    const [year, month] = date.split("-");
    return `${year}-${month}`;
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
        try {
          const response = await fetchIndicators(
            selectedAgreement.contractId,
            dateFormatter(selectedDate)
          );
          if (response && response.success) {
            setContractData(response.data);
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
          <MiddleIndex initialData={contractData} />
          <div className="MonthStatisticsTable">
            <StatisticsListTable initialData={contractData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexManagementContent;
