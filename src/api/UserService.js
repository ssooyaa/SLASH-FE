import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const CreateContract = async (requestContractDTO) => {
  try {
    const response = await axios.post(
      "/contract-manager/contract",
      requestContractDTO
    );
    if (response.data.success) {
      alert("계약생성 성공");
      return response.data.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
    alert(error.response.data.message);
    return false;
  }
};

export const CreateServiceDetail = async (requestContractDTO) => {
  try {
    const response = await axios.post("/evaluation-item", requestContractDTO);
    if (response.data.success) {
      return response.data.success;
    } else {
      return false;
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
    return false;
  }
};

export const fetchContractInfo = async (contractId) => {
  try {
    const response = await axios.get(
      `/contract-manager/contract/${contractId}`
    );
    console.log(response);

    if (response.data.success) {
      console.log(response);
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      "ERROR: ",
      error.response ? error.response.data : error.message
    );
  }
};

export const fetchServiceInfo = async (evaluationItemId) => {
  try {
    const response = await axios.get(`/detail/${evaluationItemId}`);

    if (response.data.success) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const fetchAllContractInfo = async () => {
  try {
    const response = await axios.get("/contract-manager/all-contract");

    if (response.data.success) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const getMonthlyData = async (selectedYear, selectedMonth) => {
    try {
        const token = localStorage.getItem("accessToken");
        const params = {year: selectedYear, month: selectedMonth};
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
        const response = await axios.patch('/request/allocate', dto, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("전송 데이터:", dto); // 전송 데이터 출력

        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("요청 중 오류 발생:", error); // 전체 오류 정보 출력
    }
}

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
