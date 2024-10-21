import React, { useState } from "react";
import RequestManagerSidebar from "../../components/layout/sidebar/RequestManagerSidebar";
import Content from "../../components/layout/content/Content";

const RequestManager = () => {
  const [isNavOpen, setNavOpen] = useState(false);
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
      <Content
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default RequestManager;
