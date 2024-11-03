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
  console.log(JSON.stringify(taskRequestDto));
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
