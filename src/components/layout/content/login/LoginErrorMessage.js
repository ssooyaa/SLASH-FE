import "../../../../styles/Login.css";

const LoginErrorMessage = ({ message }) => {
  return (
    <div className={`errorMessage ${message ? "active" : ""}`}>{message}</div>
  );
};

export default LoginErrorMessage;
