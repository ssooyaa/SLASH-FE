import React, { useEffect, useState } from "react";

import "./RequestDetailBottom.css";
import AssignmentButton from "../../../../../common/button/AssignmentButton";
import { useParams } from "react-router-dom";
import Modal from "../../../../../feature/modal/Modal";
import RequestDetail from "../../../../../feature/request/select/RequestDetail";
import {assignTaskManager, getManagerTaskStatus} from "../../../../../../api/RequestManagerService";

const RequestDetailBottom = () => {
  const { requestId } = useParams(); // URL에서 requestId 가져오기
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false); // 할당 여부 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 데이터 요청 전 로딩 상태 설정
        const response = await getManagerTaskStatus(requestId); // requestId 사용
        console.log("초기 데이터:", response.data);
        setResult(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false); // 데이터 요청 후 로딩 상태 해제
      }
    };

    fetchData(); // 데이터 요청
  }, [requestId]); // requestId가 변경될 때마다 데이터 요청

  const handleAssign = async (managerId) => {
    try {
      const dto = { requestId, managerId }; // DTO 객체 생성
      const response = await assignTaskManager(dto); // 서버에 요청 보내기
      console.log(dto);
      console.log(JSON.stringify(response, null, 2));

      if (response.success) {
        // 성공 여부 확인
        setIsAssigned(true); // 성공 시 컴포넌트 숨기기
        setModalOpen(true); // 서버 요청이 성공하면 모달 열기
      }
    } catch (error) {
      console.error("할당하는 중 오류가 발생했습니다:", error);
      alert("할당 실패!");
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="requestBox">
        <RequestDetail requestId={requestId} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="담당자 할당 성공"
      />
      {!isAssigned && ( // 할당 여부 체크
        <div className="rdBox">
          <h3>업무 현황</h3>
          <table className="tb">
            <thead className="thd">
              <tr>
                <th>이름</th>
                <th>할당 건수</th>
                <th>미처리 건수</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tbd">
              {loading ? ( // 로딩 상태 체크
                <tr className="loadingRow">
                  <td className="tData">Loading...</td>
                  <td className="tData">Loading...</td>
                  <td className="tData">Loading...</td>
                  <td className="tData">Loading...</td>
                </tr>
              ) : result && result.length > 0 ? (
                result.map((item) => (
                  <tr key={item.managerId}>
                    <td className="tData">{item.managerName}</td>
                    <td className="tData">{item.totalCount}건</td>
                    <td className="tData">{item.inProgressCount}건</td>
                    <td className="tData">
                      <AssignmentButton
                        onClick={() => handleAssign(item.managerId)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestDetailBottom;
