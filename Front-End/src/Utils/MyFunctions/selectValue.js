const selectValue = (seletor) => {
  try {
    return document.querySelector(`${seletor}`).value;
  } catch (err) {
    console.log(err);
  }
};
export default selectValue;
