import React, { useEffect, useState } from "react";
import "./ContractListForm.css";
import { fetchAllContractInfo } from "../../../../../../api/UserService";
import ContractListTable from "../../../../../feature/table/ContractListTable";

const ContractListForm = () => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await fetchAllContractInfo();
      console.log(response);
      setFormData(response);
    };
    loadData();
  }, []);
  return (
    <>
      <div className="contractListForm">
        <div className="contractListInfo">
          <div className="ContractTitle">
            <p>계약 현황 조회</p>
          </div>
          <div className="table contractListTable">
            <ContractListTable initialData={formData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractListForm;
