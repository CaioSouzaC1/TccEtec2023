import styles from "./styles.module.css";
const CardAbout = (props) => {
  return (
    <>
      <div className="w-full sm:w-1/2 md:w-1/3">
        <div
          className={`w-4/5 mx-auto bg-s-black rounded-lg border cursor-pointer border-f-red hover:border-f-blue hover:brightness-110 mt-8 hover:mt-4 mb-4 hover:mb-8 transition-all ${styles.card}`}
        >
          <div className={`flex flex-wrap justify-center transition-all p-4`}>
            <img
              className="md:bg-f-black border transition-all"
              src={props.img}
              alt={props.name}
            />
            <h2 className="w-full text-center font-bold text-xl mt-4 mb-1">
              {props.name}
            </h2>
            <h3 className="w-full text-center font-light text-md mb-2">
              {props.resp}
            </h3>
            <span
              className="w-80 h-0.5 bg-f-red
          "
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardAbout;
