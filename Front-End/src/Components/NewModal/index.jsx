import { useState } from "react";

const NewModal = (props) => {
  const [showModal, setShowModal] = useState(props.show);

  return (
    <>
      <div>{props.children}</div>
    </>
  );
};
export default NewModal;
