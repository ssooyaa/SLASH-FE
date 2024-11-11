import axios from "axios";

// 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080";

export const authLogin = async (id, password) => {
    try {
        const response = await axios.post(
            "/login",
            { id, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const { accessToken } = response.data.data;
        
        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", id);

        return { accessToken, success: true };
    } catch (error) {
        console.error("로그인 실패:", error.response?.data);
        return { success: false, message: "로그인 실패. 다시 시도해주세요." };
    }
};
