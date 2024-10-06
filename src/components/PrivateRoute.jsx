import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../const";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo = ROUTERS.LOGIN }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(redirectTo, { state: location });
    }
  }, [redirectTo, isLoggedIn, location, navigate]);

  return children;
};

export default PrivateRoute;
