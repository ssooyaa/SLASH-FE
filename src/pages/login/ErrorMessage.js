const ErrorMessage = ({ message }) => {
  return (
    <div className={`errorMessage ${message ? "active" : ""}`}>{message}</div>
  );
};

export default ErrorMessage;
