import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../../styles/Login.css";

const LoginInputGroup = ({
  type = "text",
  cls,
  value,
  placeholder,
  onChange,
  icon,
  error,
  isPassword,
  toggleVisibility,
}) => {
  return (
    <div className={`loginInputGroup ${error ? "incorrect" : ""}`}>
      {icon}
      <input
        className={cls}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <div className="toggleVisibility" onClick={toggleVisibility}>
          {type === "password" ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default LoginInputGroup;
