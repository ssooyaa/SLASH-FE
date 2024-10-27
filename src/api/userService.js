// 사용자 관련 API 호출 함수 모음 (예: 사용자 정보 가져오기)
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
