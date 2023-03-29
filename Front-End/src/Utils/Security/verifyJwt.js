import { API_URL } from "../Admin";

const verifyJwt = async () => {
  const req = await fetch(`${API_URL}/autenticado`, {
    headers: new Headers({
      jwtAuthorization: `${`${sessionStorage.getItem("VoiceJwt")}`}`,
    }),
  });

  const reqJson = await req.json();

  return {
    status: req.status,
    auth: reqJson.auth,
    user: reqJson.user,
    type: reqJson.type,
  };
};

export default verifyJwt;
