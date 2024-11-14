import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Sidebar.css";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import { FaFileContract, FaTasks } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { PiCalendarDuotone } from "react-icons/pi";
import { RiNumbersLine } from "react-icons/ri";

const ContractManagerSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState();
  const location = useLocation();

  // Set activeIndex based on URL path
  useEffect(() => {
    const pathToIndexMap = {
      "/contractManager": 0,
      "/contractManager/statisticsResult": 1,
      "/contractManager/annualIndexManagement": 2,
      "/contractManager/indicatorCalculator": 3,
      "/contractManager/requestAllocation": 4,
    };

    const currentPath = location.pathname;
    if (pathToIndexMap[currentPath] !== undefined) {
      setActiveIndex(pathToIndexMap[currentPath]);
    }
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    toggleNav(); // Toggle sidebar open/close
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
              to="/contractManager"
              className={`navLink ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />
              계약 관리
            </Link>
          </li>
          <li className="navItem2">
            <span className="navLinkIcon2">
              <RiNumbersLine />
            </span>
            통계 결과
          </li>
          <li className="navItemSmall">
            <Link
              to="/contractManager/statisticsResult"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1)}
            >
              <IoCalendarNumberOutline className="navLinkIcon" />
              월간 통계
            </Link>
          </li>
          <li className="navItemSmall">
            <Link
              to="/contractManager/annualIndexManagement"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <PiCalendarDuotone className="navLinkIcon" />
              연간 통계
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/contractManager/indicatorCalculator"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleMenuClick(3)}
            >
              <FiTrendingUp className="navLinkIcon" />
              지표 계산
            </Link>
          </li>

          <li className="navItem">
            <Link
              to="/contractManager/requestAllocation"
              className={`navLink ${activeIndex === 4 ? "active" : ""}`}
              onClick={() => handleMenuClick(4)}
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
