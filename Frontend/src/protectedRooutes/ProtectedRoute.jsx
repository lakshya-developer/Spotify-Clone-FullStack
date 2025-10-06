import { useLoginCheck } from "../context/LoginContext"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } =  useLoginCheck();
  const navigate = useNavigate();

  if(!isLoggedIn){
    navigate("/login");
  }

  // useEffect(() => {

  //   // Prevent browser caching for this page
  //   const noCacheHeaders = () => {
  //     window.history.replaceState(null, "", window.location.href);
  //   };
  //   noCacheHeaders();
  //   window.addEventListener("popstate", noCacheHeaders);

  //   return () => {
  //     window.removeEventListener("popstate", noCacheHeaders);
  //   };
  // }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;