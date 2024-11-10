import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

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
    const response = await axios.get("/common/statistics",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    console.log(params)
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
