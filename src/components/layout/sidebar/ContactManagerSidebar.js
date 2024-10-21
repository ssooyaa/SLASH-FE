import React, { useState } from "react";
import "./Sidebar.css";
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaFileContract } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";
import logo from "../../../assets/images/logo.png";

const ContractManagerSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
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
              <FaFileContract className="navLinkIcon" />
              계약 관리
            </a>
          </li>

          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <MdQuestionMark className="navLinkIcon" />
              요청 관리
            </a>
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

export default ContractManagerSidebar;
