import axios from "axios";
import apiClient from "./Interceptor";

apiClient.defaults.baseURL = "http://localhost:8080";

export const CreateContract = async (requestContractDTO) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await apiClient.post(
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

    const response = await apiClient.post(
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
