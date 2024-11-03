import React, { useState, useEffect } from "react";
import "./ServiceDetailInputTable.css";

const ServiceDetailInputTable = ({ initialData, handleData }) => {
  const [formData, setFormData] = useState({
    purpose: initialData.purpose || "",
    weight: initialData.weight || 0,
    period: initialData.period || "월별",
    formula: initialData.formula || "",
    unit: initialData.unit || "율(%)",
  });

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
            <th>평가 지표 내용</th>
            <th>측정 방법</th>
            <th>평가 지표 가중치</th>
            <th>측정 주기</th>
            <th>측정 단위</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="fullInput"
                value={formData.purpose}
                onChange={(e) => handleChangeData("purpose", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="fullInput"
                value={formData.formula}
                onChange={(e) => handleChangeData("formula", e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="fullInput weight"
                value={formData.weight}
                onChange={(e) => handleChangeData("weight", e.target.value)}
              />
            </td>
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
            <td>
              <select
                name="unit"
                className="select"
                value={formData.unit}
                onChange={(e) => handleChangeData("unit", e.target.value)}
              >
                <option value="율(%)">율(%)</option>
                <option value="건">건</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ServiceDetailInputTable;
