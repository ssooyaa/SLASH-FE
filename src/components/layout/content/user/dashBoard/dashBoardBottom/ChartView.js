import React, {useEffect, useState} from "react";
import "./ChartView.css";
import Dropdown from "../../../../../dropdown/Dropdown";
import {FaExclamationCircle} from "react-icons/fa";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const ChartView = ({selectedCriteria, statistics}) => {
  const [selectedSystem, setSelectedSystem] = useState("전체");
  const [selectedEquipment, setSelectedEquipment] = useState("전체");
  const [filteredStatistics, setFilteredStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetSystems, setTargetSystems] = useState(["전체"]);
  const [targetEquipments, setTargetEquipments] = useState(["전체"]);
  const [systemData, setSystemData] = useState([]);


  // 시스템 목록을 가져오는 함수 (중복 "전체" 제거)
  const getSystemsFromStatistics = (stats) => {
    console.log("selectedCriteria", selectedCriteria);
    const uniqueSystems = new Set(
      stats
        .filter((stat) => stat.targetSystem)
        .map((stat) => stat.targetSystem)
    );

    const systemsArray = Array.from(uniqueSystems);
    // "전체"가 목록에 없으면 추가
    if (!systemsArray.includes("전체")) {
      systemsArray.unshift("전체");
    }

    return systemsArray;
  };

// 장비 목록을 가져오는 함수 (중복 "전체" 제거)
  const getEquipmentsFromStatistics = (stats, selectedSystemName) => {
    const uniqueEquipments = new Set(
      stats
        .filter((stat) => selectedSystemName === "전체" || stat.targetSystem === selectedSystemName)
        .map((stat) => stat.targetEquipment)
    );

    const equipmentsArray = Array.from(uniqueEquipments);
    // "전체"가 목록에 없으면 추가
    if (!equipmentsArray.includes("전체")) {
      equipmentsArray.unshift("전체");
    }

    return equipmentsArray;
  };

  useEffect(() => {
    setLoading(true);
    console.log(statistics);
    if (statistics?.length > 0) {
      console.log("flag");
      const newEquipments = getEquipmentsFromStatistics(
        statistics,
        selectedSystem
      );
      console.log(newEquipments);
      setTargetEquipments(newEquipments);
      setSelectedEquipment("전체");
      const newSystems = getSystemsFromStatistics(statistics);
      setTargetSystems(newSystems); // 시스템 드롭다운 설정
      setSelectedSystem("전체"); // 기본값 설정
    }
  }, [statistics]);

// 선택된 시스템에 따라 장비 목록 동적 업데이트
  useEffect(() => {
    const newEquipments = getEquipmentsFromStatistics(statistics, selectedSystem);
    setTargetEquipments(newEquipments); // 장비 드롭다운 설정
    setSelectedEquipment("전체"); // 기본값 설정
  }, [selectedSystem, statistics]);

// 선택된 시스템 및 장비에 따른 데이터 필터링
  useEffect(() => {
    const updatedStatistics = statistics.filter((stat) => {
      const systemMatch = selectedSystem === "전체" || stat.targetSystem === selectedSystem;
      const equipmentMatch = selectedEquipment === "전체" || stat.targetEquipment === selectedEquipment;
      return systemMatch && equipmentMatch;
    });
    setFilteredStatistics(updatedStatistics);
  }, [selectedSystem, selectedEquipment, statistics]);


  useEffect(() => {
    console.log(selectedEquipment);
    if (selectedEquipment && targetEquipments && statistics) {
      console.log(statistics);
      const updatedStatistics = statistics.filter((stat) => {
        const systemMatch =
          selectedSystem === "전체" || stat.targetSystem === selectedSystem;
        const equipmentMatch =
          selectedEquipment === "전체" ||
          stat.targetEquipment === selectedEquipment;
        return systemMatch && equipmentMatch;
      });
      setFilteredStatistics(updatedStatistics);
      console.log(updatedStatistics);
    }
  }, [targetEquipments]);

  useEffect(() => {
    if (filteredStatistics) {
      setLoading(false);
    }
  }, [filteredStatistics]);

  useEffect(() => {
    setLoading(true);
    console.log(statistics);
    if (statistics?.length > 0) {
      console.log("flag");
      const newEquipments = getEquipmentsFromStatistics(
        statistics,
        selectedSystem
      );
      console.log(newEquipments);
      setTargetEquipments(newEquipments);
      setSelectedEquipment("전체");
    }
  }, [statistics]);

  useEffect(() => {
    console.log(selectedEquipment);
    if (selectedEquipment && targetEquipments && statistics) {
      console.log(statistics);
      const updatedStatistics = statistics.filter((stat) => {
        const systemMatch =
          selectedSystem === "전체" || stat.targetSystem === selectedSystem;
        const equipmentMatch =
          selectedEquipment === "전체" ||
          stat.targetEquipment === selectedEquipment;
        return systemMatch && equipmentMatch;
      });
      setFilteredStatistics(updatedStatistics);
      console.log(updatedStatistics);
    }
  }, [targetEquipments]);

  useEffect(() => {
    if (filteredStatistics) {
      setLoading(false);
    }
  }, [filteredStatistics]);

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
        min: 0,
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
            {y: score, radius: "100%", innerRadius: "80%", color: color},
          ],
          innerRadius: "80%",
          outerRadius: "100%",
        },
      ],
    };

    return (
      <div key={index} className="statisticItem">
        <div className="chartContainer">
          <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
        {selectedCriteria === "서비스 가동률" && (
          <>
            <div className="statDetails">
              <p>장비명: {stat.targetEquipment}</p>
              <p>총 중단 시간: {formatDowntimeToHours(stat.totalDowntime)}</p>
              <p>요청 건수: {stat.requestCount}건</p>
            </div>
          </>
        )}
        {(selectedCriteria === "서비스요청 적기처리율" || selectedCriteria === "장애 적기처리율") && (
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
      <div
        className={
          filteredStatistics.length > 0 ? "systemCharts" : "noDataContainer"
        }
      >
        {filteredStatistics.length > 0
          ? filteredStatistics.map((stat, index) => renderChart(stat, index))
          : renderNoDataMessage()}
      </div>
    </div>
  );
};

export default ChartView;
