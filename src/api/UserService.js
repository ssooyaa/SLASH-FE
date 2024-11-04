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

export const getMonthlyData = async (selectedYear, selectedMonth) => {
    try {
        const params = {year: selectedYear, month: selectedMonth};
        console.log("전송 값:", params);

        const response = await axios.get("/request-manager/monthly-data", {params});
        console.log("서버 응답:", JSON.stringify(response.data, null, 2));

        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("데이터 전송 오류:", error);

        return null; // 오류 발생 시 null 반환
    }
};

export const getManagerTaskStatus = async () => {
    try {
        const response = await axios.get("/contract-manager/status");
        console.log("서버 응답:", JSON.stringify(response.data, null, 2));

        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("데이터 전송 오류:", error);
        return []; // 오류 발생 시 null 반환
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

export const fetchServiceInfo = async (categoryId) => {
    try {
        const response = await axios.get(`/detail/${categoryId}`);

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

export const assignTaskManager = async (dto) => {
    try {
        const response = await axios.patch('/request/allocate', dto);
        console.log("전송 데이터:", dto); // 전송 데이터 출력

        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("요청 중 오류 발생:", error); // 전체 오류 정보 출력
    }
}
