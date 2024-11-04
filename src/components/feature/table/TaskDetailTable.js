import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import "./taskDetailTable.css";

const TaskDetailTable = ({ initialData }) => {
  const [data, setData] = useState(initialData || []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>서비스 제공 관련 여부</th>
            <th>업무 유형</th>
            <th>처리 시간</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" checked={item.serviceRelevance} />
              </td>
              <td>
                <p className="tableP">{item.taskDetail}</p>
              </td>
              <td>
                <p className="tableP">{item.deadline}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskDetailTable;
