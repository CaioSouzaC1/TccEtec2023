import styles from "./styles.module.css";

const Rotater = (props) => {
  return (
    <>
      <div className="relative h-40 w-full">
        <div class={styles.rotater}>
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

export default Rotater;
