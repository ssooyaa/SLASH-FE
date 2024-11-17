import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./GradeChart.css";

const GradeChart = ({ indicatorList }) => {
  const initialData = indicatorList || [];

  // x축 카테고리와 y축 데이터 준비
  const xCategory = initialData.map((item) => item.category);

  // 각 카테고리에 따른 색상 설정
  const data = initialData.map((item) => {
    let color;
    switch (item.category) {
      case "서비스 가동률":
        color = "#2C70F4"; // 파랑
        break;
      case "장애 적기처리율":
        color = "#FE4853"; // 빨강
        break;
      case "서비스요청 적기처리율":
        color = "#06D86F"; // 초록
        break;
      default:
        color = "#888888"; // 기본 색상
    }
    return { y: item.weightedScore, color };
  });

  // y축 최대값을 10 단위로 설정
  const yMax = Math.ceil(Math.max(...data.map((d) => d.y)) / 10) * 10 + 10;

  // Highcharts 옵션
  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent", // 배경 투명화
      height: 300, // 차트 높이 설정
      spacingBottom: 30, // 아래쪽 간격
      style: {
        fontFamily: "'Roboto', sans-serif", // 폰트 설정
      },
    },
    title: {
      text: "SLA 지표 성과",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#2C70F4",
      },
    },
    xAxis: {
      categories: xCategory,
      lineWidth: 0, // x축 아래 선 제거
      labels: {
        style: {
          fontSize: "13px",
          color: "#4A4A4A", // x축 레이블 색상
          fontWeight: "600",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      min: 0,
      max: yMax,
      tickInterval: 10, // y축을 10 단위로 설정
      gridLineColor: "#E0E0E0", // 밝은 그리드 색상
      labels: {
        style: {
          fontSize: "12px",
          color: "#888",
        },
      },
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      borderColor: "#2C70F4",
      borderRadius: 8,
      shadow: true,
      style: {
        color: "#333",
        fontSize: "12px",
        fontWeight: "bold",
      },
      pointFormat: "<b>{point.y}</b> 점",
    },
    plotOptions: {
      column: {
        pointWidth: 30, // 막대 너비
        dataLabels: {
          enabled: true, // 값 표시
          style: {
            fontSize: "12px",
            color: "#333",
            fontWeight: "bold",
          },
        },
      },
    },
    series: [
      {
        name: "SLA 점수",
        data: data, // 카테고리별 색상 데이터 적용
      },
    ],
    legend: {
      enabled: false, // 범례 비활성화
    },
    credits: {
      enabled: false, // Highcharts 로고 제거
    },
  };

  return (
    <div
      style={{
        maxWidth: "800px", // 차트 최대 너비
        margin: "10 auto", // 수평 중앙 정렬
        padding: "10px", // 외부 간격
      }}
    >
      {initialData.length === 0 ? (
        <div className="noChartMessage">
          <p>산출 결과가 없습니다</p>
        </div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default GradeChart;
