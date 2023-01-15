import { useState } from "react";

const Modal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const execCallBack = async (event) => {
    event.preventDefault();
    await props.callback();
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-f-red text-white active:bg-s-red hover:bg-s-red py-2 px-4 font-semibold rounded transition-all m-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {props.title}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-f-black outline-none focus:outline-none">
                <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">{props.title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-50 h-6 w-6 text-2xl outline-none focus:outline-none flex items-center justify-between">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 pb-0 flex-auto">
                  {props.children}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-f-red hover:text-s-red  font-bold rounded uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={execCallBack}
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
