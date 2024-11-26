import axios from "./Interceptor";

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
    const response = await axios.post(
      "/contract-manager/evaluation-item",
      requestContractDTO
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
    const params = { contractId: contractId, date: selectedDate };
    const response = await axios.get(
      `/contract-manager/statistics/status/${contractId}?date=${selectedDate}`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("데이터 전송 오류:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const saveMeasuring = async (dto) => {
  try {
    const response = await axios.post("/contract-manager/statistics", dto);
    if (response.data && response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("ERROR: ", error.response?.data || error.message);
    return false;
  }
};

export const saveServiceMeasuring = async (dto) => {
  try {
    const response = await axios.post(
      "/contract-manager/service-statistics",
      dto
    );
    if (response.data && response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("ERROR: ", error.response?.data || error.message);
    return false;
  }
};

export const saveIncidentMeasuring = async (dto) => {
  try {
    const response = await axios.post(
      "/contract-manager/incident-statistics",
      dto
    );
    if (response.data && response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("ERROR: ", error.response?.data || error.message);
    return false;
  }
};

export const fetchAllContractInfo = async () => {
  try {
    const response = await axios.get("/contract-manager/all-contract");
    if (response.data.success) {
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
    const response = await axios.get(
      `/contract-manager/modifiable/${contractId}`
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
    const response = await axios.post(
      `/contract-manager/total-target/${contractId}`,
      requestTotalTargetDTO
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
    const response = await axios.put(
      `/contract-manager/total-target/${contractId}`,
      requestTotalTargetDTO
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
    const response = await axios.post(
      `/contract-manager/evaluation-item/${evaluationItemId}`,
      requestEvaluationDTO
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
    console.log(evaluationItemId, requestEvaluationDTO);
    const response = await axios.put(
      `/contract-manager/evaluation-item/${evaluationItemId}`,
      requestEvaluationDTO
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
    const response = await axios.delete(
      `/contract-manager/evaluation-item/${evaluationItemId}`
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
  try {
    const response = await axios.get(
      `/contract-manager/statistics/${evaluationItemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation equipment data:", error);
    throw error;
  }
};

export const fetchEditStatistics = async (evaluationItemId, editData) => {
  try {
    const response = await axios.patch(
      `/contract-manager/statistics/${evaluationItemId}`,
      editData
    );
    return response.data;
  } catch (error) {
    console.error("Error saving edited statistics:", error);
    throw error;
  }
};

export const deleteStatistics = async (evaluationItemId, date) => {
  try {
    const response = await axios.delete(
      `/contract-manager/statistics/${evaluationItemId}`,
      {
        params: {
          date, // LocalDate 형식의 날짜를 YYYY-MM-DD 형태로 전달
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

export const approvalStatistics = async (statisticsId, evaluationItemId) => {
  try {
    const response = await axios.patch(
      `/contract-manager/${statisticsId}/approve/${evaluationItemId}`
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
