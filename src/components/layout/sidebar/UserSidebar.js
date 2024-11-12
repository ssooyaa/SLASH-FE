import React, { useState } from "react";
import "../../../styles/Content.css";
import "../../../styles/Sidebar.css";
import { FiHome, FiBarChart2 } from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js"

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
