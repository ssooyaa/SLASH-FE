import React from "react";
import RequestDetailInfoForm from "./RequestDetailInfoForm";
import RequestContentForm from "../RequestContentForm";

const RequestDetailForm = ({ requestData }) => {
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
      />
      <RequestContentForm
        formState={{ title: requestData.title, content: requestData.content }}
        isEditable={false}
      />
    </div>
  );
};

export default RequestDetailForm;
