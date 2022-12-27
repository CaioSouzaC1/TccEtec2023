const verifyJwt = async () => {
  const req = await fetch("http://127.0.0.1:3333/autenticado", {
    headers: new Headers({
      jwtAuthorization: `${`${sessionStorage.getItem("VoiceJwt")}`}`,
    }),
  });

  const reqJson = await req.json();
  return { status: req.status, auth: reqJson.auth, user: reqJson.user };
};

export default verifyJwt;
