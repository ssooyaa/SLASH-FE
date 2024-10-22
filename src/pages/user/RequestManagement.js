import React, { useState } from "react";
import UserSidebar from "../../components/layout/sidebar/UserSidebar";
import "../../styles/Content.css";
import RequestManagementContent from "../../components/layout/content/user/requestManagement/RequestManagementContent";

const RequestManagement = () => {
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

      <RequestManagementContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default RequestManagement;
