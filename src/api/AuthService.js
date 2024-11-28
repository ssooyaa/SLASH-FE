import axios from "./Interceptor";

export const authLogin = async (id, password) => {
  try {

    const response = await axios.post("/login", { id, password });
    return response.data;
  } catch (error) {
    console.error("ERROR: ", error.response.data);
    return { success: false, message: "로그인 실패. 다시 시도해주세요." };
  }
};
