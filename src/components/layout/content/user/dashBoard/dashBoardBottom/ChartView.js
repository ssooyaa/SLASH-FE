import React, { useEffect, useState } from "react";
import "./ChartView.css";
import Dropdown from "../../../../../dropdown/Dropdown";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const ChartView = ({ selectedCriteria, statistics }) => {
  const [selectedSystem, setSelectedSystem] = useState("전체");
  const [selectedEquipment, setSelectedEquipment] = useState("전체");
  const [filteredStatistics, setFilteredStatistics] = useState([]);
  const [targetSystems, setTargetSystems] = useState(["전체"]);
  const [targetEquipments, setTargetEquipments] = useState(["전체"]);

  const getSystemsFromStatistics = (stats) => {
    const uniqueSystems = new Set(
      stats.filter((stat) => stat.targetSystem).map((stat) => stat.targetSystem)
    );
    const systemsArray = Array.from(uniqueSystems);
    if (!systemsArray.includes("전체")) {
      systemsArray.unshift("전체");
    }
    return systemsArray;
  };

  const getEquipmentsFromStatistics = (stats, selectedSystemName) => {
    const uniqueEquipments = new Set(
      stats
        .filter(
          (stat) =>
            selectedSystemName === "전체" ||
            stat.targetSystem === selectedSystemName
        )
        .map((stat) => stat.targetEquipment)
    );
    const equipmentsArray = Array.from(uniqueEquipments);
    if (!equipmentsArray.includes("전체")) {
      equipmentsArray.unshift("전체");
    }
    return equipmentsArray;
  };

  useEffect(() => {
    if (statistics?.length > 0) {
      const newEquipments = getEquipmentsFromStatistics(
        statistics,
        selectedSystem
      );
      setTargetEquipments(newEquipments);
      setSelectedEquipment("전체");
      const newSystems = getSystemsFromStatistics(statistics);
      setTargetSystems(newSystems);
      setSelectedSystem("전체");
    }
  }, [statistics]);

  useEffect(() => {
    const newEquipments = getEquipmentsFromStatistics(
      statistics,
      selectedSystem
    );
    setTargetEquipments(newEquipments);
    setSelectedEquipment("전체");
  }, [selectedSystem, statistics]);

  useEffect(() => {
    const updatedStatistics = statistics.filter((stat) => {
      const systemMatch =
        selectedSystem === "전체" || stat.targetSystem === selectedSystem;
      const equipmentMatch =
        selectedEquipment === "전체" ||
        stat.targetEquipment === selectedEquipment;
      return systemMatch && equipmentMatch;
    });
    setFilteredStatistics(updatedStatistics);
  }, [selectedSystem, selectedEquipment, statistics]);

  const renderChart = (stat) => {
    const score = stat.score;
    const grade = stat.grade;
    const color =
      grade === "A"
        ? "#2e8b57"
        : grade === "B"
          ? "#ffa500"
          : grade === "C"
            ? "#ff6347"
            : grade === "D"
              ? "#b22222"
              : "#4a4040";

    const options = {
      chart: {
        type: "solidgauge",
        height: "200px",
        backgroundColor: null,
      },
      title: null,
      tooltip: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [
          {
            outerRadius: "100%",
            innerRadius: "80%",
            backgroundColor: Highcharts.color("#e6e6e6").get(),
            borderWidth: 0,
          },
        ],
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -52,
            x: -59,
            borderWidth: 0,
            useHTML: true,
            format: `
              <div style="text-align:center">
                <span style="font-size:1.4rem;color:#333">${stat.grade}</span><br/>
                <span style="font-size:1.1rem;color:${color}">${score.toFixed(
                  2
                )}%</span>
              </div>
            `,
          },
        },
      },
      series: [
        {
          name: "Score",
          data: [
            { y: score, radius: "100%", innerRadius: "80%", color: color },
          ],
          innerRadius: "80%",
          outerRadius: "100%",
        },
      ],
    };

    return (
      <div className="statisticItem">
        <div className="chartContainer">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        {selectedCriteria === "서비스 가동률" && (
          <div className="statDetails">
            <p>장비명: {stat.targetEquipment}</p>
            <p>총 중단 시간: {stat.totalDowntime}m</p>
            <p>요청 건수: {stat.requestCount}건</p>
          </div>
        )}
        {(selectedCriteria === "서비스요청 적기처리율" ||
          selectedCriteria === "장애 적기처리율") && (
          <>
            <div className="statDetails">
              <p>요청 건수: {stat.requestCount}건</p>
              <p>적기 처리 건수: {stat.dueOnTimeCount}건</p>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderGroupedStatistics = () => {
    const groupedStatistics = filteredStatistics.reduce((acc, stat) => {
      acc[stat.targetSystem] = acc[stat.targetSystem] || [];
      acc[stat.targetSystem].push(stat);
      return acc;
    }, {});

    return Object.entries(groupedStatistics).map(
      ([systemName, stats], index) => (
        <div key={systemName} className="systemGroup">
          <h3
            className={`systemGroupHeader ${
              selectedCriteria === "서비스요청 적기처리율" ||
              selectedCriteria === "장애 적기처리율"
                ? "hidden"
                : ""
            }`}
          >
            {systemName}
          </h3>
          <div className="systemGroupItems">
            {stats.map((stat) => renderChart(stat))}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="statisticsContainer">
      <div className="dropDown">
        <Dropdown
          label="시스템명 : "
          options={targetSystems}
          selectedOption={selectedSystem}
          onSelect={(value) => setSelectedSystem(value)}
        />
        <Dropdown
          label="장비 유형 : "
          options={targetEquipments}
          selectedOption={selectedEquipment}
          onSelect={(value) => setSelectedEquipment(value)}
        />
      </div>
      <div
        className={
          filteredStatistics.length > 0
            ? "groupedSystemCharts"
            : "noDataContainer"
        }
      >
        {filteredStatistics.length > 0 ? (
          selectedSystem === "전체" ? (
            renderGroupedStatistics()
          ) : (
            <div className="systemGroupItems">
              {filteredStatistics.map((stat) => renderChart(stat))}
            </div>
          )
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ChartView;
