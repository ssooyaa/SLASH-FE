import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BottomTable.css";
import { fetchIndicators } from "../../../../../api/CommonService";

const BottomTable = ({ agreementId, date }) => {
  const [indicatorList, setIndicatorList] = useState([]);
  const [indicatorEtcInfo, setIndicatorEtcInfo] = useState({
    grade: "-",
    requestCount: 0,
    incidentTime: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (agreementId && date) {
        try {
          const response = await fetchIndicators(agreementId, date);
          if (response && response.success) {
            setIndicatorEtcInfo(response.data.indicatorEtcInfo || {});
            setIndicatorList(response.data.indicatorList || []);
          } else {
            setIndicatorEtcInfo({
              grade: "-",
              requestCount: 0,
              incidentTime: 0,
            });
            setIndicatorList([]);
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
          setIndicatorEtcInfo({ grade: "-", requestCount: 0, incidentTime: 0 });
          setIndicatorList([]);
        }
      }
    };
    fetchData();
  }, [agreementId, date]);

  const handleDetailClick = (evaluationItemId, date) => {
    if (evaluationItemId && date) {
      navigate(`/user/indexManagement/detail/${evaluationItemId}/${date}`);
    } else {
      console.error("Missing parameters:", { evaluationItemId, date });
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
        {indicatorList.length > 0 ? (
          indicatorList.map((item, index) => (
            <tr
              key={item.evaluationItemId}
              className={index % 2 === 0 ? "highlightedRow" : ""}
            >
              <td>{item.category}</td>
              <td>{item.auto ? "자동계산" : "수동계산"}</td>
              <td>{item.date}</td>
              <td>{item.score}%</td>
              <td>{item.grade}등급</td>
              <td>
                <a
                  href="#"
                  onClick={() =>
                    handleDetailClick(item.evaluationItemId, item.date)
                  }
                >
                  자세히 보기 &gt;
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
              해당 월 지표에 대한 통계값이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
      {indicatorList.length > 0 && (
        <tfoot className="bFoot">
          <tr>
            <td>전체</td>
            <td></td>
            <td colSpan="2"></td>
            <td>{indicatorEtcInfo.grade}등급</td>
            <td></td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default BottomTable;
