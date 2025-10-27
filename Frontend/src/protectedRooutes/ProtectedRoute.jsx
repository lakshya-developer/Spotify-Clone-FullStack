import { useEffect } from "react";
import { useLoginCheck } from "../context/LoginContext"
import { useNavigate } from "react-router-dom";
import HomeLoading from "../components/ui/HomeLoading"

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } =  useLoginCheck();
  const navigate = useNavigate();

  useEffect(() => {

    if (isLoading) return;

    // only redirect once loading is done
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading]);

  // Show loading screen while checking login status
  if (isLoading) {
    return <HomeLoading />;
  }

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;