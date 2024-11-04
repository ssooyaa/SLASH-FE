import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const CreateContract = async (requestContractDTO) => {
  try {
    const response = await axios.post("/contract", requestContractDTO);
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

export const CreateServiceDetail = async (requestContractDTO) => {
  try {
    const response = await axios.post("/detail", requestContractDTO);
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

export const fetchContractInfo = async () => {
  try {
    const response = await axios.get("/contract");

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
