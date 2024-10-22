import React, { useState } from "react";
import UserSidebar from "../../components/layout/sidebar/UserSidebar";
import UserContent from "../../components/layout/content/user/UserMainContent";
import "../../styles/Content.css";

const User = () => {
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

      <UserContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default User;
