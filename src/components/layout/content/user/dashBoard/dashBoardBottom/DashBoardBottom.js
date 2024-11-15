import { useEffect, useState } from "react";
import Dropdown from "../../../../../dropdown/Dropdown";
import DashboardToggle from "./DashBoardToggle";
import "./DashBoardBottom.css";
import TableView from "./TableView";
import ChartView from "./ChartView";
import ChartTable from "./ChartTable";
import axios from "axios";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  fetchServiceOperationStatistics,
  fetchServiceStatistics,
  fetchEvaluationItemCategory,
  fetchServiceUptime,
  fetchCommonServiceStatistics,
  fetchCommonIncidentStatistics,
} from "../../../../../../api/CommonService";
import { fetchContractData } from "../../../../../../api/UserService";
import DropDownHeader from "../../../../../dropdown/DropDownHeader";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

const DashBoardBottom = ({ agreementId, date, contractInfo }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState("서비스 가동률");
  const [view, setView] = useState("chart");
  const [contractData, setContractData] = useState(
    contractInfo ? contractInfo : null
  );
  const [statistics, setStatistics] = useState([]); // 상태 추가
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [selectedCriteriaId, setSelectedCriteriaId] = useState(null);
  const [evaluationItem, setEvaluationItem] = useState(null);

  const functions = {
    "서비스 가동률": async () => {
      const res = await fetchServiceUptime(selectedCriteriaId, date);
      console.log(res);
      setStatistics(res.data);
    },
    "서비스요청 적기처리율": async () => {
      const res = await fetchCommonServiceStatistics(selectedCriteriaId, date);
      console.log(res);
      setStatistics([res.data]);
    },
    "장애 적기처리율": async () => {
      const res = await fetchCommonIncidentStatistics(selectedCriteriaId, date);
      console.log(res);
      setStatistics([res.data]);
    },
  };

  useEffect(() => {
    const fetchCategory = async (agreementId) => {
      const categories = await fetchEvaluationItemCategory(agreementId);
      setCategories(categories);
    };
    const fetchContract = async (agreementId) => {
      const evaluationItem = await fetchContractData(agreementId);
      setEvaluationItem(evaluationItem.data);
    };
    if (agreementId) {
      fetchCategory(agreementId);
      fetchContract(agreementId);
    }
  }, [agreementId]);

  useEffect(() => {
    if (categories.length > 0) {
      const firstData = categories[0];
      setSelectedCriteria(firstData.category);
      setSelectedCriteriaId(firstData.evaluationItemId);
    }
  }, [categories]);

  useEffect(() => {
    if (contractData?.evaluationItems) {
      const selectedItem = contractData.evaluationItems.find(
        (item) => item.category === selectedCriteria
      );
      setSelectedCriteriaId(selectedItem ? selectedItem.id : null);
    }
  }, [selectedCriteria, contractData]);

  useEffect(() => {
    if (selectedCriteriaId && selectedCriteria) {
      console.log(selectedCriteria);
      console.log(selectedCriteriaId);
      functions[selectedCriteria]();
    }
  }, [selectedCriteriaId, date]);

  const toggleTableVisibility = () => {
    setIsTableVisible((prev) => !prev);
  };

  return (
    <div className="totalDiv">
      <div className="criteria">
        <DropDownHeader
          className="criteria2"
          label="서비스 평가지표 : "
          options={categories.map((data) => data.category) || []}
          selectedOption={selectedCriteria}
          onSelect={(option) => {
            const selectedCategory = categories.filter(
              (data) => data.category === option
            );
            setSelectedCriteria(selectedCategory[0]?.category);
            setSelectedCriteriaId(selectedCategory[0]?.evaluationItemId);
          }}
          style={{ width: "550px" }}
        />
        <DashboardToggle view={view} setView={setView} />
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
            contractData={evaluationItem}
          />
        </div>
      )}
      <div className="criteriaStatistics">
        {view === "chart" ? (
          <ChartView
            selectedCriteria={selectedCriteria}
            statistics={statistics} // 상태 전달
          />
        ) : (
          <div className="chartTable">
            <ChartTable
              selectedCriteria={selectedCriteria}
              statistics={statistics} // 상태 전달
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardBottom;
