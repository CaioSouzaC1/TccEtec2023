import styles from "./styles.module.css";
const InputCheckbox = (props) => {
  return (
    <label className={`${styles.container}`}>
      <input defaultChecked={true} required={props.required} type="checkbox" />
      <div className={`${styles.checkmark}`}></div>
    </label>
  );
};
export default InputCheckbox;
