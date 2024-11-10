import React, {useState} from "react";
import RequestManagerSidebar from "../../components/layout/sidebar/RequestManagerSidebar.js";
import RequestManagerStatusContent from "../../components/layout/content/requestManager/RequestManagerStatusContent";

const RequestManagerStatus = () => {
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
      <RequestManagerStatusContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default RequestManagerStatus;
