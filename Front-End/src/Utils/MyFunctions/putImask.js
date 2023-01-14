import selectInput from "./selectInput";
import IMask from "imask";
const putImask = (selector, mask) => {
  return IMask(selectInput(`${selector}`), {
    mask: mask,
  });
};

export default putImask;
