import selectInput from "./selectInput";

const setValueNull = (seletor) => {
  return (selectInput(seletor).value = "");
};
export default setValueNull;
