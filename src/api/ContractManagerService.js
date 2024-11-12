// import axios from "axios";
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
