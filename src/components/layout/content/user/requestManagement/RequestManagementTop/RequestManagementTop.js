import React, {useEffect, useState} from "react";
import "./RequestManagementTop.css";
import statics from "../../../../../../assets/images/static.png";
import check from "../../../../../../assets/images/check.png";
import processing from "../../../../../../assets/images/processing.png";
import stamp from "../../../../../../assets/images/stamp.png";
import {fetchRequestStatusByUser} from "../../../../../../api/UserService";

const RequestSelectTop = ({selectedDate, selectedAgreementId}) => {
  const [data, setData] = useState(null);

  const getStatusCount = async (selectedAgreementId, selectedDate) => {
    const dateStr =
      selectedDate && typeof selectedDate === "string"
        ? selectedDate
        : new Date().toISOString().slice(0, 7); // YYYY-MM 형식으로 변환

    const [year, month] = dateStr.split("-"); // "YYYY-MM" 형식에서 연도와 월 분리
    console.log("selectedAgreementId", selectedAgreementId);
    const contractDataInfo = await fetchRequestStatusByUser(
      year,
      month,
      selectedAgreementId
    );
    return contractDataInfo;
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedDate, selectedAgreementId);
      const statusData = await getStatusCount(selectedAgreementId, selectedDate);
      setData(statusData.data); // API 응답 데이터로 상태 업데이트
      console.log("data", statusData.data);
    };

    fetchData();
  }, [selectedDate, selectedAgreementId]);

  const REGISTERED = data
    ? data.find((item) => item.name === "REGISTERED")?.count ?? 0
    : 0;
  const IN_PROGRESS = data
    ? data.find((item) => item.name === "IN_PROGRESS")?.count ?? 0
    : 0;
  const COMPLETED = data
    ? data.find((item) => item.name === "COMPLETED")?.count ?? 0
    : 0;
  const TOTAL = REGISTERED + IN_PROGRESS + COMPLETED;

  return (
    <div className="rmRow">
      <div className="componentBox" id="statics">
        <div className="rmRow">
          <img src={statics} alt="통계이미지"/>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">{TOTAL}</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="stamp">
        <div className="rmRow">
          <img src={stamp} alt=""/>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">{REGISTERED}</span> 건
            </h3>
            <span>접수 완료</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="processing">
        <div className="rmRow">
          <img src={processing} alt=""/>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">{IN_PROGRESS}</span> 건
            </h3>
            <span>처리 중</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="check">
        <div className="rmRow">
          <img src={check} alt=""/>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">{COMPLETED}</span> 건
            </h3>
            <span>처리 완료</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSelectTop;
