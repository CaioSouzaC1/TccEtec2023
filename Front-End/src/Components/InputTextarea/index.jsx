const InputTextarea = (props) => {
  return (
    <textarea
      rows={props.rows ? props.rows : 5}
      class="border-f-red border bg-s-black rounded-lg w-full focus:outline-none active:outline-none focus:shadow-outline focus:border-s-red active:border-s-red post_content"
    ></textarea>
  );
};

export default InputTextarea;
