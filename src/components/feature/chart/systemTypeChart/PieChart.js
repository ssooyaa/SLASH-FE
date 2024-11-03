import React from "react";
import ReactApexChart from "react-apexcharts";

export const PieChart = ({ data }) => {
  // 데이터가 비어있을 경우 빈 배열로 처리하여 오류 방지
  const labels = data?.map((item) => item.name) || [];
  const series = data?.map((item) => item.count) || [];

  const options = {
    chart: {
      width: "100%",
      height: "auto",
      type: "pie",
    },
    labels: labels.length ? labels : ["No Data"],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -10,
          formatter: (val, opts) => {
            return opts.w.globals.labels[opts.seriesIndex];
          },
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
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
  };

  // 시리즈 배열이 비었거나 모든 값이 0일 경우 빈 차트를 반환
  if (!series.length || series.reduce((acc, curr) => acc + curr, 0) === 0) {
    return (
      <div style={{ textAlign: "center", minHeight: "172px" }}>
        <ReactApexChart options={options} series={[0]} type="pie" />
      </div>
    );
  }

  return (
    <div>
      <div id="chart" style={{ minHeight: "172px" }}>
        <ReactApexChart options={options} series={series} type="pie" />
      </div>
    </div>
  );
};
