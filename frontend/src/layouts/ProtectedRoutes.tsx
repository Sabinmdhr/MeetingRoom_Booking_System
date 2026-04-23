import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type props = {
  children: React.ReactNode;
  roles?: string[];
};
export const ProtectedRoutes = ({ children, roles }: props) => {
  const { role, accessToken } = useAuth();
  const navigate = useNavigate();
  if (!accessToken) {
    navigate("/login");
    return null;
  }

  if (roles && !roles.includes(role)) {
    navigate("/unauthorized");
    return null;
  }
  return <>{children}</>;
};
