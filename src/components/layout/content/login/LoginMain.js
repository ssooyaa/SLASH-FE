import React from "react";
import LoginTitle from "./LoginTitle";
import "../../../../styles/Login.css";
const LoginMain = ({ children }) => {
    return (
        <div className="loginPage">
            <div className="loginContainer">
                <LoginTitle />
                {children}
            </div>
        </div>
    );
};

export default LoginMain;
