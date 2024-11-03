const ErrorMessage = ({ message }) => {
  return (
    <div className={`error-message ${message ? "active" : ""}`}>{message}</div>
  );
};

export default ErrorMessage;
