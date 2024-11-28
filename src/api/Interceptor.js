import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://kimsuji.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 만료 여부 확인 함수
const isTokenExpired = (token) => {
  try {
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const exp = decodedPayload.exp;
    const currentTime = Math.floor(Date.now() / 1000); // 초 단위
    return exp < currentTime;
  } catch (error) {
    return true;
  }
};

// 요청 인터셉터: 모든 요청에 자동으로 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const currentPath = window.location.pathname;
    const token = localStorage.getItem("accessToken");
    if (currentPath !== "/" && token) {
      if (isTokenExpired(token)) {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      alert("인증이 만료되었습니다. 다시 로그인해 주세요.");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    // 403 Forbidden 에러 처리
    else if (status === 403) {
      alert("권한이 없습니다. 접근이 제한된 페이지입니다.");
      localStorage.removeItem("accessToken");
      window.location.href = "/error";
    } else {
    }
    return Promise.reject(error);
  }
);

export default apiClient;
