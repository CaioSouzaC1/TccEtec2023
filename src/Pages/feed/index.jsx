import { useEffect } from "react";
import verifyJwt from "../../utils/security/verifyJwt";

const Feed = () => {
  useEffect(() => {
    verifyAuth();
  }, []);
  const verifyAuth = async () => {
    let isAuth = await (await verifyJwt()).auth;
  };

  return <>Feed</>;
};
export default Feed;
