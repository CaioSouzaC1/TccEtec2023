import { useLocation } from "react-router-dom";

const CreateAccEstableshimentStepTwo = () => {
  const { state } = useLocation();
  console.log(state);
  return <h1>Estabelecimento Step 2</h1>;
};

export default CreateAccEstableshimentStepTwo;
