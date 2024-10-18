import React, { useState } from 'react';
import './App.css'; // 전체 스타일 관리
import Sidebar2 from './components/layout/sidebar/Sidebar2';
import Content from './components/layout/content/Content';

const App = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div className="page">
      <Sidebar2
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
