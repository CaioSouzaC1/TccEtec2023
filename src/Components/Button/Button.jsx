import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button className="bg-f-red hover:bg-gradient-to-tr from-f-red to-red-800 text-white py-2 px-4 rounded transition-all  m-2 font-semibold">
      {props.text}
    </button>
  );
};

export default Button;
