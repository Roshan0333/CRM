// src/hooks/useLogout.js
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear(); // Safety साठी सर्व clear
    navigate("/login", { replace: true });
  };
  
  return { logout };
};
