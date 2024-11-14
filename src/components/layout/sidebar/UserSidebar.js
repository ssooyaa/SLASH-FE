import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Content.css";
import "../../../styles/Sidebar.css";
import { FiHome } from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";
import logo from "../../../assets/images/logo.png";
import LogoutButton from "../../common/button/LogoutButton.js";
import { PiCalendarDuotone } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiNumbersLine } from "react-icons/ri";

const UserSidebar = ({ isNavOpen, toggleNav, effectClass }) => {
  const location = useLocation();

  // URL 경로에 따라 activeIndex 설정
  const pathToIndexMap = {
    "/user": 0,
    "/user/requestManagement": 1,
    "/user/indexManagement": 2,
    "/user/annualIndexManagement": 3, // 연간 통계 경로 맞춰 설정
  };

  const currentPath = location.pathname;
  const initialIndex = pathToIndexMap[currentPath] || 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    // URL이 변경될 때마다 activeIndex를 업데이트
    setActiveIndex(initialIndex);
  }, [location.pathname, initialIndex]);

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
            <span className="navLinkIcon2">
              <RiNumbersLine />
            </span>
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
              to="/user/annualIndexManagement" // 연간 통계 경로 맞춤
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
