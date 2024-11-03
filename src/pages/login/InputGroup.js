import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputGroup = ({
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
    <div className={`login-input-group ${error ? "incorrect" : ""}`}>
      {icon}
      <input
        className={cls}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <div className="toggle-visibility" onClick={toggleVisibility}>
          {type === "password" ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default InputGroup;
