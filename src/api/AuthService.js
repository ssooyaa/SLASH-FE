import axios from "./Interceptor";

export const authLogin = async (id, password) => {
  try {
    console.log("로그인중");
    const response = await axios.post("/login", { id, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "로그인 실패. 다시 시도해주세요." };
  }
};
