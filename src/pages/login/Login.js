import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import SlashLogo from "../../assets/images/logo.png";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ id: "", password: "" });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = getLoginFormErrors(id, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("로그인 성공:", { id, password });
    }
  };

  const getLoginFormErrors = (id, password) => {
    const errors = {};
    if (!id) errors.id = "아이디를 입력해주세요.";
    if (!password) errors.password = "비밀번호를 입력해주세요.";
    // else if (password.length < 8) errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    return errors;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="header">
          <img src={SlashLogo} alt="slash" />
          <h3>SLASH</h3>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className={`input-group ${errors.id ? "incorrect" : ""}`}>
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setErrors((prev) => ({ ...prev, id: "" }));
              }}
            />
          </div>
          <div className={`error-message ${errors.id ? "active" : ""}`}>
            {errors.id}
          </div>

          <div className={`input-group ${errors.password ? "incorrect" : ""}`}>
            <FaLock className="input-icon" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            <div
              className="toggle-visibility"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className={`error-message ${errors.password ? "active" : ""}`}>
            {errors.password}
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
