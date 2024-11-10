import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import LoginInputGroup from "../../components/layout/content/login/LoginInputGroup";
import LoginErrorMessage from "../../components/layout/content/login/LoginErrorMessage";
import LoginMain from "../../components/layout/content/login/LoginMain";
import useLogin from "../../hooks/useLogin";
import "../../styles/Login.css";

const Login = () => {
  const {
    id,
    setId,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    errors,
    setErrors,
    handleSubmit,
} = useLogin();

  return (
    <LoginMain>
          <form className="loginForm" onSubmit={handleSubmit}>
            <LoginInputGroup
              type="text"
              value={id}
              placeholder="아이디"
              onChange={(e) => {
                setId(e.target.value);
                setErrors((prev) => ({ ...prev, id: "" }));
              }}
              icon={<FaUser className="inputIcon" />}
              error={errors.id}
            />
            <LoginErrorMessage message={errors.id} />

            <LoginInputGroup
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              placeholder="비밀번호"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              icon={<FaLock className="inputIcon" />}
              isPassword
              toggleVisibility={togglePasswordVisibility}
              error={errors.password}
            />
            <LoginErrorMessage message={errors.password} />

            <button type="submit" className="loginButton">
              로그인
            </button>
          </form>
        
    </LoginMain>
  );
};

export default Login;
