import { useState } from "react";

const NewModal = (props) => {
  return (
    <>
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-f-black outline-none focus:outline-none">
                <button
                  className="py-3 px-2 ml-auto bg-transparent border-0 text-white opacity-60 hover:opacity-90 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.callback(false)}
                >
                  <span className="bg-transparent text-white opacity-50 h-6 w-6 text-2xl outline-none focus:outline-none flex items-center justify-between">
                    x
                  </span>
                </button>
                <div className="p-4 flex-auto">{props.children}</div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default NewModal;
