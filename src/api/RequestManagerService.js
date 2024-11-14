import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const getMonthlyData = async (selectedYear, selectedMonth,contractId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = { year: selectedYear, month: selectedMonth,contractId:contractId};
    console.log("전송 값:", params);

    // axios 요청 수정
    const response = await axios.get("/request-manager/monthly-data", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);

    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const assignTaskManager = async (dto) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      "/contract-manager/request/allocate",
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("전송 데이터:", dto); // 전송 데이터 출력

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("요청 중 오류 발생:", error); // 전체 오류 정보 출력
  }
};

export const getManagerTaskStatus = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("/contract-manager/status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);
    return []; // 오류 발생 시 null 반환
  }
};
export const completeRequest = async (requestId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `/request-manager/request/complete?requestId=${requestId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("서버 응답 에러:", error.response.status, error.response.data);
    } else {
      console.error("요청 실패:", error.message);
    }
    return []; // 오류 발생 시 빈 배열 반환
  }
};