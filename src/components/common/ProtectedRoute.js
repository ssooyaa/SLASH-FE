import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.auth;
    const hasAccess = allowedRoles.includes(userRole);
    if (!hasAccess) {
      alert("접근 권한이 없습니다.");
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    alert("인증 정보가 잘못되었습니다. 다시 로그인해 주세요.");
    localStorage.removeItem("accessToken");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
