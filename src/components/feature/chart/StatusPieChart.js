import React from "react";
import ReactApexChart from "react-apexcharts";

export const StatusPieChart = ({ data }) => {
  // statusCountRequest 데이터에서 레이블과 시리즈 생성
  const labels = ["접수 완료", "처리 중", "처리 완료"];
  const series = [
    data?.registered || 0,
    data?.processing || 0,
    data?.completed || 0,
  ];

  const options = {
    chart: {
      width: "100%",
      height: "auto",
      type: "pie",
    },
    labels: labels,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="chart" style={{ minHeight: "173px" }}>
        <ReactApexChart options={options} series={series} type="pie" />
        <div id="htmlDist"></div>
      </div>
    </div>
  );
};
