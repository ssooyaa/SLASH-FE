import React, { useState, useEffect, useRef } from "react";
import "./UpdateContractForm.css";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateContractForm = () => {
  const { contractId } = useParams();
  const [formData, setFormData] = useState({
    companyName: "",
    startDate: null,
    endDate: null,
    totalTargets: [],
  });

  return (
    <div className="contractEditForm">
      <p>수정페이지</p>
    </div>
  );
};

export default UpdateContractForm;
