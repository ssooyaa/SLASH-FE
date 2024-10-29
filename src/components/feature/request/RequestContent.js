import React from "react";

const RequestContent = ({ formState, updateFormState }) => {
  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  return (
    <div className="requestInfoBox">
      <h3>요청 내용</h3>
      <table className="requestTable">
        <tbody>
          <tr>
            <td>{renderLabel("제목")}</td>
            <td>
              <input
                type="text"
                placeholder="제목을 입력하세요 최대(50글자)"
                value={formState.title}
                onChange={(e) => updateFormState("title", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <textarea
        className="requestContent"
        placeholder="내용을 입력하세요"
        rows="5"
        value={formState.content}
        onChange={(e) => updateFormState("content", e.target.value)}
      />
    </div>
  );
};

export default RequestContent;
