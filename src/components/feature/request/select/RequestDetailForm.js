import React, { useState } from "react";
import RequestDetailInfoForm from "./RequestDetailInfoForm";
import RequestContentForm from "../RequestContentForm";
import EditRequestForm from "../EditRequestForm";
import { deleteRequest } from "../../../../service/api/userService";

const RequestDetailForm = ({ requestData, currentUser, onClose }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  if (!requestData) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleDelete = async () => {
    try {
      await deleteRequest(requestData.requestId);
      alert("삭제되었습니다.");
      onClose();
    } catch (error) {
      console.log(error);
      alert("삭제 실패");
    }
  };

  return (
    <div className="modal-content">
      {isEditMode ? (
        <EditRequestForm
          requestData={requestData}
          onCancel={handleCancelEdit}
          onSave={() => {
            setIsEditMode(false);
            onClose();
          }}
          toggleModal={handleCancelEdit}
        />
      ) : (
        <>
          <RequestDetailInfoForm
            taskType={requestData.taskType}
            status={requestData.status}
            dueOnTime={requestData.dueOnTime}
            equipmentName={requestData.equipmentName}
            taskDetail={requestData.taskDetail}
            requester={requestData.requester}
            manager={requestData.manager}
            requestTime={requestData.requestTime}
            endTime={requestData.endTime}
            canDelete={
              requestData.requester === "a" && requestData.status !== "진행중"
            }
            canEdit={
              requestData.requester === "a" && requestData.status === "접수완료"
            }
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <RequestContentForm
            formState={{
              title: requestData.title,
              content: requestData.content,
            }}
            isEditable={false}
          />
        </>
      )}
    </div>
  );
};

export default RequestDetailForm;
