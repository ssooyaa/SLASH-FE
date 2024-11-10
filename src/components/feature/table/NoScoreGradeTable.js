import React from "react";

const NoScoreGradeTable = ({ data }) => {
  const initialData = data ? data : [];

  return (
    <table>
      <thead>
        <tr>
          <th>서비스 수준 등급</th>
          <th>최소</th>
          <th>최대</th>
        </tr>
      </thead>
      <tbody>
        {initialData.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.grade}</td>
              <td>
                {item.min}
                {item.minInclusive ? "이상" : "초과"}
              </td>
              <td>
                {item.max}
                {item.maxInclusive ? "이하" : "미만"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NoScoreGradeTable;
