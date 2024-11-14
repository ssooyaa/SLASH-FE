import React from "react";
import RequestLabel from "../../../labels/request/RequestLabel";
import ProcessStatusLabel from "../../../labels/processStatus/ProcessStatusLabel";
import DueOnTimeLabel from "../../../labels/request/DueOneTimeLabel";
import "../select/RequestDetailInfoForm.css";

const RequestDetailInfoForm = ({
  taskType,
  status,
  dueOnTime,
  equipmentName,
  taskDetail,
  requester,
  manager,
  requestTime,
  endTime,
  canDelete,
  canComplete,
  canEdit,
  onDelete,
  onEdit,
  onComplete,
}) => {
  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  return (
    <div>
      <div className="requestStatusInfo">
        <h3>요청 내역</h3>
        <RequestLabel requestType={taskType} />
        <ProcessStatusLabel processType={status} />
        <DueOnTimeLabel dueOnTime={dueOnTime} />
        {canEdit && (
          <button className="editButton" onClick={onEdit}>
            수정하기
          </button>
        )}
        {canDelete && (
          <button className="deleteButton" onClick={onDelete}>
            삭제하기
          </button>
        )}
        {canComplete && (
          <button className="completeButton" onClick={onComplete}>
            요청완료 처리
          </button>
        )}
      </div>

      <div className="requestDetailInfoBox">
        <div className="requestHeader">
          <h3>요청 정보</h3>
        </div>

        <table className="requestDetailTable">
          <tbody>
            <tr>
              <td>{renderLabel("장비 유형")}</td>
              <td>{equipmentName}</td>
              <td>{renderLabel("업무 유형")}</td>
              <td>{taskDetail}</td>
            </tr>
            <tr>
              <td>{renderLabel("요청자")}</td>
              <td>{requester}</td>
              <td>{renderLabel("담당자")}</td>
              <td>{manager}</td>
            </tr>
            <tr>
              <td>{renderLabel("요청 일시")}</td>
              <td>{requestTime}</td>
              <td>{renderLabel("마감 일시")}</td>
              <td>{endTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestDetailInfoForm;
