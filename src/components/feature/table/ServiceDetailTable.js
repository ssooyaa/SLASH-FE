import React from "react";

const ServiceDetailTable = ({ initialData }) => {
  const data = initialData || {};

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
              <p>{data.weight}</p>
            </td>
            <td>측정주기</td>
            <td>
              <p>{data.period}</p>
            </td>
            <td>측정 단위</td>
            <td>
              <p>{data.unit}</p>
            </td>
          </tr>
          <tr>
            <td>목적</td>
            <td colSpan={5}>
              <p>{data.purpose}</p>
            </td>
          </tr>
          <tr className="formulaRow">
            <td>산출식</td>
            <td colSpan={5}>
              <textarea
                type="text"
                className="fullInput"
                value={data.formula}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ServiceDetailTable;
