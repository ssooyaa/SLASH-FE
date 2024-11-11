import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BottomTable.css";
import { fetchIndicators } from "../../../../../api/CommonService";

const BottomTable = ({ contractId, year, month, day }) => {
  const [indicatorList, setIndicatorList] = useState([]);
  const [indicatorEtcInfo, setIndicatorEtcInfo] = useState({ grade: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadIndicators = async () => {
      try {
        const data = await fetchIndicators(contractId, year, month, day);
        if (data && data.success) {
          setIndicatorList(data.data.indicatorList);
          setIndicatorEtcInfo(data.data.indicatorEtcInfo);
        }
      } catch (error) {
        console.error("Error fetching indicator data: ", error);
      }
    };

    loadIndicators();
  }, [contractId, year, month, day]);

  const handleDetailClick = (evaluationItemId, year, month, day) => {
    if (evaluationItemId && year && month && day) {
      console.log("Parameters being passed:", {
        evaluationItemId,
        year,
        month,
        day,
      });
      navigate(
        `/user/indexManagement/detail/${evaluationItemId}/${year}/${month}/${day}`
      );
    } else {
      console.error("Missing parameters:", {
        evaluationItemId,
        year,
        month,
        day,
      });
    }
  };

  return (
    <table className="customTable">
      <thead>
        <tr>
          <th>지표 구분</th>
          <th>자동 계산 여부</th>
          <th>지표 측정일</th>
          <th>평가 점수</th>
          <th>평가 등급</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {indicatorList.map((item, index) => (
          <tr
            key={item.evaluationItemId}
            className={index % 2 === 0 ? "highlightedRow" : ""}
          >
            <td>{item.category}</td>
            <td>{item.auto ? "자동계산" : "수동계산"}</td>
            <td>{item.date}</td>
            <td>{item.score}%</td>
            <td>{item.grade}</td>
            <td>
              <a
                href="#"
                onClick={() =>
                  handleDetailClick(
                    item.evaluationItemId,
                    item.date.split("-")[0],
                    item.date.split("-")[1],
                    item.date.split("-")[2]
                  )
                }
              >
                자세히 보기 &gt;
              </a>
            </td>
          </tr>
        ))}
        {indicatorList.length > 0 && (
          <tr>
            <td></td>
            <td>전체</td>
            <td colSpan="2"></td>
            <td>{indicatorEtcInfo.grade}</td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BottomTable;
