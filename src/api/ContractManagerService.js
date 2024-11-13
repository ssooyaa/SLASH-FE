import axios from "axios";
import apiClient from "./Interceptor";

axios.defaults.baseURL = "http://localhost:8080";
apiClient.defaults.baseURL = "http://localhost:8080";

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
    const params = { contractId: contractId, date: selectedDate };
    console.log("전송 값:", params);

    // axios 요청 수정
    const response = await axios.get(
      `/contract-manager/statistics/status/${contractId}?date=${selectedDate}`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await axios.post("/contract-manager/statistics", dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axios.post("/common/incident-statistics", dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const fetchAllContractInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기

    const response = await axios.get("/contract-manager/all-contract", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const fetchModifyIsPossible = async (contractId) => {
  try {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기

    const response = await axios.get(
      `/contract-manager/modifiable/${contractId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const createTotalTarget = async (contractId, requestTotalTargetDTO) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      `/contract-manager/total-target/${contractId}`,
      requestTotalTargetDTO,
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
    alert(error.response.data.message);

    return false;
  }
};

export const updateTotalTarget = async (contractId, requestTotalTargetDTO) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.put(
      `/contract-manager/total-target/${contractId}`,
      requestTotalTargetDTO,
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
    alert(error.response.data.message);

    return false;
  }
};

export const createEvaluationItem = async (
  evaluationItemId,
  requestEvaluationDTO
) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      `/contract-manager/total-target/${evaluationItemId}`,
      requestEvaluationDTO,
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
    alert(error.response.data.message);

    return false;
  }
};

export const updateEvaluationItem = async (
  evaluationItemId,
  requestEvaluationDTO
) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.put(
      `/contract-manager/evaluation-item/${evaluationItemId}`,
      requestEvaluationDTO,
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
    alert(error.response.data.message);

    return false;
  }
};

export const deleteEvaluationItem = async (evaluationItemId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.delete(
      `/contract-manager/evaluation-item/${evaluationItemId}`,
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
    alert(error.response.data.message);

    return false;
  }
};

//통계 지표 수정 api 요청 함수
export const fetchEvaluationEquipment = async (evaluationItemId, date) => {
  const token = localStorage.getItem("accessToken"); // 토큰을 로컬스토리지에서 가져오기
  try {
    const response = await axios.get(
      `/contract-manager/statistics/${evaluationItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { date: date },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation equipment data:", error);
    throw error;
  }
};

export const fetchEditStatistics = async (evaluationItemId, editData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `/contract-manager/statistics/${evaluationItemId}`,
      editData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving edited statistics:", error);
    throw error;
  }
};

export const deleteStatistics = async (evaluationItemId, calculateTime) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await apiClient.delete(
      `/contract-manager/statistics/${evaluationItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: calculateTime, // LocalDate 형식의 날짜를 YYYY-MM-DD 형태로 전달
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
    alert(error.response.data.message);

    return false;
  }
};
