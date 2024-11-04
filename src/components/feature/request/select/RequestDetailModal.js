import React from "react";
import RequestDetail from "./RequestDetail";
import "../../request/RequestModal.css";

const ShowRequestDetailModal = ({ toggleModal, requestId }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={toggleModal}>
          &times;
        </button>
        <RequestDetail requestId={requestId} onClose={toggleModal} />
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
