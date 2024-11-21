import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

const TaskDetailInputTable = ({ initialData, onDataChange }) => {
  const [data, setData] = useState(initialData || []);

  // 데이터행 추가 함수
  const addDataRow = () => {
    const addData = {
      taskDetail: "",
      serviceRelevance: false,
      deadline: "0",
    };
    const updatedData = [...data, addData];
    setData(updatedData);
  };

  const handleData = (index, field, value) => {
    const updateData = [...data];
    updateData[index] = {
      ...updateData[index],
      [field]: value,
    };
    setData(updateData);
    onDataChange(updateData);
  };

  const numberFormatter = (event, index) => {
    // 입력값에서 숫자가 아닌 값을 제거
    let value = event.target.value.replace(/[^0-9]/g, "");

    // 숫자가 아닌 값이 입력되었을 경우 알림
    if (event.target.value !== value) {
      alert("숫자만 입력 가능합니다.");
    }

    // 값이 비어있으면 빈 문자열로 처리
    handleData(index, "deadline", Number(value) || "");
  };

  const [showDeleteMenu, setShowDeleteMenu] = useState(
    Array(data.length).fill(false)
  );

  //삭제 메뉴 토글 함수
  const toggleDeleteMenu = (index) => {
    const updatedShowDeleteMenu = [...showDeleteMenu];
    updatedShowDeleteMenu[index] = !updatedShowDeleteMenu[index];
    setShowDeleteMenu(updatedShowDeleteMenu);
  };

  // 데이터 삭제 함수
  const deleteData = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    onDataChange(updatedData);
    const updatedShowDeleteMenu = showDeleteMenu.filter((_, i) => i !== index);
    setShowDeleteMenu(updatedShowDeleteMenu);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="deleteCol"></th>
            <th>서비스 제공 관련 여부</th>
            <th>업무 유형</th>
            <th>처리 시간</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="deleteCol">
                <CgMenuGridO
                  className="inputDeleteIcon"
                  onClick={() => toggleDeleteMenu(index)}
                />
                {showDeleteMenu[index] && (
                  <button
                    className="deleteTableButton"
                    onClick={() => deleteData(index)}
                  >
                    삭제
                  </button>
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={item.serviceRelevance}
                  onChange={(e) =>
                    handleData(index, "serviceRelevance", e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="fullInput"
                  value={item.taskDetail}
                  onChange={(e) =>
                    handleData(index, "taskDetail", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="fullInput"
                  value={item.deadline}
                  onChange={(e) => numberFormatter(e, index)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="deleteCol"></td>
            <td className="plusRow">
              <FaPlus className="plusIcon" onClick={addDataRow} />
              <span>새 평가 항목</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TaskDetailInputTable;
