import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/Content.css";
import "../../../styles/Sidebar.css";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";
import logo from "../../../assets/images/logo.png";
import { FaTasks } from "react-icons/fa";
import LogoutButton from "../../common/button/LogoutButton.js";

const UserSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(0); // 디폴트로 홈을 active로 설정
  const location = useLocation();

  // 컴포넌트 마운트 시 URL 경로에 따라 activeIndex 설정
  useEffect(() => {
    const pathToIndexMap = {
      "/user": 0,
      "/user/requestManagement": 1,
      "/user/indexManagement": 2,
      "/user/requestAllocation": 3,
    };

    const currentPath = location.pathname;
    const savedIndex = localStorage.getItem("activeIndex");

    // 저장된 인덱스가 있으면 사용, 없으면 URL을 기반으로 인덱스 설정
    if (savedIndex !== null) {
      setActiveIndex(parseInt(savedIndex, 10));
    } else if (pathToIndexMap[currentPath] !== undefined) {
      setActiveIndex(pathToIndexMap[currentPath]);
    }
  }, [location]);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index); // 클릭된 인덱스를 로컬 스토리지에 저장
  };

  return (
    <nav
      className={`nav navOffcanvas${effectClass} ${
        isNavOpen ? "is-opened" : ""
      }`}
    >
      <div className="navClose" onClick={toggleNav}></div>

      <div className="navHeader">
        <img src={logo} alt="Logo" className="logo" />
        <span className="sidebarTitle">SLASH</span>
      </div>

      <aside>
        <ul className="navList">
          <li className="navItem">
            <a
              href="/user"
              className={`navLink ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />홈
            </a>
          </li>
          <li className="navItem">
            <a
              href="/user/requestManagement"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1)}
            >
              <MdQuestionMark className="navLinkIcon" />
              요청 관리
            </a>
          </li>
          <li className="navItem">
            <a
              href="/user/indexManagement"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <FiTrendingUp className="navLinkIcon" />
              지표 관리
            </a>
          </li>
          <li className="navItem">
            <a
              href="/user/requestAllocation"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleMenuClick(3)}
            >
              <FaTasks className="navLinkIcon" />
              요청 할당
            </a>
          </li>
        </ul>

        <div className="logoutSection">
          <LogoutButton />
        </div>

        {/* 푸터 추가 */}
        <footer className="sidebarFooter">© 2024 SLASH ERP</footer>
      </aside>
    </nav>
  );
};

export default UserSidebar;
