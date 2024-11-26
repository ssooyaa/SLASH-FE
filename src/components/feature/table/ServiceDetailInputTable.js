import React, { useState, useEffect } from "react";
import "./ServiceDetailInputTable.css";

const ServiceDetailInputTable = ({ initialData, handleData }) => {
  const handleChangeData = (field, value) => {
    handleData(field, value);
  };

  const numberFormatter = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김

    if (event.target.value !== value) {
      alert("숫자만 입력 가능합니다.");
    }
    // 부모 컴포넌트로 값 전달
    handleData("weight", Number(value));
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
                type="text"
                className="fullInput weight"
                value={initialData.weight || ""}
                onChange={(e) => numberFormatter(e)}
              />
            </td>
            <td>측정주기</td>
            <td>
              <select
                name="period"
                className="select"
                value={initialData.period}
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
                value={initialData.unit}
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
                value={initialData.purpose}
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
                value={initialData.formula}
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
