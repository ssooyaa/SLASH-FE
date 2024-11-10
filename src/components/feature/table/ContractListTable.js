import React from "react";
import { useNavigate } from "react-router-dom";

const ContractListTable = ({ initialData = [] }) => {
  const data = initialData;

  const navigator = useNavigate();

  const handleDetail = (contractId) => {
    navigator(`/contractManager/contract/${contractId}`);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>협약서</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>만료여부</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.companyName}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>{item.terminate}</td>
              <td>
                <button onClick={() => handleDetail(item.contractId)}>
                  상세보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContractListTable;
