import React, { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa6";
import "./ContractHeader.css";
import { fetchAllContractName } from "../../../api/UserService";
import { FaSearch } from "react-icons/fa";
// 협약서 선택하는 부분만 있는 버전
const ContractHeaderV2 = ({ onContractSelect }) => {
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);

  const [contracts, setContracts] = useState([]);

  const handleAgreementChange = (e) => {
    const id = e.target.value;
    setSelectedAgreementId(id);
  };

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

  return (
    <div className="topIndex">
      <FaAsterisk className="star" />
      협약서
      <select
        className="criteria2"
        value={selectedAgreementId}
        onChange={handleAgreementChange}
      >
        {contracts.map((contract) => (
          <option key={contract.contractId} value={contract.contractId}>
            {contract.contractName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContractHeaderV2;
