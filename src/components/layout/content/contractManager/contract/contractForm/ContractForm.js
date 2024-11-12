import React, { useState, useEffect, useRef } from "react";
import "./ContractForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarMonth } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CreateContract } from "../../../../../../api/ContractManagerService";
import NoScoreGradeInputTable from "../../../../../feature/table/NoScoreGradeInputTable";

const ContractForm = () => {
  const [formData, setFormData] = useState({
    contractName: "",
    startDate: null,
    endDate: null,
    totalTargets: [],
  });

  const [totalTargets, setTotalTargets] = useState([]);

  const [showCalendar, setShowCalendar] = useState(false);

  const [currentPicker, setCurrentPicker] = useState(null);

  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const calendarRef = useRef(null);

  const navigator = useNavigate();

  const handleChangeFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleCalendarClick = (field, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCurrentPicker(field);
    setShowCalendar(true);
    setCalendarPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.right + window.scrollX - 230,
    });
  };

  const handleDateChange = (date) => {
    if (currentPicker === "startDate") {
      handleChangeFormData("startDate", date);
    } else {
      handleChangeFormData("endDate", date);
    }
    setShowCalendar(false);
  };

  const handleTotalTargets = (value) => {
    setTotalTargets(value);
    handleChangeFormData("totalTargets", value);
  };

  const handleRedirect = () => {
    //계약 리스트페이지 작성 후 추가 예정
    navigator(-1);
  };

  const isValid = () => {
    if (formData.contractName === "") {
      alert("회사 이름을 입력해 주세요");
      return false;
    }
    if (formData.startDate === null) {
      alert("계약 시작일을 입력해 주세요");
      return false;
    }

    if (formData.endDate === null) {
      alert("게약 종료일을 입력해 주세요");
      return false;
    }

    if (totalTargets.length === 0) {
      alert("평가 점수를 입력해 주세요");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      return; //미입력값 있을 시 제출 불가
    }

    const filteredTargets = formData.totalTargets.filter(
      (target) => target.grade !== ""
    );

    const updateFormData = {
      ...formData,
      totalTargets: filteredTargets,
    };

    try {
      console.log(updateFormData);
      const response = await CreateContract(updateFormData);
      if (response) {
        navigator("/contractManager/contractList");
      }
    } catch (error) {
      alert("저장 실패");
      console.log("생성 실패: ", error);
    }
  };

  return (
    <>
      <div className="contractTemplate">
        <div className="contractForm">
          <div className="contractInfo">
            <div className="contractInfoDetail">
              <div className="contractTitle">
                <input
                  className="contractTitleInput"
                  type="text"
                  name="contractName"
                  placeholder="협약서 이름을 입력해 주세요"
                  value={formData.contractName || ""}
                  onChange={(e) =>
                    handleChangeFormData(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="contractDate">
                <div className="contractDateSelect">
                  <label className="companyNameLabel">계약시작일</label>
                  <div className="selectDate">
                    <input
                      className="companyData"
                      name="startDate"
                      placeholder="DD/MM/YYYY"
                      value={
                        formData.startDate
                          ? formData.startDate.toLocaleDateString("en-GB")
                          : ""
                      }
                      readOnly
                    />
                    <MdCalendarMonth
                      className="calendarIcon"
                      onClick={(e) => handleCalendarClick("startDate", e)}
                    />
                  </div>
                </div>
                <div className="contractDateSelect">
                  <label className="companyNameLabel">계약종료일</label>
                  <input
                    className="companyData"
                    name="endDate"
                    placeholder="DD/MM/YYYY"
                    value={
                      formData.endDate
                        ? formData.endDate.toLocaleDateString("en-GB")
                        : ""
                    }
                    readOnly
                  />
                  <MdCalendarMonth
                    className="calendarIcon"
                    onClick={(e) => handleCalendarClick("endDate", e)}
                  />
                </div>
                {showCalendar && (
                  <div
                    className="calendarModal"
                    ref={calendarRef}
                    style={{
                      top: `${calendarPosition.top}px`,
                      left: `${calendarPosition.left}px`,
                    }}
                  >
                    <DatePicker
                      selected={
                        currentPicker === "startDate"
                          ? formData.startDate
                          : formData.endDate
                      }
                      onChange={handleDateChange}
                      inline
                      minDate={
                        currentPicker === "startDate"
                          ? new Date()
                          : formData.startDate
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="table totalTable">
              <div className="tableTitle inputTableTitle">
                <p>SLA 평가 등급</p>
                <span>*</span>
              </div>
              <div className="totalInputTable">
                <NoScoreGradeInputTable
                  initialData={totalTargets}
                  onDataChange={handleTotalTargets}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="serviceFormButton">
          <button className="grayButton" onClick={() => handleRedirect()}>
            닫기
          </button>
          <button className="blackButton" onClick={(e) => submit(e)}>
            저장
          </button>
        </div>
      </div>
    </>
  );
};

export default ContractForm;
