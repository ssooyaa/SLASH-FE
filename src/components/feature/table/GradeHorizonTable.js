import React from "react";

const GradeHorizonTable = ({ initialData }) => {
  const data = initialData ? initialData : [{ min: 1 }, { min: 2 }];

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>점수 평가</th>
            {data.map((item, index) => (
              <th key={index}>
                {item.min}
                {item.minInclusive ? "이상" : "초과"} ~ {item.max}
                {item.maxInclusive ? "이하" : "미만"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>평가 등급</td>
            {data.map((item, index) => (
              <td key={index}>{item.grade}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GradeHorizonTable;
