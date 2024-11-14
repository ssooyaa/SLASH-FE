import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Sidebar.css";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import { FaFileContract, FaTasks } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js";

const ContractManagerSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState();
  const location = useLocation();

  // 컴포넌트 마운트 시 URL 경로에 따라 activeIndex 설정
  useEffect(() => {
    const pathToIndexMap = {
      "/contractManager": 0,
      "/contractManager/contractList": 0,
      "/contractManager/statisticsResult": 1,
      "/contractManager/indicatorCalculator": 2,
      "/contractManager/requestAllocation": 3,
    };

    const currentPath = location.pathname;
    if (pathToIndexMap[currentPath] !== undefined) {
      setActiveIndex(pathToIndexMap[currentPath]);
    }
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    toggleNav(); // 사이드바 열림/닫힘 전환
  };

  return (
    <nav
      className={`nav navOffcanvas${effectClass} ${isNavOpen ? "is-opened" : ""}`}
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
              to="/contractManager/contractList"
              className={`navLink ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />
              계약 관리
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/contractManager/statisticsResult"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1)}
            >
              <FaFileContract className="navLinkIcon" />
              통계 결과
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/contractManager/indicatorCalculator"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <FiTrendingUp className="navLinkIcon" />
              지표 계산
            </Link>
          </li>

          <li className="navItem">
            <Link
              to="/contractManager/requestAllocation"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleMenuClick(3)}
            >
              <FaTasks className="navLinkIcon" />
              요청 할당
            </Link>
          </li>
        </ul>

        <div className="logoutSection">
          <LogoutButton />
        </div>

        <footer className="sidebarFooter">© 2024 SLASH ERP</footer>
      </aside>
    </nav>
  );
};

export default ContractManagerSidebar;
