// import React from "react";
// import Dropdown from "./RequestDropdown";
// import CheckBox from "../../common/CheckBox";
// import "../request/CreateRequestForm.css";

// const CreateRequestForm = ({
//   formState,
//   updateFormState,
//   taskTypes,
//   systemTypes,
//   equipmentOptions,
//   taskDetailOptions,
//   handleSystemChange,
//   handleEquipmentChange,
//   toggleModal,
//   onSubmit,
// }) => {
//   const renderLabel = (label) => (
//     <label>
//       <span className="required">*</span> {label}
//     </label>
//   );

//   const renderDropdown = (label, items, selectedItem, onSelect) => (
//     <Dropdown
//       items={items}
//       label={selectedItem || `${label}`}
//       onSelect={onSelect}
//     />
//   );

//   return (
//     <div className="modalOverlay">
//       <div className="modalContent">
//         <button className="closeButton" onClick={toggleModal}>
//           &times;
//         </button>
//         <div className="modalHeader">
//           <h3>요청 등록</h3>
//           {renderDropdown("요청 유형", taskTypes, formState.taskType, (value) =>
//             updateFormState("taskType", value)
//           )}
//         </div>

//         <form onSubmit={onSubmit}>
//           <div className="requestInfoBox">
//             <div className="requestHeader">
//               <h3>요청 정보</h3>
//               {formState.taskType === "장애 요청" && (
//                 <CheckBox
//                   id="serviceRelevanceCheckbox"
//                   label="서비스 제공 여부"
//                   checked={formState.isServiceRelevance}
//                   onChange={(checked) =>
//                     updateFormState("isServiceRelevance", checked)
//                   }
//                 />
//               )}
//             </div>

//             <table className="requestTable">
//               <tbody>
//                 <tr>
//                   <td>{renderLabel("시스템 유형")}</td>
//                   <td>
//                     {renderDropdown(
//                       "시스템",
//                       systemTypes,
//                       formState.selectedSystem,
//                       handleSystemChange
//                     )}
//                   </td>
//                   <td>{renderLabel("장비 유형")}</td>
//                   <td>
//                     {renderDropdown(
//                       "장비",
//                       equipmentOptions,
//                       formState.selectedEquipment,
//                       handleEquipmentChange
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <table className="requestTable">
//               <tbody>
//                 <tr>
//                   <td>{renderLabel("업무유형")}</td>
//                   <td>
//                     {renderDropdown(
//                       "업무",
//                       taskDetailOptions,
//                       formState.taskDetail,
//                       (value) => updateFormState("taskDetail", value)
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="requestInfoBox">
//             <h3>요청 내용</h3>
//             <table className="requestTable">
//               <tbody>
//                 <tr>
//                   <td>{renderLabel("제목")}</td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="제목을 입력하세요 최대(50글자)"
//                       value={formState.title}
//                       onChange={(e) => updateFormState("title", e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <textarea
//               className="requestContent"
//               placeholder="내용을 입력하세요"
//               rows="5"
//               value={formState.content}
//               onChange={(e) => updateFormState("content", e.target.value)}
//             />
//           </div>

//           <div className="formFooter">
//             <button type="submit">저장</button>
//             <button type="button" onClick={toggleModal}>
//               취소
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateRequestForm;
import React from "react";
import RequestInfo from "./requestInfo";
import Dropdown from "./RequestDropdown";
import RequestContent from "./RequestContent";
import "../request/CreateRequestForm.css";

const CreateRequestForm = ({
  formState,
  updateFormState,
  taskTypes,
  systemTypes,
  equipmentOptions,
  taskDetailOptions,
  handleSystemChange,
  handleEquipmentChange,
  toggleModal,
  onSubmit,
}) => {
  const renderDropdown = (label, items, selectedItem, onSelect) => (
    <Dropdown
      items={items}
      label={selectedItem || `${label}`}
      onSelect={onSelect}
    />
  );

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={toggleModal}>
          &times;
        </button>
        <div className="modalHeader">
          <h3>요청 등록</h3>
          {renderDropdown("요청 유형", taskTypes, formState.taskType, (value) =>
            updateFormState("taskType", value)
          )}
        </div>

        <form onSubmit={onSubmit}>
          <RequestInfo
            formState={formState}
            updateFormState={updateFormState}
            taskTypes={taskTypes}
            systemTypes={systemTypes}
            equipmentOptions={equipmentOptions}
            taskDetailOptions={taskDetailOptions}
            handleSystemChange={handleSystemChange}
            handleEquipmentChange={handleEquipmentChange}
          />
          <RequestContent
            formState={formState}
            updateFormState={updateFormState}
          />
          <div className="formFooter">
            <button type="submit">저장</button>
            <button type="button" onClick={toggleModal}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestForm;
