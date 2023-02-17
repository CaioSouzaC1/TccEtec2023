const ThePageText = (props) => {
  return (
    <h1 className="text-4xl font-bold leading-tight tracking-tight flex flex-col items-center text-f-[#ededed] mb-4">
      {props.text}
    </h1>
  );
};

export default ThePageText;
