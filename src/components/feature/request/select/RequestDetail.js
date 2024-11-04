import React, { useEffect, useState } from "react";
import RequestDetailForm from "./RequestDetailForm";
import { showRequestDetail } from "../../../../service/api/userService";

const RequestDetail = ({ requestId, onClose }) => {
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const fetchRequestDetail = async () => {
      const response = await showRequestDetail(requestId);
      if (response.success) {
        setRequestData(response.data);
      }
    };

    fetchRequestDetail();
  }, [requestId]);

  return <RequestDetailForm requestData={requestData} onClose={onClose} />;
};

export default RequestDetail;
