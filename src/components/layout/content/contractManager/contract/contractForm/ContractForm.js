import React, { useState, useRef } from "react";
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

  const navigator = useNavigate();

  const handleChangeFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  // 날짜 형식 변경 함수 (YYYY년 MM월 DD일)
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleDateChange = (date, field) => {
    const updatedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    handleChangeFormData(field, updatedDate);
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
                    <DatePicker
                      selected={formData.startDate}
                      onChange={(date) => handleDateChange(date, "startDate")} // 필드 이름 전달
                      minDate={new Date()}
                      customInput={
                        <div className="datePickerContainer">
                          <input
                            type="text"
                            className="companyData"
                            name="startDate"
                            placeholder="DD/MM/YYYY"
                            value={formatDate(formData.startDate)} // 날짜 형식 변경
                            readOnly
                          />
                          <MdCalendarMonth className="contractCalendarIcon" />
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="contractDateSelect">
                  <label className="companyNameLabel">계약종료일</label>
                  <div className="selectDate">
                    <DatePicker
                      selected={formData.endDate}
                      minDate={
                        formData.startDate
                          ? new Date(formData.startDate.getTime() + 86400000)
                          : new Date()
                      } // startDate 다음 날부터 선택 가능
                      onChange={(date) => handleDateChange(date, "endDate")}
                      customInput={
                        <div className="datePickerContainer">
                          <input
                            type="text"
                            className="companyData"
                            name="endDate"
                            placeholder="DD/MM/YYYY"
                            value={formatDate(formData.endDate)}
                            readOnly
                          />
                          <MdCalendarMonth className="contractCalendarIcon" />
                        </div>
                      }
                    />
                  </div>
                </div>
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
