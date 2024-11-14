import React, { useEffect, useState } from "react";
import { FaAsterisk, FaRegCalendar } from "react-icons/fa6";
import "./ContractHeader.css";
import { fetchAllContractName } from "../../../api/UserService";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./YearHeader.css";

const YearHeader = ({ onContractSelect }) => {
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });

  const handleAgreementChange = (e) => {
    const id = e.target.value;
    setSelectedAgreementId(id);
    onContractSelect(id, selectedDate.getFullYear().toString());
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
    onContractSelect(selectedAgreementId, date.getFullYear().toString());
  };

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
          setContracts(data);
          if (data.length > 0) {
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
        value={selectedAgreementId || ""}
        onChange={handleAgreementChange}
      >
        {contracts.map((contract) => (
          <option key={contract.contractId} value={contract.contractId}>
            {contract.contractName}
          </option>
        ))}
      </select>
      <div className="datePickerContainer">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showYearPicker
          dateFormat="yyyy년"
          customInput={
            <div className="datePickerContainer">
              <input
                type="text"
                className="criteria2"
                value={selectedDate ? format(selectedDate, "yyyy년") : ""}
                readOnly
              />
              <FaRegCalendar className="calendarIcon" />
            </div>
          }
          placeholderText="연도를 선택하세요"
        />
      </div>
    </div>
  );
};

export default YearHeader;
