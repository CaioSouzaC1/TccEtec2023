const ButtonCadastra = (props) => {
  return (
    <button className="w-full max-w-[24em] mx-auto md:mr-auto md:ml-0 h-20 bg-f-red hover:bg-s-red text-white py-2 px-4 mb-8 rounded-2xl transition-all hover:ring-1 hover:ring-f-red font-semibold flex justify-evenly items-center">
      <p className="w-1/2 font-bold text-xl">{props.text}</p>
      {props.icon}
    </button>
  );
};

export default ButtonCadastra;
