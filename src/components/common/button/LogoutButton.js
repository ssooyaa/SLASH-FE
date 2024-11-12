import React from "react";
import "../../../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. localStorage에서 토큰 삭제
        localStorage.removeItem("accessToken");

        // 2. 히스토리 교체로 뒤로가기 방지
        window.history.replaceState(null, "", "/");

        // 3. 로그인 페이지로 리디렉션
        navigate("/");
    };

    return (
        <button className="logoutBtn" onClick={handleLogout}>
            <FiLogOut className="logoutIcon" />
            Logout
        </button>
    );
};

export default LogoutButton;
