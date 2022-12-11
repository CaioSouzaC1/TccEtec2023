import style from "./text.module.css";
const Text = (props) => {
  return <h3 style={{ fontSize: props.size }}>{props.text}</h3>;
};

export default Text;
