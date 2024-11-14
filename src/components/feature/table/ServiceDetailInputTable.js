import React, { useState, useEffect } from "react";
import "./ServiceDetailInputTable.css";

const ServiceDetailInputTable = ({ initialData = {}, handleData }) => {
  const [formData, setFormData] = useState({
    purpose: initialData.purpose || "",
    weight: initialData.weight || 0,
    period: initialData.period || "월별",
    formula: initialData.formula || "",
    unit: initialData.unit || "율(%)",
  });

  const [contractId, setContractId] = useState(initialData.contractId);

  useEffect(() => {
    // contractId가 변경될 때만 실행
    if (contractId !== initialData.contractId) {
      setContractId(initialData.contractId); // contractId 업데이트
    }
  }, [initialData.contractId]); // contractId가 변경될 때만 실행

  useEffect(() => {
    // initialData가 변경될 때 formData를 업데이트
    setFormData({
      purpose: initialData.purpose || "",
      weight: initialData.weight || 0,
      period: initialData.period || "월별",
      formula: initialData.formula || "",
      unit: initialData.unit || "율(%)",
    });
  }, [contractId]); // initialData가 변경될 때마다 실행

  const handleChangeData = (field, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [field]: value,
      };
      handleData(field, value);
      return updatedData;
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>항목</th>
            <th colSpan={5}>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>가중치</td>
            <td>
              <input
                type="number"
                className="fullInput weight"
                value={formData.weight}
                onChange={(e) =>
                  handleChangeData("weight", Number(e.target.value))
                }
              />
            </td>
            <td>측정주기</td>
            <td>
              <select
                name="period"
                className="select"
                value={formData.period}
                onChange={(e) => handleChangeData("period", e.target.value)}
              >
                <option value="월별">월별</option>
                <option value="분기별">분기별</option>
                <option value="연도별">연도별</option>
              </select>
            </td>
            <td>측정 단위</td>
            <td>
              <select
                name="unit"
                className="select"
                value={formData.unit}
                onChange={(e) => handleChangeData("unit", e.target.value)}
              >
                <option value="율(%)">율(%)</option>
                <option value="건">건수</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>목적</td>
            <td colSpan={5}>
              <input
                type="text"
                className="fullInput"
                value={formData.purpose}
                onChange={(e) => handleChangeData("purpose", e.target.value)}
              />
            </td>
          </tr>
          <tr className="formulaRow">
            <td>산출식</td>
            <td colSpan={5}>
              <textarea
                type="text"
                className="fullInput"
                value={formData.formula}
                onChange={(e) => handleChangeData("formula", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ServiceDetailInputTable;
