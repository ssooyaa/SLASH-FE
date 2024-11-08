import React, { useEffect, useState } from "react";
import "./ChartView.css";
import Dropdown from "../../../../../dropdown/Dropdown";
import { FaExclamationCircle } from "react-icons/fa";
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

const ChartView = ({ selectedCriteria, setStatistics }) => {
  const [selectedSystem, setSelectedSystem] = useState("전체");
  const [selectedEquipment, setSelectedEquipment] = useState("전체");
  const [selectedPeriod, setSelectedPeriod] = useState("월별");
  const [statistics, setLocalStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetSystems, setTargetSystems] = useState([]);
  const [targetEquipments, setTargetEquipments] = useState([]);
  const [systemData, setSystemData] = useState([]);

  const formatDowntimeToHours = (totalMinutes) => {
    if (totalMinutes < 60) {
      return `${totalMinutes}m`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSystemAndEquipment();
        if (data.success) {
          const systemsData = data.data;
          setSystemData(systemsData);

          const systemNames = [
            "전체",
            ...systemsData.map((system) => system.systemName),
          ];
          setTargetSystems(systemNames);
          setSelectedSystem(systemNames[0]);

          const allEquipments = [
            "전체",
            ...systemsData.flatMap((system) =>
              system.equipmentInfos.map((equipment) => equipment.name)
            ),
          ];
          setTargetEquipments(allEquipments);
          setSelectedEquipment(allEquipments[0]);
        }
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getStatistics = async () => {
      if (!selectedSystem || !selectedPeriod) return;

      try {
        setLoading(true);
        const params = {
          serviceType: selectedCriteria,
          period: selectedPeriod,
          targetSystem: selectedSystem === "전체" ? null : selectedSystem,
          targetEquipment:
            selectedEquipment === "전체" ? null : selectedEquipment,
        };
        const data = await fetchStatistics(params);
        if (data.success) {
          setStatistics(data.data);
          setLocalStatistics(data.data);
        } else {
          setStatistics([]);
          setLocalStatistics([]);
        }
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getStatistics();
  }, [selectedSystem, selectedEquipment, selectedPeriod, selectedCriteria]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const renderNoDataMessage = () => (
    <div className="noDataMessage">
      <FaExclamationCircle className="noDataIcon" />
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
          data: [
            { y: score, radius: "100%", innerRadius: "80%", color: color },
          ],
          innerRadius: "80%",
          outerRadius: "100%",
        },
      ],
    };

    return (
      <div key={index} className="statisticItem">
        <div className="chartContainer">
          <p className="statDate">{formattedDate}</p>
          <HighchartsReact highcharts={Highcharts} options={options} />
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
          onSelect={setSelectedSystem}
        />
        <Dropdown
          label="장비 유형 : "
          options={targetEquipments}
          selectedOption={selectedEquipment}
          onSelect={setSelectedEquipment}
        />
        <Dropdown
          label="기간 : "
          options={["월별", "분기별", "연별"]}
          selectedOption={selectedPeriod}
          onSelect={setSelectedPeriod}
        />
      </div>
      <div
        className={statistics.length > 0 ? "systemCharts" : "noDataContainer"}
      >
        {statistics.length > 0
          ? statistics.map((stat, index) => renderChart(stat, index))
          : renderNoDataMessage()}
      </div>
    </div>
  );
};

export default ChartView;
