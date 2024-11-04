import React, { useState } from "react";
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";
import "../../styles/Content.css";
import UpdateContractInfo from "../../components/layout/content/contractManager/contract/UpdateContractInfo";

const UpdateContract = () => {
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
      <UpdateContractInfo
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};
export default UpdateContract;
