import { createContext } from "react";
import { useState, useEffect } from "react";
import verifyJwt from "../Utils/Security/verifyJwt";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [type, setType] = useState("");

  useEffect(() => {
    const getAuth = async () => {
      const { status, auth, user, type } = await verifyJwt();
      if (status === 200) {
        setAuth(auth);
        setUser(user);
        setType(type);
      }
    };
    getAuth();
  }, []);

  return (
    <UserContext.Provider value={{ auth, user, type }}>
      <>{children}</>
    </UserContext.Provider>
  );
};
export default UserProvider;
