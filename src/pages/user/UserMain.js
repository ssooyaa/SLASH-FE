import React, { useState } from "react";
import UserSidebar from "../../components/layout/sidebar/UserSidebar";
import "../../styles/Content.css";
import UserMainContent from "../../components/layout/content/user/UserMainContent";

const UserMain = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  return (
    <div>
      <UserSidebar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
        setEffectClass={setEffectClass}
      />

      <UserMainContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default UserMain;
