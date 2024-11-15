import React, { useState } from "react";
import UserSidebar from "../../components/layout/sidebar/UserSidebar";
import "../../styles/Content.css";
import YearIndicatorInfo from "../../components/layout/content/contractManager/yearIndicator/YearIndicatorInfo";

const UserYearIndicator = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  //TODO: 헤더 추가

  return (
    <div>
      <UserSidebar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
        setEffectClass={setEffectClass}
      />
      <YearIndicatorInfo
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default UserYearIndicator;
