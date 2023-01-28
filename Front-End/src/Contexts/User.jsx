import { createContext, useRef } from "react";
import { useState, useEffect } from "react";
import verifyJwt from "../Utils/Security/verifyJwt";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const [user, setUser] = useState({});
  const [type, setType] = useState("");
  const stateRef = useRef(null);

  useEffect(() => {
    const getAuth = async () => {
      const { status, auth, user, type } = await verifyJwt();
      if (status === 200) {
        setAuth(auth);
        setUser(user);
        setType(type);
      }
    };
    if (stateRef.current === null) {
      stateRef.current = true;
      getAuth();
    }
  }, []);
  return (
    <UserContext.Provider value={{ auth, user, type }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
