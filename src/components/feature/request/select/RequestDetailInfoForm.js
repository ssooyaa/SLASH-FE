import React from "react";
import "../select/RequestDetailInfoForm.css";

const RequestDetailInfoForm = ({
  equipmentName,
  taskDetail,
  requester,
  manager,
  requestTime,
  endTime,
}) => {
  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  return (
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
  );
};

export default RequestDetailInfoForm;
