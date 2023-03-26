import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Auth Context must be within the Provider");
  }

  return context;
};

export default useAuthContext;
