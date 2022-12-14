const InputText = (props) => {
  return (
    <>
      <label>{props.label}</label>
      <input
        required
        className={props.class}
        type="text"
        placeholder={props.placeholder}
        value={props.value}
      />
    </>
  );
};

export default InputText;
