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

export const fetchTaskDetails = async (taskType) => {
  try {
    const response = await axios.get(`/tasks`, {
      params: { type: taskType },
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
