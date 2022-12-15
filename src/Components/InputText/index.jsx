const InputText = (props) => {
  const type = props.type != null ? props.type : "text";
  const min = props.min != null ? props.min : "0";
  const max = props.max != null ? props.max : "60";
  return (
    <>
      <label>{props.label}</label>
      <input
        required
        className={props.class}
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        minLength={min}
        maxLength={max}
      />
    </>
  );
};

export default InputText;
