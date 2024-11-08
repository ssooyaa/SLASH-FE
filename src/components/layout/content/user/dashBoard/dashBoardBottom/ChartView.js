import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import "./ChartView.css";
import Dropdown from "../../../../../dropdown/Dropdown";
import { FaExclamationCircle } from "react-icons/fa";
import ChartTable from "./ChartTable";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

// Initialize modules
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const ChartView = ({ selectedCriteria, setStatistics }) => {
  // props로 setStatistics 받음
  const [selectedSystem, setSelectedSystem] = useState("전체");
  const [selectedEquipment, setSelectedEquipment] = useState("전체");
  const [selectedPeriod, setSelectedPeriod] = useState("월별");
  const [statistics, setLocalStatistics] = useState([]); // 로컬 상태명 변경
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetSystems, setTargetSystems] = useState([]);
  const [targetEquipments, setTargetEquipments] = useState([]);
  const [systemData, setSystemData] = useState([]); // 시스템 데이터 전체 저장

  const formatDowntimeToHours = (totalSeconds) => {
    const hours = totalSeconds / 3600; // 초를 시간으로 변환
    return `${hours.toFixed(3)}h`; // 소수점 세 자리까지 표시
  };

  // 시스템 및 장비 데이터를 가져오는 함수
  const fetchSystemAndEquipment = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8080/common/all-systems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const systemsData = response.data.data;
        setSystemData(systemsData); // 전체 시스템 데이터를 저장

        // 시스템 이름 목록 설정 (전체 포함)
        const systemNames = [
          "전체",
          ...systemsData.map((system) => system.systemName),
        ];
        setTargetSystems(systemNames);
        setSelectedSystem(systemNames[0]); // 첫 번째 시스템을 기본값으로 설정

        // 장비 이름 목록 설정 (전체 포함)
        const allEquipments = [
          "전체",
          ...systemsData.flatMap((system) =>
            system.equipmentInfos.map((equipment) => equipment.name)
          ),
        ];
        setTargetEquipments(allEquipments);
        setSelectedEquipment(allEquipments[0]); // 첫 번째 장비를 기본값으로 설정
      }
    } catch (error) {
      console.error("시스템 및 장비 데이터를 가져오는 중 오류:", error);
      setError("데이터를 가져오는 데 실패했습니다.");
    }
  };

  // 선택된 시스템에 따라 장비 목록 업데이트
  useEffect(() => {
    if (selectedSystem === "전체") {
      // "전체" 시스템 선택 시 모든 장비를 표시
      const allEquipments = [
        "전체",
        ...systemData.flatMap((system) =>
          system.equipmentInfos.map((equipment) => equipment.name)
        ),
      ];
      setTargetEquipments(allEquipments);
      setSelectedEquipment(allEquipments[0]);
    } else {
      const selectedSystemData = systemData.find(
        (system) => system.systemName === selectedSystem
      );
      if (selectedSystemData) {
        setTargetEquipments(["전체", ...selectedSystemData.equipmentInfos]);
        setSelectedEquipment("전체");
      }
    }
  }, [selectedSystem, systemData]);

  useEffect(() => {
    fetchSystemAndEquipment();
  }, []);

  // 선택된 시스템과 기간에 따른 통계 데이터를 가져오기
  const fetchStatistics = async () => {
    if (!selectedSystem || !selectedPeriod) return;

    try {
      const token = localStorage.getItem("accessToken");

      setLoading(true);

      const params = {
        serviceType: selectedCriteria,
        period: selectedPeriod,
        targetSystem: selectedSystem === "전체" ? null : selectedSystem,
        targetEquipment:
          selectedEquipment === "전체" ? null : selectedEquipment,
      };

      const response = await axios.get(
        "http://localhost:8080/common/statistics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );

      if (response.data.success) {
        setStatistics(response.data.data); // 상위 컴포넌트의 상태 업데이트
        setLocalStatistics(response.data.data); // 로컬 상태 업데이트
      } else {
        setStatistics([]);
        setLocalStatistics([]);
      }
    } catch (error) {
      console.error("오류:", error);
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSystem && selectedEquipment && selectedCriteria) {
      fetchStatistics();
    }
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

    // 색상 설정: 99% 이상의 값은 녹색, 그 외에는 빨간색
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
        min: 90, // 최소값을 98로 설정하여 확대된 범위 표시
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
