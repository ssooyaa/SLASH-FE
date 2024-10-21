import React from "react";
import "./Content.css"; // Content 관련 CSS 파일 분리
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";

const Content = ({ isNavOpen, toggleNav, effectClass }) => {
  return (
    <div
      className={`pageContent pageContentOffcanvas${effectClass} ${
        isNavOpen ? "jsOpened" : ""
      }`}
    >
      <button
        className={`navOpenBtn ${isNavOpen ? "jsHidden" : ""}`}
        onClick={toggleNav}
      >
        <FaBars />
      </button>

      {/* 프로필 및 환영 메시지 추가 */}
      <div className="profileSection">
        <div className="profileInfo">
          <IoPersonCircle className="profileImg" />
          <span className="welcomeText">관리자님 환영합니다</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="content">
        <h1>컨텐츠 공간</h1>
      </div>
    </div>
  );
};

export default Content;
