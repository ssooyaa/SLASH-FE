import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import "./ChartView.css";
import Dropdown from "../../../../../dropdown/Dropdown";
import { FaExclamationCircle } from "react-icons/fa";

// Axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

// Initialize modules
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const ChartView = ({ selectedCriteria }) => {
  const [selectedSystem, setSelectedSystem] = useState("DB");
  const [selectedPeriod, setSelectedPeriod] = useState("월별");
  const [targetSystems, setTargetSystems] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 시스템 옵션 데이터를 가져오는 함수
  const fetchSystems = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:8080/all-systems", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const systemNames = response.data.data.map(
          (system) => system.systemName
        );
        setTargetSystems(systemNames);
        setSelectedSystem(systemNames[0]); // 첫 번째 시스템을 기본값으로 설정
      }
    } catch (error) {
      console.error("시스템 데이터를 가져오는 중 오류:", error);
    }
  };

  useEffect(() => {
    fetchSystems();
  }, []);

  // 선택된 시스템과 기간에 따른 통계 데이터를 가져오기
  const fetchStatistics = async () => {
    if (!selectedSystem) return;

    try {
      const token = localStorage.getItem("accessToken");

      setLoading(true);

      const response = await axios.get("http://localhost:8080/statistics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },


        params: {
          serviceType: selectedCriteria,
          period: selectedPeriod,
          targetSystem: selectedSystem,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setStatistics({ [selectedSystem]: response.data.data });
      } else {
        setStatistics({ [selectedSystem]: [] });
      }
    } catch (error) {
      console.error("오류:", error);
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSystem) {
      fetchStatistics();
    }
  }, [selectedSystem, selectedPeriod, , selectedCriteria]);

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
            innerRadius: "60%",
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
                <span style="font-size:1.5rem;color:#333">${stat.grade}</span><br/>
                <span style="font-size:1.2rem;color:#333">${stat.score}%</span>
              </div>
            `,
          },
        },
      },
      series: [
        {
          name: "Score",
          data: [{ y: stat.score, radius: "100%", innerRadius: "60%" }],
          innerRadius: "60%",
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
          <p>총 중단 시간: {stat.totalDowntime}h</p>
          <p>요청 건수: {stat.requestCount}건</p>
        </div>
      </div>
    );
  };

  return (
    <div className="statisticsContainer">
      <div className="dropDown">
        <Dropdown
          label="장비 유형 : "
          options={targetSystems}
          selectedOption={selectedSystem}
          onSelect={setSelectedSystem}
        />
        <Dropdown
          label="기간 : "
          options={["월별", "분기별", "연별"]}
          selectedOption={selectedPeriod}
          onSelect={setSelectedPeriod}
        />
      </div>

      <div
        className={
          statistics[selectedSystem] && statistics[selectedSystem].length > 0
            ? "systemCharts"
            : "noDataContainer"
        }
      >
        {
          statistics[selectedSystem] && statistics[selectedSystem].length > 0
            ? statistics[selectedSystem].map((stat, index) => (
                <div className="chartContainer" key={index}>
                  {renderChart(stat, index)}
                </div>
              ))
            : renderNoDataMessage() // 데이터가 없을 때 메시지 렌더링
        }
      </div>
    </div>
  );
};

export default ChartView;
