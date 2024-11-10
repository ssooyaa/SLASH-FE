import SlashLogo from "../../../../assets/images/logo.png";
import "../../../../styles/Login.css";

const LoginTitle = () => {
  return (
    <div className="loginHeader">
      <img src={SlashLogo} alt="slash" />
      <h3>SLASH</h3>
    </div>
  );
};

export default LoginTitle;
