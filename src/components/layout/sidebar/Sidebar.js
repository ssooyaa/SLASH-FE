import React, { useState } from "react";
import "./Sidebar.css";
import {
  FiHome,
  FiBarChart2,
  FiTrendingUp,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi"; // 로그아웃 아이콘 추가
import logo from "../../../assets/images/logo.png";

const Sidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav
      className={`nav nav--offcanvas-${effectClass} ${
        isNavOpen ? "is-opened" : ""
      }`}
    >
      <div className="navClose" onClick={toggleNav}></div>

      <div className="nav-header">
        <img src={logo} alt="Logo" className="logo" />
        <span className="sidebarTitle">SLASH</span>
      </div>

      <aside>
        <ul className="navList">
          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />홈
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1)}
            >
              <FiBarChart2 className="navLinkIcon" />
              대시보드
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <FiTrendingUp className="navLinkIcon" />
              지표 관리
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleMenuClick(3)}
            >
              <FiClipboard className="navLinkIcon" />
              요청 관리
            </a>
          </li>
        </ul>

        {/* 로그아웃 버튼 추가 */}
        <div className="logout-section">
          <button className="logout-btn">
            <FiLogOut className="logout-icon" />
            Logout
          </button>
        </div>

        {/* 푸터 추가 */}
        <footer className="sidebar-footer">© 2024 SLASH ERP</footer>
      </aside>
    </nav>
  );
};

export default Sidebar;
