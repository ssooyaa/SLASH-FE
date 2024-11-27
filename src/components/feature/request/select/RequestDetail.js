import React, { useEffect, useState } from "react";
import RequestDetailForm from "./RequestDetailForm";
import { showRequestDetail } from "../../../../service/api/userService";

const RequestDetail = ({ requestId, onClose }) => {
  const [requestData, setRequestData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.auth;

  useEffect(() => {
    console.log("데이터:", role);
    const fetchRequestDetail = async () => {
      const response = await showRequestDetail(requestId);
      if (response.success) {
        setRequestData(response.data);
      }
    };

    fetchRequestDetail();
  }, [requestId]);

  return (
    <RequestDetailForm
      requestData={requestData}
      currentUser={role}
      onClose={onClose}
    />
  );
};

export default RequestDetail;
