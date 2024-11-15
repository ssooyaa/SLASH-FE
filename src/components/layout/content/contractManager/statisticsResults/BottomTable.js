import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";

const BottomTable = ({ initialData }) => {
  const [data, setData] = useState(initialData || {});
  const navigate = useNavigate();

  const handleDetail = (evaluationItemId, date) => {
    if (evaluationItemId && date) {
      navigate(
        `/contractManager/indexManagement/detail/${evaluationItemId}/${date}`
      );
    } else {
      console.error("Missing parameters:", { evaluationItemId, date });
    }
  };

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  return (
    <div className="MonthStatisticsTable">
      <StatisticsListTable initialData={data} handleDetail={handleDetail} />
    </div>
  );
};

export default BottomTable;
