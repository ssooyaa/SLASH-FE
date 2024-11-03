import React from "react";
import { useNavigate } from "react-router-dom";

const ContractListTable = ({ initialData = [] }) => {
  const data = initialData;
  const navigator = useNavigate();

  const handleDetail = (contractId) => {
    navigator(`/contractManager/contract/${contractId}`);
  };

  const handleEdit = (contractId) => {
    navigator(`/contractManager/updateContract/${contractId}`);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>회사명</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.companyName}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
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
