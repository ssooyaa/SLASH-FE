import React, { useState } from "react";
import "../../../styles/Content.css";
import "../../../styles/Sidebar.css";
import { FiHome, FiBarChart2, FiLogOut } from "react-icons/fi";
import { MdAssignment, MdEventNote, MdQuestionMark } from "react-icons/md";
import logo from "../../../assets/images/logo.png";
import { FaFileContract } from "react-icons/fa6";
import { FaRegClipboard } from "react-icons/fa";

const UserSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
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
              href="/user/requestManagement"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <MdQuestionMark className="navLinkIcon" />
              요청 관리
            </a>
          </li>
          <li className="navItem">
            <a
              href="/user/indexManagement"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleMenuClick(3)}
            >
              <MdEventNote className="navLinkIcon" />
              지표 관리
            </a>
            <li className="navItemSmall">월간 지표</li>
            <li className="navItemSmall">연간 지표</li>
          </li>
        </ul>

        {/* 로그아웃 버튼 추가 */}
        <div className="logoutSection">
          <button className="logoutBtn">
            <FiLogOut className="logoutIcon" />
            Logout
          </button>
        </div>

        {/* 푸터 추가 */}
        <footer className="sidebarFooter">© 2024 SLASH ERP</footer>
      </aside>
    </nav>
  );
};

export default UserSidebar;
