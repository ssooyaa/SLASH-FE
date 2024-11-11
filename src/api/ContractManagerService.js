import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const CreateContract = async (requestContractDTO) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      "/contract-manager/contract",
      requestContractDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      "/contract-manager/evaluation-item",
      requestContractDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const fetchStatisticsStatus = async (contractId, selectedDate) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = {contractId: contractId, date: selectedDate};
    console.log("전송 값:", params);

    // axios 요청 수정
    const response = await axios.get(`/contract-manager/statistics/status/${contractId}?date=${selectedDate}`, {
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

export const saveMeasuring = async (dto) => {
  try {
    const token = localStorage.getItem("accessToken");

    console.log(dto);
    const response = await axios.post(
      "/contract-manager/statistics",
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if response.data.success exists and return it
    if (response.data && response.data.success) {
      return true; // Return true if success
    } else {
      return false; // Return false if not successful
    }
  } catch (error) {
    console.error("ERROR: ", error.response?.data || error.message);
    return false; // Return false on error
  }


};

export const saveServiceMeasuring = async (dto) => {
  try {
    const token = localStorage.getItem("accessToken");

    console.log(dto);
    const response = await axios.post(
      "/contract-manager/service-statistic",
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if response.data.success exists and return it
    if (response.data && response.data.success) {
      return true; // Return true if success
    } else {
      return false; // Return false if not successful
    }
  } catch (error) {
    console.error("ERROR: ", error.response?.data || error.message);
    return false; // Return false on error
  }


};

export const saveIncidentMeasuring = async (dto) => {
  try {
    const token = localStorage.getItem("accessToken");

    console.log(dto);
    const response = await axios.post(
      "/common/incident-statistics",
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if response.data.success exists and return it
    if (response.data && response.data.success) {
      return true; // Return true if success
    } else {
      return false; // Return false if not successful
    }
  } catch (error) {
    console.error("ERROR: ", error.response?.data || error.message);
    return false; // Return false on error
  }


};



