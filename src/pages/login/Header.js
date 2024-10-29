import SlashLogo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div className="login-header">
      <img src={SlashLogo} alt="slash" />
      <h3>SLASH</h3>
    </div>
  );
};

export default Header;
