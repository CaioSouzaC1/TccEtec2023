import {Buildings} from 'phosphor-react'

const ButtonCadEstab = () => {
    return (
        <button className="w-72 h-20 bg-f-red hover:bg-s-red text-white py-2 px-4 rounded-2xl transition-all hover:ring-1 hover:ring-f-red m-2 font-semibold flex justify-end items-center gap-12">
            Estabelecimento
            <Buildings size={50} /> 
        </button>
    )
}

export default ButtonCadEstab