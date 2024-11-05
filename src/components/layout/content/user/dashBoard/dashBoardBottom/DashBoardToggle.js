// DashboardToggle.js
import React from "react";
import { FaTable, FaChartPie } from "react-icons/fa";
import "./DashBoardToggle.css";

const DashboardToggle = ({ view, setView }) => {
  return (
    <div className="dashboardToggle">
      <button
        className={`ctable ${view === "table" ? "active" : ""}`}
        onClick={() => setView("table")}
      >
        <FaTable />
      </button>
      <button
        className={`chart ${view === "chart" ? "active" : ""}`}
        onClick={() => setView("chart")}
      >
        <FaChartPie />
      </button>
    </div>
  );
};

export default DashboardToggle;
