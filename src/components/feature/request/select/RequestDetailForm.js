import React from "react";
import RequestDetailInfoForm from "./RequestDetailInfoForm";
import RequestContentForm from "../RequestContentForm";
import { deleteRequest } from "../../../../service/api/userService";

const RequestDetailForm = ({ requestData, currentUser }) => {
  if (!requestData) {
    return <div>Loading...</div>;
  }

  currentUser = "a"; //로그인 된 유저 정보로 변경하기

  const canDelete =
    requestData.requester === currentUser && requestData.status !== "진행중";

  const handleDelete = async () => {
    try {
      await deleteRequest(requestData.requestId);
      //모달 창 띄우기
    } catch (error) {
      alert("요청 삭제 실패");
    }
  };

  return (
    <div>
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
        canDelete={canDelete}
        onDelete={handleDelete}
      />
      <RequestContentForm
        formState={{ title: requestData.title, content: requestData.content }}
        isEditable={false}
      />
    </div>
  );
};

export default RequestDetailForm;
