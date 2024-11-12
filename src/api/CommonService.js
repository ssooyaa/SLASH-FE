import axios from "axios";
import apiClient from "./Interceptor";

apiClient.defaults.baseURL = "http://localhost:8080";

export const fetchAllContractInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기

    const response = await apiClient.get("/contract-manager/all-contract", {
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

export const fetchContractInfo = async (contractId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await apiClient.get(`/common/contract/${contractId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
//모든 계약 이름 조회
export const fetchAllContractName = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await apiClient.get("/common/all-contract-name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};
//평가 지표에 대한 상세 정보
export const fetchServiceInfo = async (evaluationItemId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await apiClient.get(`/common/detail/${evaluationItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

//월간 지표 조회
export const fetchIndicators = async (contractId, yearMonth) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/${contractId}/indicators`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { date: yearMonth },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};

//사용자 지표 관리 자세히보기 클릭 후의 화면에 사용되는 지표의 상세 정보
export const fetchEvaluationDetail = async (evaluationItemId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/detail/${evaluationItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation detail:", error);
    throw error;
  }
};
//서비스 지표에 대한 장비별 통계 API
export const fetchEvaluationEquipment = async (evaluationItemId, date) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `/common/statistics/evaluation-item/${evaluationItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation equipment data:", error);
    throw error;
  }
};

export const fetchServiceUptime = async (evaluationItemId, date) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        date,
        evaluationItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error 서비스 가동률:", error);
    throw error;
  }
};

export const fetchCommonServiceStatistics = async (evaluationItemId, date) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/service-statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        date,
        evaluationItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error 서비스요청 적기처리율:", error);
    throw error;
  }
};

export const fetchCommonIncidentStatistics = async (evaluationItemId, date) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/incident-statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        date,
        evaluationItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error 장애적기처리율:", error);
    throw error;
  }
};

export const fetchServiceStatistics = async (evaluationId, date) => {
  try {
    // date를 yyyy-MM-dd 형식으로 변환
    const response = await axios.get("/contract-manager/service-statistic", {
      params: {
        evaluationId: evaluationId,
        date: date,
      },
    });
    return response.data.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching service statistics:", error);
    throw error; // 에러 발생 시 처리
  }
};

export const fetchServiceOperationStatistics = async (evaluationId, date) => {
  try {
    const formattedDate = date.toISOString().split("T")[0]; // date를 yyyy-MM-dd 형식으로 변환
    const response = await axios.get("/contract-manager/service-statistic", {
      params: {
        evaluationId: evaluationId,
        date: date,
      },
    });
    return response.data.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching service statistics:", error);
    throw error; // 에러 발생 시 처리
  }
};

export const fetchEvaluationItemCategory = async (contractId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `common/evaluation-item-category/${contractId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("에러 메세지를 몰러유");
    throw error;
  }
};
