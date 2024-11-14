import React, { useState } from "react";
import "../../styles/Content.css";
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";
import IndexManagementContent from "../../components/layout/content/contractManager/statisticsResults/IndexManagementContent";
const StatisticsResults = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  return (
    <div>
      <ContractManagerSidebar
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

export default StatisticsResults;
