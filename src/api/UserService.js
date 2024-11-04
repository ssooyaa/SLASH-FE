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
