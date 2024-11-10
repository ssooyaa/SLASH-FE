// src/hooks/useLogin.js
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ id: "", password: "" });

    // 비밀번호 가시성 토글
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    // 로그인 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = getLoginFormErrors(id, password);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/login",
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

            const decoded = jwtDecode(accessToken);

            // 권한에 따른 페이지 이동
            switch (decoded.auth) {
                case "ROLE_CONTRACT_MANAGER":
                    navigate("/contractManager");
                    break;
                case "ROLE_REQUEST_MANAGER":
                    navigate("/requestManager");
                    break;
                case "ROLE_USER":
                    navigate("/user");
                    break;
                default:
                    navigate("/error");
            }
        } catch (error) {
            console.error("로그인 실패:", error.response?.data);
            setErrors((prev) => ({
                ...prev,
                password: "로그인 실패. 다시 시도해주세요.",
            }));
        }
    };

    // 입력 값 검증
    const getLoginFormErrors = (id, password) => {
        const errors = {};
        if (!id) errors.id = "아이디를 입력해주세요.";
        if (!password) errors.password = "비밀번호를 입력해주세요.";
        return errors;
    };

    // 반환할 값과 함수들
    return {
        id,
        setId,
        password,
        setPassword,
        isPasswordVisible,
        togglePasswordVisibility,
        errors,
        handleSubmit,
    };
};

export default useLogin;
