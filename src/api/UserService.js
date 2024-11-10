import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const CreateContract = async (requestContractDTO) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
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

    const response = await axios.post("/evaluation-item", requestContractDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/common/contract/${contractId}`, {
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

export const fetchServiceInfo = async (evaluationItemId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/detail/${evaluationItemId}`, {
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

export const getMonthlyData = async (selectedYear, selectedMonth) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = { year: selectedYear, month: selectedMonth };
    console.log("전송 값:", params);

    // axios 요청 수정
    const response = await axios.get("/request-manager/monthly-data", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);

    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const assignTaskManager = async (dto) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      "/contract-manager/request/allocate",
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("전송 데이터:", dto); // 전송 데이터 출력

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("요청 중 오류 발생:", error); // 전체 오류 정보 출력
  }
};

export const getManagerTaskStatus = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("/contract-manager/status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);
    return []; // 오류 발생 시 null 반환
  }
};
export const completeRequest = async (requestId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `/request-manager/request/complete?requestId=${requestId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("서버 응답:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("서버 응답 에러:", error.response.status, error.response.data);
    } else {
      console.error("요청 실패:", error.message);
    }
    return []; // 오류 발생 시 빈 배열 반환
  }
};


// 시스템 및 장비 데이터를 가져오는 함수
export const fetchSystemAndEquipment = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("/common/all-systems", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("시스템 및 장비 데이터를 가져오는 중 오류:", error);
    throw error;
  }
};

// 통계 데이터를 가져오는 함수
export const fetchStatistics = async (params) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("/common/statistics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("오류:", error);
    throw error;
  }
};

// 계약 데이터 가져오기 함수
export const fetchContractData = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("/common/contract/1", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("계약 데이터를 가져오는 중 오류:", error);
    throw error;
  }
};

// 드롭다운 옵션 데이터 가져오기
export const fetchOptions = async () => {
  try {
    const token = getAuthToken();
    const [systemsResponse, taskTypeResponse, taskDetailResponse] =
      await Promise.all([
        axios.get("/common/systems", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/common/task-type", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/common/task-detail", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

    return {
      equipmentTypeOptions: systemsResponse.data.data,
      taskTypeOptions: taskTypeResponse.data.data,
      taskDetailOptions: taskDetailResponse.data.data,
    };
  } catch (error) {
    console.error("Error fetching options:", error);
    throw error;
  }
};

// 토큰 가져오기
const getAuthToken = () => localStorage.getItem("accessToken");

// 요청 데이터 필터링하여 가져오기
export const fetchFilteredRequests = async (filters) => {
  try {
    const token = getAuthToken();
    const response = await axios.get("/common/requests", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        type:
          filters.selectedTaskType !== "전체"
            ? filters.selectedTaskType
            : undefined,
        equipmentName:
          filters.selectedEquipmentType !== "전체"
            ? filters.selectedEquipmentType
            : undefined,
        taskDetail:
          filters.selectedTaskDetail !== "전체"
            ? filters.selectedTaskDetail
            : undefined,
        status:
          filters.selectedStatus !== "전체"
            ? filters.statusMapping[filters.selectedStatus]
            : undefined,
        keyword: filters.searchTerm,
        page: filters.page,
        size: filters.size,
      },
    });

    return response.data.data || { results: [], totalPages: 0, currentPage: 1 };
  } catch (error) {
    console.error("Error fetching filtered requests:", error);
    throw error;
  }
};
