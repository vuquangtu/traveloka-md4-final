import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";

const ProtectedTeraRoute = ({
  element,
  redirectPath = "/tera",
  loginPath = "/login",
}) => {
  const user = useSelector(selectUser);

  if (!user || !user.user) {
    return <Navigate to={loginPath} replace />;
  }

  const isPartner = user.user.authorities?.some(
    (auth) => auth.authority === "ROLE_PARTNER"
  );

  if (!isPartner) {
    return <Navigate to={redirectPath} replace />;
  }
  return element ? element : <Outlet />;
};

export default ProtectedTeraRoute;
