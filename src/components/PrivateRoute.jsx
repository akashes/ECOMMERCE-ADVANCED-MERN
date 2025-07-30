import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLogin, loading, user } = useContext(AuthContext);

  console.log("PrivateRoute check →", { loading, isLogin, user });

  if (user===null ||loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        loading
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if(!loading && !isLogin) return <Navigate to="/" />
  
  return children;
};

export default PrivateRoute;
