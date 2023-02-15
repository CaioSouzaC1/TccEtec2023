import {Microphone} from 'phosphor-react'

const ButtonCadArt = () => {
    return (
        <button className="w-72 h-20 bg-f-red hover:bg-s-red text-white py-2 px-4 rounded-2xl transition-all hover:ring-1 hover:ring-f-red m-2 font-semibold flex justify-end items-center gap-20">
            Artista 
            <Microphone size={50} /> 
        </button>
    )
}

export default ButtonCadArt