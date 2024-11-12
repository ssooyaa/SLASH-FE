import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../styles/Sidebar.css";
import { FiHome } from "react-icons/fi";
import { FaFileContract } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js"

const RequestManagerSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(0); // 기본값 설정
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathToIndexMap = {
      "/requestManager": 0,
      "/requestManager/taskDetails": 1,
    };

    const currentPath = location.pathname;
    const savedIndex = localStorage.getItem("activeIndex");

    if (savedIndex !== null) {
      setActiveIndex(parseInt(savedIndex, 10));
    } else if (pathToIndexMap[currentPath] !== undefined) {
      setActiveIndex(pathToIndexMap[currentPath]);
    }
  }, [location]);

  const handleMenuClick = (index, path) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index);
    navigate(path);
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
              onClick={() => handleMenuClick(0, "/requestManager")}
            >
              <FiHome className="navLinkIcon" />홈
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1, "/requestManager/taskDetails")}
            >
              <FaFileContract className="navLinkIcon" />
              업무 내역
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

export default RequestManagerSidebar;
