import React from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import EstimateIndicatorEdit from "./EstimateIndicatorEdit";
const EstimateIndicatorEditContent = ({
  isNavOpen,
  toggleNav,
  effectClass,
}) => {
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
        <div className="contentBox">
          <EstimateIndicatorEdit />
        </div>
      </div>
    </div>
  );
};
export default EstimateIndicatorEditContent;
