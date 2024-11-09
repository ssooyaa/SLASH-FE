import React, {useEffect, useState} from "react";
import "./ChartView.css";
import Dropdown from "../../../../../dropdown/Dropdown";
import {FaExclamationCircle} from "react-icons/fa";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import {
  fetchSystemAndEquipment,
  fetchStatistics,
} from "../../../../../../api/UserService";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const ChartView = ({selectedCriteria, setStatistics}) => {
  const [selectedSystem, setSelectedSystem] = useState("전체");
  const [selectedEquipment, setSelectedEquipment] = useState("전체");
  const [statistics, setLocalStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetSystems, setTargetSystems] = useState(["전체"]);
  const [targetEquipments, setTargetEquipments] = useState(["전체"]);
  const [systemData, setSystemData] = useState([]);

  const getEquipmentsFromStatistics = (stats, selectedSystemName) => {
    if (selectedSystemName === "전체") {
      return ["전체", ...new Set(stats.map(stat => stat.targetEquipment))];
    } else {
      return [
        "전체",
        ...new Set(
          stats
            .filter(stat => stat.targetSystem === selectedSystemName)
            .map(stat => stat.targetEquipment)
        ),
      ];
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const systemResponse = await fetchSystemAndEquipment();
        if (systemResponse.success && systemResponse.data) {
          const systemsData = systemResponse.data;
          setSystemData(systemsData);
          setTargetSystems(["전체", ...systemsData.map(system => system.systemName)]);
        }

        const statisticsResponse = await fetchStatistics({
          date: "2024-10-31",
          evaluationItemId: 1,
        });

        if (statisticsResponse.success && statisticsResponse.data) {
          const statsData = statisticsResponse.data;
          setStatistics(statsData);
          setLocalStatistics(statsData);

          const initialEquipments = getEquipmentsFromStatistics(statsData, "전체");
          setTargetEquipments(initialEquipments);
        }
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (statistics.length > 0) {
      const newEquipments = getEquipmentsFromStatistics(statistics, selectedSystem);
      setTargetEquipments(newEquipments);
      setSelectedEquipment("전체");
    }
  }, [selectedSystem, statistics]);

  const filteredStatistics = statistics.filter((stat) => {
    const systemMatch = selectedSystem === "전체" || stat.targetSystem === selectedSystem;
    const equipmentMatch = selectedEquipment === "전체" || stat.targetEquipment === selectedEquipment;
    return systemMatch && equipmentMatch;
  });

  const formatDowntimeToHours = (totalMinutes) => {
    if (totalMinutes < 60) {
      return `${totalMinutes}m`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const renderNoDataMessage = () => (
    <div className="noDataMessage">
      <FaExclamationCircle className="noDataIcon"/>
      <p>현재 선택된 조건에 맞는 데이터가 없습니다.</p>
      <p>다른 기간이나 시스템을 선택해 보세요.</p>
    </div>
  );

  const renderChart = (stat, index) => {
    const formattedDate = stat.date.slice(0, 7);
    const score = stat.score;
    const color = score >= 100 ? "#2e8b57" : "#ff4d4d";

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
        min: 90,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -59,
            x: -60,
            borderWidth: 0,
            useHTML: true,
            format: `
              <div style="text-align:center">
                <span style="font-size:1.4rem;color:#333">${stat.grade}</span><br/>
                <span style="font-size:1.1rem;color:${color}">${score.toFixed(2)}%</span>
              </div>
            `,
          },
        },
      },
      series: [
        {
          name: "Score",
          data: [{y: score, radius: "100%", innerRadius: "80%", color: color}],
          innerRadius: "80%",
          outerRadius: "100%",
        },
      ],
    };

    return (
      <div key={index} className="statisticItem">
        <div className="chartContainer">
          <p className="statDate">{formattedDate}</p>
          <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
        <div className="statDetails">
          <p>장비명: {stat.targetEquipment}</p>
          <p>총 중단 시간: {formatDowntimeToHours(stat.totalDowntime)}</p>
          <p>요청 건수: {stat.requestCount}건</p>
        </div>
      </div>
    );
  };

  return (
    <div className="statisticsContainer">
      <div className="dropDown">
        <Dropdown
          label="시스템 유형 : "
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
      <div className={filteredStatistics.length > 0 ? "systemCharts" : "noDataContainer"}>
        {filteredStatistics.length > 0
          ? filteredStatistics.map((stat, index) => renderChart(stat, index))
          : renderNoDataMessage()}
      </div>
    </div>
  );
};

export default ChartView;
