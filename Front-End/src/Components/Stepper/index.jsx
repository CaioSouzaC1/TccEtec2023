import styles from "./styles.module.css";

const Stepper = (props) => {
  return (
    <>
      <div className="relative h-28">
        <div class={`${styles.stepper} ${props.on ? styles.on : ""}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.icon}>{props.icon && props.icon}</div>
        <p className="text-center font-bold text-lg">{props.text}</p>
      </div>
    </>
  );
};

export default Stepper;
