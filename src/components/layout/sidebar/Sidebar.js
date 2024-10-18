import React, { useState } from 'react';
import './Sidebar.css'; // 스타일을 위한 CSS 파일
import logo from '../../../assets/images/logo.png'; // 이미지 import

// React Icons import
import { FiHome, FiBarChart2, FiTrendingUp, FiClipboard } from 'react-icons/fi';


const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null); // 활성화된 메뉴 상태 관리
  const handleMenuClick = (index) => {
    setActiveIndex(index); // 클릭된 메뉴 항목의 인덱스를 저장
  };

  return (
    <div className="sidebar">
      <nav className="menu">
        <aside>
          <img src={logo} alt="Logo" className="logo" />
          <span className="sidebar-title">SLASH</span>

          <div className="navList">
            <a
              href="#"
              className={activeIndex === 0 ? 'active' : ''}
              onClick={() => handleMenuClick(0)}
            >
              <FiHome className="navLinkIcon" />
              홈
            </a>
            <a
              href="#"
              className={activeIndex === 1 ? 'active' : ''}
              onClick={() => handleMenuClick(1)}
            >
              <FiBarChart2 className="navLinkIcon" />
              대시보드
            </a>
            <a
              href="#"
              className={activeIndex === 2 ? 'active' : ''}
              onClick={() => handleMenuClick(2)}
            >
              <FiTrendingUp className="navLinkIcon" />
              지표 관리
            </a>
            <a
              href="#"
              className={activeIndex === 3 ? 'active' : ''}
              onClick={() => handleMenuClick(3)}
            >
              <FiClipboard className="navLinkIcon" />
              요청 관리
            </a>
          </div>
        </aside>
      </nav>
    </div>
  );
};

export default Sidebar;
