import React from "react";
import RequestDetail from "./RequestDetail";

const ShowRequestDetailModal = ({ toggleModal, requestId }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={toggleModal}>
          &times;
        </button>
        <div className="modalHeader">
          <h3>요청 내역</h3>
        </div>

        <RequestDetail requestId={1} />
        <div className="formFooter">
          <button type="button" onClick={toggleModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowRequestDetailModal;
