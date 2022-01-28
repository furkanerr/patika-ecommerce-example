import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  
    
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to={"/signin"}/>
   
};

export default ProtectedRoute;
