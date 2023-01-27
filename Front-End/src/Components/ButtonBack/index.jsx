import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="w-28 h-10 bg-f-red hover:bg-s-red text-white py-2 px-4 rounded transition-all hover:ring-1 hover:ring-f-red m-2 font-semibold"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </>
  );
};

export default ButtonBack;
