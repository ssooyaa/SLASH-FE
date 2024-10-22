import React, { useState, useCallback } from "react";
import Dropdown from "../../../components/RequestDropdown";
import CheckBox from "../../../components/CheckBox";
import "../request/RequestModal.css";

const CreateRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState("서비스 요청");
  const [isServiceRelevance, setIsServiceRelevance] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  const requestTypes = ["서비스 요청", "장애 요청"];
  const equipmentTypes = ["DB1", "DB2"];
  const taskTypes = ["업무 지원", "장애 예방", "단순 장애"];

  const handleRequestTypeChange = (value) => {
    setSelectedRequestType(value);
  };

  const handleCheckboxChange = (checked) => {
    setIsServiceRelevance(checked);
  };

  return (
    <div>
      <button onClick={toggleModal}>요청 등록</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>
            <div className="modal-header">
              <h3>요청 등록</h3>
              <Dropdown
                items={requestTypes}
                label={selectedRequestType}
                onSelect={handleRequestTypeChange}
              />
            </div>

            <form>
              <div className="request-info-box">
                <div className="request-header">
                  <h3>요청 정보</h3>
                  {/* "장애 요청"일 경우 체크박스 추가 */}
                  {selectedRequestType === "장애 요청" && (
                    <CheckBox
                      id="serviceRelevanceCheckbox"
                      label="서비스 제공 여부"
                      checked={isServiceRelevance}
                      onChange={handleCheckboxChange}
                    />
                  )}
                </div>

                <table className="request-table">
                  <tbody>
                    <tr>
                      <td>{renderLabel("장비유형")}</td>
                      <td>
                        <Dropdown items={equipmentTypes} label="DB" />
                      </td>
                      <td>{renderLabel("업무유형")}</td>
                      <td>
                        <Dropdown items={taskTypes} label="업무 지원" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="request-info-box">
                <h3>요청 내용</h3>
                <table className="request-table">
                  <tbody>
                    <tr>
                      <td>{renderLabel("제목")}</td>
                      <td>
                        <input
                          type="text"
                          placeholder="제목을 입력하세요 최대(50글자)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <textarea
                  className="request-content"
                  placeholder="내용을 입력하세요"
                  rows="5"
                ></textarea>
              </div>

              <div className="form-footer">
                <button type="submit">저장</button>
                <button type="button" onClick={toggleModal}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRequest;
