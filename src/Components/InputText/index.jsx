import styles from "./InputText.module.css";

const InputText = (props) => {
  const type = props.type != null ? props.type : "text";
  const min = props.min != null ? props.min : "0";
  const max = props.max != null ? props.max : "60";
  return (
    <div className={styles.filds}>
      <input
        required
        className={props.class}
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        minLength={min}
        maxLength={max}
      />
      <label>{props.label}</label>
    </div>
  );
};

export default InputText;
