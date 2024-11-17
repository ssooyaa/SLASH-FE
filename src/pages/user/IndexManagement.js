import React, { useState } from "react";
import UserSidebar from "../../components/layout/sidebar/UserSidebar";
import "../../styles/Content.css";
import IndexManagementContent from "../../components/layout/content/contractManager/statisticsResults/IndexManagementContent";

const IndexManagement = () => {
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

      <IndexManagementContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default IndexManagement;
