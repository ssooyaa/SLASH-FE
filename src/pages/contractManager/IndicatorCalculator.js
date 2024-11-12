import React, {useState} from 'react';
import IndicatorCalculatorContent from "../../components/layout/content/contractManager/IndicatorCalculatorContent";
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";

const IndicatorCalculator = () => {
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
      <IndicatorCalculatorContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default IndicatorCalculator;
