import React from 'react';
import './Content.css'; // Content 관련 CSS 파일 분리
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";

const Content = ({ isNavOpen, toggleNav, effectClass }) => {
  return (
    <div className={`page__content page__content--offcanvas-${effectClass} ${isNavOpen ? 'js-opened' : ''}`}>
      <button className={`nav-open-btn ${isNavOpen ? 'js-hidden' : ''}`} onClick={toggleNav}>
        <FaBars/>
      </button>
      
      {/* 프로필 및 환영 메시지 추가 */}
      <div className="profile-section">
        <div className="profile-info">
          <IoPersonCircle className='profile-img'/>
          <span className="welcome-text">관리자님 환영합니다</span>
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
