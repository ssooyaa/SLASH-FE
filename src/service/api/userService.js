import axios from "axios";

// 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

export const fetchSystemAndEquipments = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get("/common/all-systems", {
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

export const fetchTaskTypes = async (contractId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/user/all-task-types/${contractId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = localStorage.getItem("accessToken");

    const response = await axios.post("/user/request", taskRequestDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/request/${requestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

export const deleteRequest = async (requestId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(`/user/request/${requestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const editRequest = async (requestId, taskRequestDto) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `/user/request/${requestId}`,
      taskRequestDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};
