import React, { useState } from "react";
import axios from "axios"; // axios import
import { FaUser, FaLock } from "react-icons/fa";
import Header from "./Header";
import InputGroup from "./InputGroup";
import ErrorMessage from "./ErrorMessage";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ id: "", password: "" });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
      console.log("로그인 성공:", response.data);

      // 로그인 성공 후 주어진 redirectUrl로 이동
      const { redirectUrl } = response.data;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.warn("Redirect URL이 제공되지 않았습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response?.data);
      setErrors((prev) => ({
        ...prev,
        password: "로그인 실패. 다시 시도해주세요.",
      }));
    }
  };

  const getLoginFormErrors = (id, password) => {
    const errors = {};
    if (!id) errors.id = "아이디를 입력해주세요.";
    if (!password) errors.password = "비밀번호를 입력해주세요.";
    return errors;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Header />

        <form className="login-form" onSubmit={handleSubmit}>
          <InputGroup
            type="text"
            value={id}
            placeholder="아이디"
            onChange={(e) => {
              setId(e.target.value);
              setErrors((prev) => ({ ...prev, id: "" }));
            }}
            icon={<FaUser className="input-icon" />}
            error={errors.id}
          />
          <ErrorMessage message={errors.id} />

          <InputGroup
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            placeholder="비밀번호"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            icon={<FaLock className="input-icon" />}
            isPassword
            toggleVisibility={togglePasswordVisibility}
            error={errors.password}
          />
          <ErrorMessage message={errors.password} />

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
