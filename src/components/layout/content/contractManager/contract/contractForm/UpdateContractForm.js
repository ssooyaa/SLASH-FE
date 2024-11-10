import React, { useState, useEffect, useRef } from "react";
import "./UpdateContractForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarMonth } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import GradeInputTable from "../../../../../feature/table/GradeInputTable";
import { useParams } from "react-router-dom";
import ServiceTemplate from "../../service/serviceForm/ServiceTemplate";
import { useNavigate } from "react-router-dom";
import ServiceInfoForm from "../../service/serviceForm/ServiceInfoForm";
import CheckBox from "../../../../../common/CheckBox";
import {
  CreateContract,
  CreateServiceDetail,
} from "../../../../../../api/ContractManagerService";
import { fetchContractInfo } from "../../../../../../api/CommonService";

const UpdateContractForm = () => {
  const { contractId } = useParams();
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

  const [contract, setContract] = useState(null);

  const navigator = useNavigate();

  const [isAgreed, setIsAgreed] = useState(false);

  const [updateEvaluationItemInfos, setUpdateEvaluationItemInfos] = useState(
    []
  );

  useEffect(() => {
    console.log(contractId);
    const loadData = async () => {
      const response = await fetchContractInfo(contractId);
      console.log(response);
      setContract(response);
      setFormData({
        companyName: response.companyName,
        startDate: response.startDate,
        endDate: response.endDate,
        totalTargets: response.totalTargets,
      });
      setTotalTargets(response.totalTargets);
      setUpdateEvaluationItemInfos(response.evaluationItems || []);
    };
    loadData();
  }, [contractId]);

  if (!contract) {
    return <p>로딩중....</p>;
  }

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
    console.log(setEvaluationItems);
  };

  const handleRemoveEvaluationItem = (index) => {
    console.log("Removing item at index:", index);
    setEvaluationItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      console.log("Updated evaluationItems:", updatedItems); // 새로운 배열 로그

      return updatedItems;
    });
  };

  const handleCheckboxChange = (value) => {
    setIsAgreed(value);
  };

  const submit = async (e) => {
    e.preventDefault();
    const updateFormData = { ...formData };
    setFormData(updateFormData);
    const updatedEvaluationItemInfos = [...updateEvaluationItemInfos];
    setUpdateEvaluationItemInfos(updatedEvaluationItemInfos);
    const updateEvaluationItems = [...evaluationItems];
    setEvaluationItems(updateEvaluationItems);
    console.log(updateFormData);
    console.log(updateEvaluationItems);
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
        const editServiceDetail = updateEvaluationItemInfos.map(
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

  const handleRemoveEvaluationItemInfos = (index, evaluationItemId) => {
    console.log(updateEvaluationItemInfos);
    const isConfirmed = window.confirm(
      "삭제 즉시 반영 됩니다. 계속 하시겠습니까?"
    );

    if (isConfirmed) {
      // 삭제 요청 API 구현 후 추가

      // 업데이트된 evaluationItemInfos에서 항목 삭제
      setUpdateEvaluationItemInfos(
        (prevInfos) => prevInfos.filter((_, i) => i !== index) // 삭제된 인덱스를 제외한 새 배열
      );
    } else {
      // 취소 시 아무것도 하지 않음
      console.log("삭제가 취소되었습니다.");
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
                value={formData.startDate ? formData.startDate : ""}
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
                value={formData.endDate ? formData.endDate : ""}
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
              <GradeInputTable
                initialData={totalTargets}
                onDataChange={handleTotalTargets}
              />
            </div>
          </div>
        </div>
        <div className="evaluationItemsInfo">
          <div className="evaluationItemsDetail">
            {updateEvaluationItemInfos.map((item, index) => (
              <div key={item.id} className="evaluationItem inputTableTitle">
                <div className="categoryListTitle">
                  <p>이래 항목의 수정을 원할 시 삭제 후 재 입력 해주세요</p>
                  <button
                    onClick={() =>
                      handleRemoveEvaluationItemInfos(
                        index,
                        item.evaluationItemId
                      )
                    }
                  >
                    삭제하기
                  </button>
                </div>
                <ServiceInfoForm
                  index={index}
                  initialData={item}
                  dataChangeHandle={handleEvaluationItem}
                />
              </div>
            ))}
            {evaluationItems.map((item, index) => (
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
            ))}
          </div>
        </div>
        <div className="addItems" onClick={handleAddEvaluationItem}>
          <p>서비스 평가 항목 추가하기</p>
          <FaPlus />
        </div>
        <div className="agreement">
          <CheckBox
            id="contractAgreeCheckBox"
            label="계약 내용에 동의합니다."
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
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
    </div>
  );
};

export default UpdateContractForm;
