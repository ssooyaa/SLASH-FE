import React, { useEffect, useState } from "react";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";

const BottomTable = ({ initialData }) => {
  const [data, setData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  return (
    <div className="MonthStatisticsTable">
      <StatisticsListTable initialData={data} />
    </div>
  );
};

export default BottomTable;
