import React, { useState, useEffect } from "react";
import "./UpdateContractForm.css";
import "react-datepicker/dist/react-datepicker.css";
import { fetchContractInfo } from "../../../../../../api/CommonService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoScoreGradeInputTable from "../../../../../feature/table/NoScoreGradeInputTable";
import {
  fetchModifyIsPossible,
  createTotalTarget,
  updateTotalTarget,
} from "../../../../../../api/ContractManagerService";

const UpdateContractForm = () => {
  const { contractId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    startDate: null,
    endDate: null,
    totalTargets: [],
  });

  const [totalTargets, setTotalTargets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchContractInfo(contractId);
      console.log(response);
      setFormData(response);
      setTotalTargets(response.totalTargets);
    };
    loadData();
  }, [contractId]);

  const handleTotalTargets = (value) => {
    setTotalTargets(value);
    console.log(value);
  };

  const handleRedirect = () => {
    alert("변경되지 않고 돌아갑니다.");
    navigate(-1);
  };

  const isValid = () => {
    if (totalTargets.length === 0) {
      alert("평가 점수를 입력해 주세요");
      return false;
    }
    return true;
  };

  // 조회 버튼 클릭 시 계약 정보 로드
  const submit = async (e) => {
    e.preventDefault();
    const updateData = totalTargets.filter((target) => target.grade !== "");

    setTotalTargets(updateData);

    if (!isValid()) {
      return; //미입력값 있을 시 제출 불가
    }

    if (contractId) {
      const isModify = await fetchModifyIsPossible(contractId);
      if (isModify) {
        try {
          const updateTotalTargets = await updateTotalTarget(
            contractId,
            updateData
          );
          console.log(updateTotalTargets);
          if (updateTotalTargets) {
            alert("수정 완료");
            navigate("/contractManager/contractList");
          } else {
          }
        } catch (error) {
          alert("수정 실패");
          console.log("수정 실패: ", error);
        }
      } else {
        try {
          const postTotalTarget = await createTotalTarget(
            contractId,
            updateData
          );
          if (postTotalTarget) {
            alert("수정 완료");
            navigate("/contractManager/contractList");
          }
        } catch (error) {
          alert("수정 실패");
          console.log("수정 실패: ", error);
        }
      }
    }
  };

  return (
    <>
      <div className="contractTemplate">
        <div className="contractForm">
          <div className="contractInfo">
            <div className="contractInfoDetail">
              <div className="contractTitle infoTitle">
                <p>{formData.contractName}</p>
              </div>
              <div className="contractDate">
                <p className="companyNameLabel">
                  계약시작일 : {formData.startDate}
                </p>
                <p className="companyNameLabel">
                  계약종료일 : {formData.endDate}
                </p>
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

export default UpdateContractForm;
