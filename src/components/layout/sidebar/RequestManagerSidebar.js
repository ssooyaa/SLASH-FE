import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Sidebar.css";
import { FiHome } from "react-icons/fi";
import { FaFileContract } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js";

const RequestManagerSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState();
  const location = useLocation();

  useEffect(() => {
    const pathToIndexMap = {
      "/requestManager": 0,
      "/requestManager/status": 1,
    };

    const currentPath = location.pathname;
    setActiveIndex(pathToIndexMap[currentPath] ?? 0); // 해당 경로에 따라 activeIndex 설정
  }, [location]);

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
            <Link
              to="/requestManager"
              className={`navLink ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />홈
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/requestManager/status"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1)}
            >
              <FaFileContract className="navLinkIcon" />
              업무 내역
            </Link>
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

export default RequestManagerSidebar;
