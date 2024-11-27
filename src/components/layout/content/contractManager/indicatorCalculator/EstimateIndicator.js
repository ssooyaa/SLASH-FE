import React, { useEffect, useState } from "react";
import "./EstimateIndicator.css";
import {
  fetchStatisticsStatus,
  saveMeasuring,
  saveServiceMeasuring,
  saveIncidentMeasuring,
} from "../../../../../api/ContractManagerService";
import { fetchAllContractName } from "../../../../../api/CommonService";
import { FaAsterisk } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import IndicatorTable from "../../../../feature/table/IndicatorTable";
import "react-datepicker/dist/react-datepicker.css";
import { deleteStatistics } from "../../../../../api/ContractManagerService";
import ContentsHeader from "../../../../common/header/ContentsHeader";

const EstimateIndicator = () => {
  const [agreements, setAgreements] = useState([]);

  const [selectedAgreementId, setSelectedAgreementId] = useState(null);

  const [selectedAgreement, setSelectedAgreement] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [indicatorDate, setIndicatorDate] = useState(null);

  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()).padStart(2, "0"); //전월기준으로 +1 하지 않음
    return `${year}-${month}`;
  };

  const maxDate = getMaxDate();

  // 해당 페이지에서 이용하는 날짜 형식
  const dateFormatter = (date) => {
    const [year, month] = date.split("-");
    return `${year}-${month}`;
  };

  const [contracts, setContracts] = useState([]);

  const [data, setData] = useState({
    unCalculatedStatistics: [],
    calculatedStatistics: [],
  });

  const handleDateUpdate = (date) => {
    console.log("Updated date:", date); // 전달받은 date 확인
    setIndicatorDate(date); // 상태 업데이트
  };
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

  // Fetch contracts data
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
          console.log(
            "Fetched contract names:",
            data.map((contract) => contract.contractName)
          );
          setContracts(data);
          if (data.length > 0) {
            setSelectedAgreementId(data[0].contractId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch contracts: ", error);
      }
    };
    fetchContracts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAgreement || !selectedDate) {
        // 초기값이 없을 경우 fetchInitialContracts를 호출하여 설정
        await fetchInitialContracts();
      }

      if (selectedAgreement && selectedDate) {
        try {
          const response = await fetchStatisticsStatus(
            selectedAgreement.contractId,
            dateFormatter(selectedDate)
          );
          if (response && response.success) {
            console.log(response);
            setData(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
        }
      }
    };
    fetchData();
  }, [selectedAgreement, selectedDate]);

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMeasureClick = async (contractId, selectedDate) => {
    try {
      console.log("contractId", contractId, "selectedDate", selectedDate);
      const fetchedData = await fetchStatisticsStatus(contractId, selectedDate);

      console.log("Fetched Data:", fetchedData);
      if (fetchedData.success) {
        setData(fetchedData.data);
      } else {
        throw new Error("Unsuccessful response from API");
      }
    } catch (error) {
      alert("조회 불가");
      console.error("Error details:", error);
    }
  };

  const handleEstimateClick = async ({ evaluationItemId, date }) => {
    try {
      console.log("evaluationItemId", evaluationItemId, "date", date);
      const response = await saveMeasuring({ evaluationItemId, date });
      console.log("response:", response);
      if (response) {
        alert("측정 완료");
      } else {
        throw new Error("측정 실패");
      }
    } catch (error) {
      alert("측정할 수 있는 데이터가 없습니다.");
      console.error("Error details:", error);
    }
  };

  const handleEstimateServiceClick = async ({ evaluationItemId, date }) => {
    try {
      console.log("evaluationItemId", evaluationItemId, "date", date);
      const response = await saveServiceMeasuring({ evaluationItemId, date });
      console.log("response:", response);
      if (response) {
        alert("측정 완료");
      } else {
        throw new Error("측정 실패");
      }
    } catch (error) {
      alert("측정할 수 있는 데이터가 없습니다.");
      console.error("Error details:", error);
    }
  };

  const handleEstimateIncidentClick = async ({ evaluationItemId, date }) => {
    try {
      console.log("evaluationItemId", evaluationItemId, "date", date);
      const response = await saveIncidentMeasuring({ evaluationItemId, date });
      console.log("response:", response);
      if (response) {
        alert("측정 완료");
      } else {
        throw new Error("측정 실패");
      }
    } catch (error) {
      alert("측정할 수 있는 데이터가 없습니다.");
      console.error("Error details:", error);
    }
  };

  const navigate = useNavigate();

  const handleDetailClick = (evaluationItemId) => {
    if (indicatorDate) {
      navigate(
        `/contractManager/autoCal?evaluationItemId=${evaluationItemId}&date=${indicatorDate}`
      );
    } else {
      alert("날짜가 설정되지 않았습니다.");
    }
  };

  const handleDeleteStatistics = async (evaluationItemId, date) => {
    const response = await deleteStatistics(evaluationItemId, date);
    if (response) {
      alert("삭제되었습니다.");
      const updatedData = await fetchStatisticsStatus(
        selectedAgreementId,
        selectedDate
      );
      if (updatedData.success) {
        setData(updatedData.data);
      } else {
        alert("데이터를 갱신할 수 없습니다.");
      }
    } else {
      alert("삭제 실패");
    }
  };

  return (
    <div>
      <ContentsHeader
        agreements={contracts}
        selectedAgreement={selectedAgreement}
        setSelectedAgreement={setSelectedAgreement}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        maxDate={maxDate}
        dateFormat={`month`}
      />

      <div className="eContainer">
        <div className="eSection">
          <h2 className="eSectionTitle">미측정 지표</h2>
          <div className="tableList">
            {data.unCalculatedStatistics.map((item, index) => (
              <div
                className={`eCard ${index % 2 === 0 ? "eOddRow" : "eEvenRow"}`}
                key={item.evaluationItemId}
              >
                <div className="eCardContent">
                  <div className="eCheckboxWrapper">
                    <input
                      type="checkbox"
                      checked={checkedItems[item.evaluationItemId] || false}
                      onChange={() =>
                        handleCheckboxChange(item.evaluationItemId)
                      }
                      className="eCheckbox"
                    />
                    <span className="eText">{item.category}</span>
                  </div>
                  {checkedItems[item.evaluationItemId] &&
                    item.category === "서비스 가동률" && (
                      <button
                        className="eMeasureButton"
                        onClick={async () => {
                          await handleEstimateClick({
                            evaluationItemId: item.evaluationItemId,
                            date: selectedDate,
                          });
                          await handleMeasureClick(
                            selectedAgreementId,
                            selectedDate
                          );
                        }}
                      >
                        측정하기
                      </button>
                    )}
                  {checkedItems[item.evaluationItemId] &&
                    item.category === "서비스요청 적기처리율" && (
                      <button
                        className="eMeasureButton"
                        onClick={async () => {
                          await handleEstimateServiceClick({
                            evaluationItemId: item.evaluationItemId,
                            date: selectedDate,
                          });
                          await handleMeasureClick(
                            selectedAgreementId,
                            selectedDate
                          );
                        }}
                      >
                        측정하기
                      </button>
                    )}
                  {checkedItems[item.evaluationItemId] &&
                    item.category === "장애 적기처리율" && (
                      <button
                        className="eMeasureButton"
                        onClick={async () => {
                          await handleEstimateIncidentClick({
                            evaluationItemId: item.evaluationItemId,
                            date: selectedDate,
                          });
                          await handleMeasureClick(
                            selectedAgreementId,
                            selectedDate
                          );
                        }}
                      >
                        측정하기
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="eContainer">
        <h2 className="eSectionTitle">계산 완료</h2>
        {data.calculatedStatistics.length > 0 ? (
          <div className="tableList">
            <IndicatorTable
              initialData={data.calculatedStatistics}
              handleDetail={handleDetailClick}
              handleDeleteStatistics={handleDeleteStatistics}
              handleDateUpdate={handleDateUpdate}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EstimateIndicator;
