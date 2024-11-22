import { useEffect, useState } from "react";
import DashboardToggle from "./DashBoardToggle";
import "./DashBoardBottom.css";
import TableView from "./TableView";
import ChartView from "./ChartView";
import ChartTable from "./ChartTable";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  fetchEvaluationItemCategory,
  fetchServiceUptime,
  fetchCommonServiceStatistics,
  fetchCommonIncidentStatistics,
} from "../../../../../../api/CommonService";
import { fetchContractData } from "../../../../../../api/UserService";
import DropDownHeader from "../../../../../dropdown/DropDownHeader";

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
      console.log("카테고리: ", categories);
      setCategories(categories);
    };
    const fetchContract = async (agreementId) => {
      const evaluationItem = await fetchContractData(agreementId);
      console.log("페치컨트랙트: ", evaluationItem);
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
          selectedOption={
            categories.length > 0 ? selectedCriteria : "평가 항목이 없습니다." // categories가 비어 있으면 빈 값 설정
          }
          onSelect={(option) => {
            const selectedCategory = categories.filter(
              (data) => data.category === option
            );
            setSelectedCriteria(selectedCategory[0]?.category || ""); // 선택된 카테고리 초기화
            setSelectedCriteriaId(
              selectedCategory[0]?.evaluationItemId || null
            ); // ID 초기화
          }}
          style={{ width: "550px" }}
        />
        <DashboardToggle view={view} setView={setView} />
      </div>
      <div className="toggleHeader" onClick={toggleTableVisibility}>
        {isTableVisible ? <FaChevronDown /> : <FaChevronRight />}
        <span style={{ marginLeft: "5px" }}>서비스 평가 기준</span>
      </div>
      {categories.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="noCategories">
          <p>서비스 항목이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default DashBoardBottom;
