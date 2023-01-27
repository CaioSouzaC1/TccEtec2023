import {List} from 'phosphor-react'

const Header = () => {
    return (
    <>    
    <header className="py-4 flex justify-between items-center">

      <div className="flex items-center">
      <img src='../../../public/Logo/logodm.png' className="max-h-14" alt="Voice Logo" />
      <h1 className="text-white font-bold">Voice</h1>
      </div>
      <List size={32}/>      
    </header>
    </>    
    )
}

export default Header