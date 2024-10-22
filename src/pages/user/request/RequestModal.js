import React, { useState } from "react";
import Dropdown from "../../../components/RequestDropdown";
import "../request/RequestModal.css";

const CreateRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const requestTypes = ["서비스 요청", "장애 요청"];
  const equipmentTypes = ["DB1", "DB2"];
  const taskTypes = ["업무 지원", "장애 예방", "단순 장애"];

  return (
    <div>
      <h1>Request Manager Page</h1>
      <button onClick={openModal}>요청 등록</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-header">
              <h3>요청 등록</h3>
              <Dropdown
                items={requestTypes}
                label="서비스 요청"
                className="custom-rounded"
              />
            </div>
            <form>
              <div className="request-info-box">
                <h3>요청 정보</h3>
                <table className="request-table">
                  <tbody>
                    <tr>
                      <td>
                        <label>
                          <span className="required">*</span> 장비유형
                        </label>
                      </td>
                      <td>
                        <Dropdown items={equipmentTypes} label="DB" />
                      </td>
                      <td>
                        <label>
                          <span className="required">*</span> 업무유형
                        </label>
                      </td>
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
                      <td>
                        <label>
                          <span className="required">*</span> 제목
                        </label>
                      </td>
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
                <button type="button" onClick={closeModal}>
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
