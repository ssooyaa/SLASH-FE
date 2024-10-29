import axios from "axios";

// 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

export const fetchSystemAndEquipments = async () => {
  try {
    const response = await axios.get("/all-systems");

    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const fetchTaskTypes = async () => {
  try {
    const response = await axios.get("/all-task-types");
    console.log(response.data);
    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const createRequest = async (taskRequestDto) => {
  try {
    const response = await axios.post("/request", taskRequestDto);
    if (response.data.success) {
      return response.data.success;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const showRequestDetail = async (requestId) => {
  try {
    const response = await axios.get(`/request/${requestId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};
