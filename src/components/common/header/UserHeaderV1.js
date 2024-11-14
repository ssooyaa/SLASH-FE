import React, { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa6";
import "./ContractHeader.css";
import { fetchAllContractName } from "../../../api/UserService";

const UserHeaderV1 = ({ onContractSelect }) => {
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);

  const [contracts, setContracts] = useState([]);

  // 오늘 날짜로 초기 설정
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // 오늘 날짜를 기본값으로 설정
  });

  const handleAgreementChange = (e) => {
    const id = e.target.value;
    setSelectedAgreementId(id);
    onContractSelect(id, selectedDate);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onContractSelect(selectedAgreementId, date);
  };

  // contracts를 불러오고 나서 초기 선택값 설정
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
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

  // 선택된 협약서 ID와 날짜가 변경될 때마다 onContractSelect 호출
  useEffect(() => {
    if (selectedAgreementId && selectedDate) {
      onContractSelect(selectedAgreementId, selectedDate);
    }
  }, [selectedAgreementId, selectedDate, onContractSelect]);

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
        type="date"
        className="criteria2"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default UserHeaderV1;
