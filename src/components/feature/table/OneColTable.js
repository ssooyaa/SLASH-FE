import React from "react";
import "./OneColTable.css";

const OneColTable = ({ label, data }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{label}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <p className="tableTdText">{item}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OneColTable;
