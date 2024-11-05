import { useEffect, useState } from "react";
import Dropdown from "../../../../../dropdown/Dropdown";
import DashboardToggle from "./DashBoardToggle";
import "./DashBoardBottom.css";
import TableView from "./TableView";
import ChartView from "./ChartView";
import axios from "axios";

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

  useEffect(() => {
    // 계약 데이터 가져오기
    const token = localStorage.getItem("accessToken");

    axios
      .get(`/common/contract/1`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
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

        <DashboardToggle view={view} setView={setView} />
      </div>
      <div className="criteriaStatistics">
        {view === "chart" ? (
          <ChartView selectedCriteria={selectedCriteria} />
        ) : (
          <div className="tableView">
            <TableView
              selectedCriteria={selectedCriteria}
              contractData={contractData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardBottom;
