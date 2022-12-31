import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </>
  );
};

export default ButtonBack;
