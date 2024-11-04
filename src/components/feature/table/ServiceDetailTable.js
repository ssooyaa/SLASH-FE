import React from "react";

const ServiceDetailTable = ({ initialData }) => {
  const data = initialData || {};

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
              <p>{data.purpose}</p>
            </td>
            <td>
              <p>{data.formula}</p>
            </td>
            <td>
              <p>{data.weight}</p>
            </td>
            <td>
              <p>{data.period}</p>
            </td>
            <td>
              <p>{data.unit}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ServiceDetailTable;
