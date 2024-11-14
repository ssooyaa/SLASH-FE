import React from "react";
import YearIndicatorsChart from "../../../../feature/chart/yearIndicatorChart/YearIndicatorChart";
import YearIndicatorTable from "./YearIndicatorTable";

const YearIndicatorForm = () => {
  return (
    <div>
      <YearIndicatorsChart contractId={1} date={2024} />
      <YearIndicatorTable contractId={1} date={2024} />
    </div>
  );
};

export default YearIndicatorForm;
