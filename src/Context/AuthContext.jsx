import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ isAuth: false });

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState({});
  function handleAuth(set) {
    setIsAuth(set);
  }
  function handleMsg(msg) {
    setMsg(msg);
  }
  function handleLoading(value){
    setLoading(value);
  }
  function handleUser(value){
    setUser(value);
  };
  return (
    <AuthContext.Provider
      value={{
        message: msg,
        setMessage: handleMsg,
        isAuth,
        setIsAuthenticated: handleAuth,
        loading,
        setLoading:handleLoading,
        user,
        setUser:handleUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
