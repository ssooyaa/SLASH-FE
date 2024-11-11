import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

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

export const fetchAllContractName = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get("/common/all-contract-name", {
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

export const fetchServiceInfo = async (evaluationItemId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/common/detail/${evaluationItemId}`, {
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

//월간 지표 api
// export const fetchIndicators = async (contractId, year, month) => {
//   try {
//     const token = localStorage.getItem("accessToken"); // 토큰 가져오기

//     const response = await axios.get(
//       `/common/${contractId}/indicators/${year}/${month}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (response.status === 200 && response.data) {
//       console.log("API Response:", response.data);
//       return response.data;
//     } else {
//       console.warn("Unexpected API response:", response);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching indicators:", error);
//     return null;
//   }
// };

//사용자 지표 관리 자세히보기 클릭 후의 화면에 사용되는 함수
export const fetchEvaluationDetail = async (evaluationItemId) => {
  try {
    const mockData = {
      success: true,
      data: {
        evaluationItems: {
          contractId: 1,
          evaluationItemId: 2,
          category: "장애 적기처리율",
          weight: 30,
          period: "월별",
          purpose:
            "장애의 처리시간을 최소화하여 서비스 중단시간을 최소화하기 위함",
          formula: "지연 처리 건수",
          unit: "건수",
          serviceTargets: [
            {
              grade: "A",
              min: 0.0,
              max: 0.0,
              score: 0.0,
              minInclusive: true,
              maxInclusive: true,
            },
            {
              grade: "B",
              min: 0.0,
              max: 1.0,
              score: 0.0,
              minInclusive: true,
              maxInclusive: true,
            },
            {
              grade: "C",
              min: 1.0,
              max: 3.0,
              score: 0.0,
              minInclusive: false,
              maxInclusive: true,
            },
            {
              grade: "D",
              min: 3.0,
              max: 5.0,
              score: 0.0,
              minInclusive: false,
              maxInclusive: true,
            },
            {
              grade: "E",
              min: 5.0,
              max: 6.0,
              score: 0.0,
              minInclusive: false,
              maxInclusive: true,
            },
          ],
        },
        taskTypes: [
          {
            type: "장애 요청",
            taskDetail: "단순 장애",
            deadline: 8,
            serviceRelevance: false,
            inclusionStatus: true,
          },
          {
            type: "장애 요청",
            taskDetail: "단순 장애",
            deadline: 4,
            serviceRelevance: true,
            inclusionStatus: true,
          },
          {
            type: "장애 요청",
            taskDetail: "복합 장애",
            deadline: 8,
            serviceRelevance: true,
            inclusionStatus: true,
          },
          {
            type: "장애 요청",
            taskDetail: "복합 장애",
            deadline: 24,
            serviceRelevance: false,
            inclusionStatus: true,
          },
        ],
      },
    };

    // Return mock data for testing
    return mockData;
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};
//지표 관리 자세히보기 클릭 후 페이지 (서비스 지표에 대한 장비별 결과 조회)
export const fetchEvaluationEquipment = async (id) => {
  try {
    const mockData = {
      success: true,
      data: [
        {
          date: "2024-11-10",
          serviceType: "서비스요청 적기 처리율",
          targetEquipment: "시스템2",
          grade: "A",
          score: 1.0,
          period: "한달",
          weightedScore: 1.0,
          approvalStatus: true,
          totalDowntime: -1,
          requestCount: 1,
          evaluationItemId: 0,
          targetSystem: "A",
          estimate: 1.0,
          systemIncidentCount: 1,
          dueOnTimeCount: 1,
        },
        {
          date: "2024-11-10",
          serviceType: "서비스요청 적기 처리율",
          targetEquipment: "시스템",
          grade: "A",
          score: 1.0,
          period: "한달",
          weightedScore: 1.0,
          approvalStatus: true,
          totalDowntime: -1,
          requestCount: 1,
          evaluationItemId: 0,
          targetSystem: "A",
          estimate: 1.0,
          systemIncidentCount: 1,
          dueOnTimeCount: 1,
        },
        {
          date: "2024-11-10",
          serviceType: "서비스요청 적기 처리율",
          targetEquipment: "시스템",
          grade: "A",
          score: 1.0,
          period: "한달",
          weightedScore: 1.0,
          approvalStatus: true,
          totalDowntime: -1,
          requestCount: 1,
          evaluationItemId: 0,
          targetSystem: "A",
          estimate: 1.0,
          systemIncidentCount: 1,
          dueOnTimeCount: 1,
        },
      ],
    };
    return mockData;
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};

export const fetchIndicators = async (contractId, year, month) => {
  try {
    // Mock data for testing purposes
    const mockData = {
      success: true,
      data: {
        indicatorEtcInfo: {
          grade: "S",
          requestCount: 2,
          incidentTime: 0,
        },
        indicatorList: [
          {
            evaluationItemId: 2,
            category: "서비스 가동률",
            date: "2024-10-20",
            grade: "A",
            score: 100.0,
            targetSystem: "전체",
            auto: false,
          },
          {
            evaluationItemId: 3,
            category: "서비스요청 적기처리율",
            date: "2024-10-20",
            grade: "A",
            score: 100.0,
            targetSystem: "전체",
            auto: false,
          },
          {
            evaluationItemId: 4,
            category: "장애 요청 적기 처리율",
            date: "2024-10-20",
            grade: "A",
            score: 100.0,
            targetSystem: "전체",
            auto: false,
          },
        ],
      },
    };

    // Return mock data for testing
    return mockData;
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};
