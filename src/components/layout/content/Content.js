import React from 'react';
import './Content.css'; // Content 관련 CSS 파일 분리
import { FaBars } from "react-icons/fa6";

const Content = ({ isNavOpen, toggleNav, effectClass }) => {
  return (
    <div className={`page__content page__content--offcanvas-${effectClass} ${isNavOpen ? 'js-opened' : ''}`}>
      <button className={`nav-open-btn ${isNavOpen ? 'js-hidden' : ''}`} onClick={toggleNav}>
        <FaBars/>
      </button>
      <div className="content">
      </div>
    </div>
  );
};

export default Content;
