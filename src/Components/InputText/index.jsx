const InputText = (props) => {
  return (
    <>
      <label>{props.label}</label>
      <input
        required
        className={props.class}
        type="text"
        placeholder={props.placeholder}
      />
    </>
  );
};

export default InputText;
