import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Route } from "react-router-dom";
import "../../../styles/Sidebar.css";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import { FaFileContract, FaTasks } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js";

const ContractManagerSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(0); // 기본값을 0으로 설정
  const navigate = useNavigate();
  const location = useLocation();

  // 컴포넌트 마운트 시 URL 경로에 따라 activeIndex 설정
  useEffect(() => {
    const pathToIndexMap = {
      "/contractManager": 0,
      "/contractManager/contractList": 1,
      "/contractManager/requestAllocation": 2,
      "/contractManager/indicatorCalculator": 3,
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
    localStorage.setItem("activeIndex", index); // 로컬 스토리지에 인덱스를 저장
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
              onClick={() => handleMenuClick(0, "/contractManager")}
            >
              <FiHome className="navLinkIcon" />홈
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() =>
                handleMenuClick(1, "/contractManager/contractList")
              }
            >
              <FaFileContract className="navLinkIcon" />
              계약 관리
            </a>
          </li>

          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() =>
                handleMenuClick(2, "/contractManager/requestAllocation")
              }
            >
              <FaTasks className="navLinkIcon" />
              요청 할당
            </a>
          </li>

          <li className="navItem">
            <a
              href="#"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() =>
                handleMenuClick(3, "/contractManager/indicatorCalculator")
              }
            >
              <FiTrendingUp className="navLinkIcon" />
              지표 계산
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

export default ContractManagerSidebar;
