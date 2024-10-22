import React, { useState } from "react";
import RequestManagerSidebar from "../../components/layout/sidebar/RequestManagerSidebar.js";
import RequestManagerContent from "../../components/layout/requestManager/RequestManagerMainContent.js.js";

const RequestManager = () => {
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
      <RequestManagerContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default RequestManager;
