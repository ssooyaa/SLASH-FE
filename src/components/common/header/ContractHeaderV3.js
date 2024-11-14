import React, { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa6";
import "./ContractHeader.css";
import { fetchAllContractName } from "../../../api/UserService";

const ContractHeaderV3 = ({ onContractSelect }) => {
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [selectedAgreementId, setSelectedAgreementId] = useState(
    localStorage.getItem("selectedAgreementId") || null
  );
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") ||
    (() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      return `${year}-${month}`;
    })
  );

  const [contracts, setContracts] = useState([]);

  const handleAgreementChange = (e) => {
    const id = e.target.value;
    setSelectedAgreementId(id);
    localStorage.setItem("selectedAgreementId", id); // 로컬 스토리지에 저장
    onContractSelect(id, selectedDate); // 콜백 호출
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date); // 로컬 스토리지에 저장
    onContractSelect(selectedAgreementId, date); // 콜백 호출
  };

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
          setContracts(data);
          if (data.length > 0 && !selectedAgreementId) {
            setSelectedAgreement(data[0].contractName);
            setSelectedAgreementId(data[0].contractId);
            localStorage.setItem("selectedAgreementId", data[0].contractId); // 초기 계약 저장
            onContractSelect(data[0].contractId, selectedDate);
          }
        }
      } catch (error) {
        console.error("Failed to fetch contracts: ", error);
      }
    };
    fetchContracts();
  }, [onContractSelect, selectedAgreementId, selectedDate]);

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
      <input
        type="month"
        className="criteria2"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default ContractHeaderV3;
