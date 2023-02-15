const ButtonAdvance = (props) => {
    return(
        <button className="w-72 h-11 bg-f-red hover:bg-gradient-to-tr from-f-red to-red-800 text-white py-2 px-4 rounded-xl transition-all m-2 font-semibold ">
            {props.text}
        </button>
    )
}

export default ButtonAdvance