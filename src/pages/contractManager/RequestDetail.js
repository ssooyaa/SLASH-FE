import React, {useState} from 'react';
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";
import RequestDetailContent from "../../components/layout/content/contractManager/RequestDetailContent";

const RequestDetail = () => {
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

            <RequestDetailContent
                isNavOpen={isNavOpen}
                toggleNav={toggleNav}
                effectClass={effectClass}
            />
        </div>
    );
};

export default RequestDetail;