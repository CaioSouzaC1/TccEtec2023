import {FirstAid, House, User, ChatsTeardrop, CalendarCheck} from 'phosphor-react'

const FooterAlt = () => {
    return(
        <footer>
            <div className="w px-7 py-9 h-16 mt-4 bg-[#444444] flex justify-center items-center gap-5 rounded-3xl">
                <a href="" className="bg-red flex flex-col items-center mt-4 text-lg text-[#ededed]">
                    <House size={25}/>
                    Menu
                </a>
                <a href="" className="bg-red flex flex-col items-center mt-4 text-lg text-[#ededed]">
                    <User size={25}/>
                    Perfil
                </a>
                <a href="" className="bg-red flex flex-col items-center mt-4 text-lg text-[#ededed]">
                    <FirstAid size={25}/>
                    Publicar
                </a>
                <a href="" className="bg-red flex flex-col items-center mt-4 text-lg text-[#ededed]">
                    <ChatsTeardrop size={25}/>
                    Chat
                </a>
                <a href="" className="bg-red flex flex-col items-center mt-4 text-lg text-[#ededed]">
                    <CalendarCheck size={25}/>
                    Eventos
                </a>
            </div>
        </footer>
    )
}

export default FooterAlt