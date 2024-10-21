import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const GradeChart = () => {
  const xCategory = [
    "서비스 가동률",
    "장애 요청 적기 처리율",
    "서비스 요청 적기 처리율",
  ];
  const data = [4, 3, 2];

  const options = {
    chart: {
      type: "column",
      width: 350,
      height: 250,
    },
    title: {
      text: "sla지표",
    },
    xAxis: {
      categories: xCategory,
    },
    yAxis: {
      categories: ["E", "D", "C", "B", "A"],
      allowDecimals: true,
      title: {
        text: "Grade",
      },
      min: 0, // y축 최소값 고정
      max: 4, // y축 최대값 고정
      gridLineWidth: 0, // 가로선 제거
    },
    plotOptions: {
      series: {
        pointWidth: 20,
        borderRadius: {
          radius: 10,
        },
      },
      column: { colorByPoint: true },
    },
    series: [
      {
        data: data,
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false, // hover 시 값이 나오지 않게 설정
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              display: false,
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default GradeChart;
