import React from "react";
import "../request/RequestContentForm.css";

const RequestContentForm = ({
  formState,
  updateFormState,
  isEditable = true,
}) => {
  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  return (
    <div className="requestContentBox">
      <h3>요청 내용</h3>
      <table className="createRequestTable">
        <tbody>
          <tr>
            <td>{renderLabel("제목")}</td>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="제목을 입력하세요 최대(50글자)"
                  value={formState.title}
                  onChange={(e) => updateFormState("title", e.target.value)}
                />
              ) : (
                <span>{formState.title}</span> // 조회 전용 텍스트
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {isEditable ? (
        <textarea
          className="requestContent"
          placeholder="내용을 입력하세요"
          rows="5"
          value={formState.content}
          onChange={(e) => updateFormState("content", e.target.value)}
        />
      ) : (
        <div className="selectRequestContent">{formState.content}</div> // 조회 전용 텍스트
      )}
    </div>
  );
};

export default RequestContentForm;
