import React, { useState } from 'react';
import './App.css'; // 전체 스타일 관리
import Content from './components/layout/content/Content';
import Sidebar from './components/layout/sidebar/Sidebar';

const App = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div className="page">
      <Sidebar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
        setEffectClass={setEffectClass}
      />
      <Content
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
      
    </div>
  );
};

export default App;
