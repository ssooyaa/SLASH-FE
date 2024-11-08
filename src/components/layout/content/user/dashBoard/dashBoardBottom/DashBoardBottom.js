import { useEffect, useState } from "react";
import Dropdown from "../../../../../dropdown/Dropdown";
import DashboardToggle from "./DashBoardToggle";
import "./DashBoardBottom.css";
import TableView from "./TableView";
import ChartView from "./ChartView";
import ChartTable from "./ChartTable";
import axios from "axios";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

const DashBoardBottom = () => {
  const targetCriteria = [
    "서비스 가동률",
    "서비스요청 적기처리율",
    "장애 적기처리율",
  ];
  const [selectedCriteria, setSelectedCriteria] = useState("서비스 가동률");
  const [view, setView] = useState("chart");
  const [contractData, setContractData] = useState(null);
  const [statistics, setStatistics] = useState([]); // 상태 추가
  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // 계약 데이터 가져오기
    axios
      .get(`common/contract/1`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          setContractData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("계약 데이터를 가져오는 중 오류:", error);
      });
  }, []);

  const toggleTableVisibility = () => {
    setIsTableVisible((prev) => !prev);
  };

  return (
    <div className="totalDiv">
      <div className="criteria">
        <Dropdown
          className="criteria2"
          label="서비스 평가지표 : "
          options={targetCriteria}
          selectedOption={selectedCriteria}
          onSelect={setSelectedCriteria}
          style={{ width: "550px" }}
        />
      </div>
      <div className="toggleHeader" onClick={toggleTableVisibility}>
        {isTableVisible ? <FaChevronDown /> : <FaChevronRight />}
        <span style={{ marginLeft: "5px" }}>서비스 평가 기준</span>
      </div>

      {isTableVisible && (
        <div className="toggleTable">
          <TableView
            className="toggleTable"
            selectedCriteria={selectedCriteria}
            contractData={contractData}
          />
        </div>
      )}
      <DashboardToggle view={view} setView={setView} />

      <div className="criteriaStatistics">
        {view === "chart" ? (
          <ChartView
            selectedCriteria={selectedCriteria}
            setStatistics={setStatistics} // 함수 전달
          />
        ) : (
          <div className="chartTable">
            <ChartTable
              selectedCriteria={selectedCriteria}
              contractData={contractData}
              statistics={statistics} // 상태 전달
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardBottom;
