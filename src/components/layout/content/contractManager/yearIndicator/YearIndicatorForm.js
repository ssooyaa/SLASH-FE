import React, { useEffect, useState } from "react";
import YearIndicatorsChart from "../../../../feature/chart/yearIndicatorChart/YearIndicatorChart";
import YearIndicatorTable from "./YearIndicatorTable";
import { fetchAllContractName } from "../../../../../api/UserService";
import ContentsHeader from "../../../../../components/common/header/ContentsHeader";

const YearIndicatorForm = () => {
  // 전체 계약 정보 조회
  const [agreements, setAgreements] = useState([]);

  // agreement와 date의 경우 새로고침시에 정보를 유지하기 위해 세션에 해당 정보 저장
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const getMaxDate = () => {
    const today = new Date();
    return new Date(today.getFullYear() - 1, 12, 31); // 연도의 마지막 날짜로 설정 (12월 31일)
  };

  const maxDate = getMaxDate();

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
          const year = today.getFullYear();
          const date = `${year}`;
          setSelectedDate(date);
        }
      }
    } catch (error) {
      console.error("Failed to fetch contracts: ", error);
    }
  };

  // 해당 페이지에서 이용하는 날짜 형식
  const dateFormatter = (date) => {
    if (!date) return ""; // date가 없으면 빈 문자열을 반환

    const year = date.split("-"); // 날짜를 '-'로 나누고 연도만 추출
    return `${year[0]}`; // 연도만 반환
  };

  // 초기화 : 해당 페이지가 랜더링되었을 때, 최상위 컴포넌트가 해당 정보를 관리하는 것이 타당해 보임.
  useEffect(() => {
    fetchInitialContracts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAgreement || !selectedDate) {
        // 초기값이 없을 경우 fetchInitialContracts를 호출하여 설정
        await fetchInitialContracts();
      }
      console.log("선택계약: ", selectedAgreement);
      console.log("선택년도:", selectedDate);
    };
    fetchData();
  }, [selectedAgreement, selectedDate]);

  return (
    <div>
      <ContentsHeader
        agreements={agreements}
        selectedAgreement={selectedAgreement}
        setSelectedAgreement={setSelectedAgreement}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        maxDate={maxDate}
        dateFormat={`year`}
      />
      <YearIndicatorsChart
        contractId={selectedAgreement?.contractId}
        date={dateFormatter(selectedDate)}
      />
      <YearIndicatorTable
        contractId={selectedAgreement?.contractId}
        date={dateFormatter(selectedDate)}
      />
    </div>
  );
};

export default YearIndicatorForm;
