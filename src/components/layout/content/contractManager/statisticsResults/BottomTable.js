import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";

const BottomTable = ({ initialData }) => {
  const [data, setData] = useState(initialData || {});
  const navigate = useNavigate();
  const location = useLocation();

  const handleDetail = (evaluationItemId, date) => {
    if (evaluationItemId && date) {
      const basePath = location.pathname.startsWith("/contractManager")
        ? "/contractManager"
        : "/user";
      console.log(basePath);
      navigate(
        `${basePath}/indexManagement/detail/${evaluationItemId}/${date}`
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
