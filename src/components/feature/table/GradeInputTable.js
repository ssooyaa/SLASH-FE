import React, { useState, useEffect } from "react";
import "./GradeInputTable.css";
import { CgMenuGridO } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

const GradeInputTable = ({ initialData, onDataChange }) => {
  const [data, setData] = useState(
    initialData.length > 0
      ? initialData
      : Array(3).fill({
          grade: "",
          min: "0",
          max: "0",
          minInclusive: true,
          maxInclusive: false,
          score: "0",
        })
  );

  // initialData가 변경될 때마다 data를 초기화
  useEffect(() => {
    setData(
      initialData.length > 0
        ? initialData
        : Array(3).fill({
            grade: "",
            min: "0",
            max: "0",
            minInclusive: true,
            maxInclusive: false,
            score: "0",
          })
    );
  }, [initialData]);

  const addDataRow = () => {
    const updatedData = [
      ...data,
      {
        grade: "",
        min: "0",
        max: "0",
        minInclusive: true, // 기본값 설정
        maxInclusive: false, // 기본값 설정
        score: "0",
      },
    ];
    setData(updatedData);
    onDataChange(updatedData);
  };

  const handleData = (index, field, value) => {
    const updateData = [...data];
    updateData[index] = {
      ...updateData[index],
      [field]: value,
    };
    console.log(updateData);
    setData(updateData);
    onDataChange(updateData);
  };

  const numberFormatter = (event, index, type) => {
    // 입력값을 받아오기 전에 숫자가 아닌 값들을 제거
    let value = event.target.value.replace(/[^0-9.]/g, ""); // 숫자와 .만 남김

    // 소수점이 여러 번 입력된 경우 처음 소수점만 남김
    const parts = value.split(".");
    if (parts.length > 2) {
      value = `${parts[0]}.${parts.slice(1).join("")}`;
    }

    // 숫자가 아닌 값이 입력되었을 경우 알림
    if (event.target.value !== value) {
      alert("숫자만 입력 가능합니다.");
    }

    // min 필드에 값 설정 (문자열로 입력받고 처리)
    handleData(index, type, value);
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
            <th> 서비스 수준 등급 </th>
            <th className="tableSelect">최소</th>
            <th className="tableSelect">최대</th>
            <th>변환점수</th>
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
                  type="text"
                  className="fullInput"
                  value={item.grade}
                  onChange={(e) => handleData(index, "grade", e.target.value)}
                />
              </td>
              <td className="standardInput">
                <input
                  type="text"
                  value={item.min || ""}
                  onChange={(e) => numberFormatter(e, index, "min")}
                />
                <select
                  className="standardSelect"
                  name="minStandard"
                  value={item.minInclusive}
                  onChange={(e) =>
                    handleData(index, "minInclusive", e.target.value === "true")
                  }
                >
                  <option value={true}>이상</option>
                  <option value={false}>초과</option>
                </select>
              </td>
              <td className="standardInput">
                <input
                  type="text"
                  value={item.max || ""}
                  onChange={(e) => numberFormatter(e, index, "max")}
                />
                <select
                  className="standardSelect"
                  name="maxStandard"
                  value={item.maxInclusive}
                  onChange={(e) =>
                    handleData(index, "maxInclusive", e.target.value === "true")
                  }
                >
                  <option value={false}>미만</option>
                  <option value={true}>이하</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="fullInput"
                  value={item.score || ""}
                  onChange={(e) => numberFormatter(e, index, "score")}
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

export default GradeInputTable;
