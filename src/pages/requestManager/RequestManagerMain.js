import React, { useState } from "react";
import RequestManagerSidebar from "../../components/layout/sidebar/RequestManagerSidebar.js";
import RequestManagerMainContent from "../../components/layout/content/requestManager/RequestManagerMainContent.js";

const RequestManagerMain = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div>
      <RequestManagerSidebar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
        setEffectClass={setEffectClass}
      />
      <RequestManagerMainContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default RequestManagerMain;
