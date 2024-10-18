import React, { useState } from 'react';
import './Sidebar2.css'; 
import { FiHome, FiBarChart2, FiTrendingUp, FiClipboard } from 'react-icons/fi';

import logo from '../../../assets/images/logo.png'; 

const Sidebar2 = ({ isNavOpen, toggleNav, effectClass }) => {
  const [activeIndex, setActiveIndex] = useState(null); 

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className={`nav nav--offcanvas-${effectClass} ${isNavOpen ? 'is-opened' : ''}`}>
      <div className="navClose" onClick={toggleNav}></div>

      <div className="navHeader">
        <img src={logo} alt="Logo" className="logo" />
        <span className="sidebarTitle">SLASH</span>
      </div>

      <ul className="navList">
        <li className="navItem">
          <a
            href="#"
            className={`navLink ${activeIndex === 0 ? 'active' : ''}`}
            onClick={() => handleMenuClick(0)}
          >
            <FiHome className="navLinkIcon" />
            홈
          </a>
        </li>
        <li className="navItem">
          <a
            href="#"
            className={`navLink ${activeIndex === 1 ? 'active' : ''}`}
            onClick={() => handleMenuClick(1)}
          >
            <FiBarChart2 className="navLinkIcon" />
            대시보드
          </a>
        </li>
        <li className="navItem">
          <a
            href="#"
            className={`navLink ${activeIndex === 2 ? 'active' : ''}`}
            onClick={() => handleMenuClick(2)}
          >
            <FiTrendingUp className="navLinkIcon" />
            지표 관리
          </a>
        </li>
        <li className="navItem">
          <a
            href="#"
            className={`navLink ${activeIndex === 3 ? 'active' : ''}`}
            onClick={() => handleMenuClick(3)}
          >
            <FiClipboard className="navLinkIcon" />
            요청 관리
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar2;
