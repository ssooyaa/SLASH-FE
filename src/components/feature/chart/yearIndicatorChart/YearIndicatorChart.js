import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchYearlyWeightedScores } from "../../../../api/CommonService";

const transformData = (data) => {
  const categories = data.map((item) => `${item.month}`);
  const serviceAvailability = data.map(
    (item) =>
      item.weightedScores.find((score) => score.category === "서비스 가동률")
        ?.weightedScore || 0
  );
  const incidentTimelyRate = data.map(
    (item) =>
      item.weightedScores.find((score) => score.category === "장애 적기처리율")
        ?.weightedScore || 0
  );
  const serviceRequestTimelyRate = data.map(
    (item) =>
      item.weightedScores.find(
        (score) => score.category === "서비스요청 적기처리율"
      )?.weightedScore || 0
  );

  return {
    categories,
    serviceAvailability,
    incidentTimelyRate,
    serviceRequestTimelyRate,
  };
};

const YearIndicatorsChart = ({ contractId, date }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchYearlyWeightedScores(contractId, date);
        const transformedData = transformData(data);
        setChartData(transformedData);
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: "column",
      height: 300, // 차트 높이 조정
    },
    title: {
      text: "월별 서비스 평가 항목 점수",
    },
    xAxis: {
      categories: chartData.categories,
      lineWidth: 0,
      stackLabels: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: false,
      },
      stackLabels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal",
      borderWidth: 0,
      x: 35,
      y: -5,
      itemStyle: {
        fontWeight: "bold",
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "서비스 가동률",
        data: chartData.serviceAvailability,
        color: "#90ECBE",
      },
      {
        name: "장애 적기처리율",
        data: chartData.incidentTimelyRate,
        color: "#FF767E",
      },
      {
        name: "서비스요청 적기처리율",
        data: chartData.serviceRequestTimelyRate,
        color: "#72A2FF",
      },
    ],
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default YearIndicatorsChart;
