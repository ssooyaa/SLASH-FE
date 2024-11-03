// 사용자 관련 API 호출 함수 모음 (예: 사용자 정보 가져오기)
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const getMonthlyData = async (selectedYear, selectedMonth) => {
  try {
    const params = { year: selectedYear, month: selectedMonth };
    console.log("전송 값:", params);

    const response = await axios.get("/monthly-data", { params });
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);
    return null; // 오류 발생 시 null 반환
  }
};
