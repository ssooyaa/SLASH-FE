import React, { useEffect, useState } from "react";
import { FaAsterisk, FaSistrix } from "react-icons/fa6";
import "./ContractHeader.css";
import { fetchAllContractName } from "../../../api/UserService";
import { FaSearch } from "react-icons/fa";
//협약서만 선택하는 버전
const ContractHeader = () => {
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
          console.log(
            "Fetched contract names:",
            data.map((contract) => contract.contractName)
          );
          setContracts(data);
          if (data.length > 0) {
            setSelectedAgreement(data[0].contractName);
            setSelectedAgreementId(data[0].contractId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch contracts: ", error);
      }
    };
    fetchContracts();
  }, []);

  const handleAgreementChange = (e) => {
    const selectedId = e.target.value;
    const selectedName =
      contracts.find(
        (contract) => contract.contractId.toString() === selectedId
      )?.contractName || "";
    setSelectedAgreement(selectedName);
    setSelectedAgreementId(selectedId);
  };

  return (
    <div className="topIndex">
      <FaAsterisk className="star" />
      협약서
      <select
        className="criteria2"
        value={selectedAgreementId || ""}
        onChange={handleAgreementChange}
      >
        {contracts.map((contract) => (
          <option key={contract.contractId} value={contract.contractId}>
            {contract.contractName}
          </option>
        ))}
      </select>
      <button className="queryButton">
        조회
        <FaSearch />
      </button>
    </div>
  );
};

export default ContractHeader;
