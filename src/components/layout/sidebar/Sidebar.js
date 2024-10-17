import React from 'react';
import './Sidebar.css'; // 스타일을 위한 CSS 파일
import logo from '../../../assets/images/logo.png'; // 이미지 import

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="menu">
        <aside>
            <img src={logo} alt="Logo" className="logo" />
            <span className="sidebar-title">SLASH</span>
         
          {/* 각 메뉴 항목 */}
          <div className='menulist'>
            <a href="#">
              <i className="fa fa-home" aria-hidden="true"></i> 홈
            </a>
            <a href="#">
              <i className="fa fa-tachometer" aria-hidden="true"></i> 대시보드
            </a>
            <a href="#">
              <i className="fa fa-cogs" aria-hidden="true"></i> 지표관리
            </a>
            <a href="#">
              <i className="fa fa-question-circle" aria-hidden="true"></i> 요청 관리
            </a>
          </div>
        </aside>
      </nav>

      {/* 저작권 정보 */}
      <div className="copyright">© 2024 SLASH ERP</div>
    </div>
  );
};

export default Sidebar;
