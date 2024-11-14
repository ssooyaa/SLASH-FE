import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Content.css";
import "../../../styles/Sidebar.css";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js";
import { PiCalendarDuotone } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";

const UserSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(0); // 기본으로 홈을 active로 설정
  const location = useLocation();

  // 컴포넌트가 마운트될 때 URL 경로에 따라 activeIndex를 설정
  useEffect(() => {
    const pathToIndexMap = {
      "/user": 0,
      "/user/requestManagement": 1,
      "/user/indexManagement": 3,
      "": 4,
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
            <Link
              to="/user"
              className={`navLink ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />홈
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/user/requestManagement"
              className={`navLink ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleMenuClick(1)}
            >
              <MdQuestionMark className="navLinkIcon" />
              요청 관리
            </Link>
          </li>
          <li className="navItem2">
            <FiTrendingUp className="navLinkIcon" />
            통계 결과
          </li>
          <li className="navItemSmall">
            <Link
              to="/user/indexManagement"
              className={`navLink ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleMenuClick(2)}
            >
              <IoCalendarNumberOutline className="navLinkIcon" />
              월간 통계
            </Link>
          </li>
          <li className="navItemSmall">
            <Link
              to="/user/indexManagement"
              className={`navLink ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleMenuClick(3)}
            >
              <PiCalendarDuotone className="navLinkIcon" />
              연간 통계
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

export default UserSidebar;
