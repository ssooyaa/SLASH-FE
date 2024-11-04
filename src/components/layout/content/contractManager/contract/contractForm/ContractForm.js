import React, { useState, useEffect, useRef } from "react";
import "./ContractForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarMonth } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ServiceTemplate from "../../service/serviceForm/ServiceTemplate";
import CheckBox from "../../../../../common/CheckBox";
import { useNavigate } from "react-router-dom";
import {
  CreateContract,
  CreateServiceDetail,
} from "../../../../../../api/UserService";
import NoScoreGradeInputTable from "../../../../../feature/table/NoScoreGradeInputTable";

const ContractForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    startDate: null,
    endDate: null,
    totalTargets: [],
  });

  const [totalTargets, setTotalTargets] = useState([]);

  const [evaluationItems, setEvaluationItems] = useState([]);

  const [showCalendar, setShowCalendar] = useState(false);

  const [currentPicker, setCurrentPicker] = useState(null);

  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const calendarRef = useRef(null);

  const [isAgreed, setIsAgreed] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    console.log("Updated evaluationItems:", evaluationItems);
  }, [evaluationItems]);

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

  const handleAddEvaluationItem = () => {
    setEvaluationItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length, // 고유 ID를 생성하기 위해 현재 길이를 사용
        category: "",
        weight: 0,
        period: "월별",
        purpose: "",
        formula: "",
        unit: "율(%)",
        serviceTargets: [],
        taskTypes: [],
      },
    ]);
  };

  const handleRedirect = () => {
    //계약 리스트페이지 작성 후 추가 예정
    navigator(-1);
  };

  const handleEvaluationItem = (index, value) => {
    setEvaluationItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        ...value,
      };
      return updatedItems;
    });
  };

  const handleRemoveEvaluationItem = (index) => {
    setEvaluationItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      return updatedItems;
    });
  };

  const handleCheckboxChange = (value) => {
    setIsAgreed(value);
  };

  const isValid = () => {
    if (formData.companyName === "") {
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

    if (evaluationItems.length === 0) {
      alert("평가 서비스를 입력해 주세요 ");
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      return; //미입력값 있을 시 제출 불가
    }

    if (!isAgreed) {
      alert("계약 사항에 동의해 주세요");
      return;
    }

    const updateFormData = { ...formData };
    setFormData(updateFormData);
    const updateEvaluationItems = [...evaluationItems];
    setEvaluationItems(updateEvaluationItems);
    if (!isAgreed) {
      alert("계약 사항에 동의해 주세요");
      return;
    }

    try {
      const response = await CreateContract(updateFormData);
      if (response) {
        console.log(response);
        const serviceDetailsPromises = updateEvaluationItems.map(
          async (item) => {
            const updatedItem = {
              ...item,
              contractId: response,
            };

            return await CreateServiceDetail(updatedItem);
          }
        );

        await Promise.all(serviceDetailsPromises);

        console.log("모든 서비스 세부 사항이 성공적으로 생성되었습니다.");
        navigator(`/contractManager/contract/${response}`);
      }
    } catch (error) {
      alert("저장 실패");
      console.log("생성 실패: ", error);
    }
  };

  return (
    <div className="contractTemplate">
      <div className="contractForm">
        <div className="contractInfo">
          <div className="contractTitle">
            <p>SLA 협약서</p>
          </div>
          <div className="companyInfo inputTableTitle">
            <p className="companyNameLabel">
              회사이름
              <input
                className="companyData"
                type="text"
                name="companyName"
                placeholder="회사 이름"
                value={formData.companyName || ""}
                onChange={(e) =>
                  handleChangeFormData(e.target.name, e.target.value)
                }
                required
              />
            </p>

            <p className="companyNameLabel">
              계약시작일
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
            </p>

            <p className="companyNameLabel">
              계약종료일
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
            </p>
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
        <div className="evaluationItemsInfo">
          <div className="evaluationItemsDetail">
            {evaluationItems.length === 0 ? (
              <div className="addItems" onClick={handleAddEvaluationItem}>
                <p>서비스 평가 항목 추가하기</p>
                <FaPlus />
              </div>
            ) : (
              evaluationItems.map((item, index) => (
                <div key={item.id} className="evaluationItem">
                  <div className="categoryTitle">
                    <p>서비스 평가항목</p>
                    <button onClick={() => handleRemoveEvaluationItem(index)}>
                      삭제하기
                    </button>
                  </div>
                  <ServiceTemplate
                    index={index}
                    initialData={item}
                    dataChangeHandle={handleEvaluationItem}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        {evaluationItems.length === 0 ? null : (
          <div className="addItems" onClick={handleAddEvaluationItem}>
            <p>서비스 평가 항목 추가하기</p>
            <FaPlus />
          </div>
        )}
        <div className="agreement">
          <CheckBox
            id="contractAgreeCheckBox"
            label="계약 내용에 동의합니다."
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="serviceFormButton">
          <button className="grayButton" onClick={handleRedirect}>
            닫기
          </button>
          <button className="blackButton" onClick={(e) => submit(e)}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
