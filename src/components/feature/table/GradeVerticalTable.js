import React from "react";

const GradeVerticalTable = ({ data }) => {
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
        {data.map((item, index) => {
          const minInclusive = item.minInclusive ? "이상" : "초과";
          const maxInclusive = item.maxInclusive ? "이하" : "미만";

          return (
            <tr key={index}>
              <td>{item.grade}</td>
              <td>
                {item.min}
                {minInclusive}
              </td>
              <td>
                {item.max}
                {maxInclusive}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GradeVerticalTable;
