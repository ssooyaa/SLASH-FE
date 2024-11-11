import React, { useState } from "react";
import UserSidebar from "../../components/layout/sidebar/UserSidebar";
import DetailIndexContent from "../../components/layout/content/user/detailIndex/DetailIndexContent";

const DetailIndex = () => {
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

      <DetailIndexContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default DetailIndex;
