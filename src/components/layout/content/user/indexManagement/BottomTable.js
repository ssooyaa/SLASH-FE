import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BottomTable.css";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";

const BottomTable = ({ initialData }) => {
  const [data, setData] = useState(initialData || {});

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleDetail = (evaluationItemId, date) => {
    if (evaluationItemId && date) {
      navigate(`/user/indexManagement/detail/${evaluationItemId}/${date}`);
    } else {
      console.error("Missing parameters:", { evaluationItemId, date });
    }
  };

  return (
    <div className="MonthStatisticsTable">
      <StatisticsListTable initialData={data} handleDetail={handleDetail} />
    </div>
  );
};

export default BottomTable;
