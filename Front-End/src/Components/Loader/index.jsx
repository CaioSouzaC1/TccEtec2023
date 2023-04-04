import styles from "./styles.module.css";
const Loader = () => {
  return (
    <div className={styles.dotWave}>
      <div className={styles.dotWave__dot}></div>
      <div className={styles.dotWave__dot}></div>
      <div className={styles.dotWave__dot}></div>
      <div className={styles.dotWave__dot}></div>
    </div>
  );
};

export default Loader;
