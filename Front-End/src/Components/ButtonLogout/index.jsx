import { useNavigate } from "react-router-dom";

const ButtonLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("VoiceJwt");
    navigate("/login");
  };
  return (
    <>
      <button
        className="bg-f-red hover:bg-s-red text-white py-2 px-4 rounded transition-all hover:ring-1 hover:ring-f-red m-2 font-semibold"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

export default ButtonLogout;
