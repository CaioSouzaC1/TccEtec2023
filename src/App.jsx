import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cadastra from "./Pages/cadastra";
import CreateAccArtista from "./Pages/cadastra/artista";
import Home from "./Pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/cadastra" element={<Cadastra></Cadastra>} />
        <Route path="/cadastra/artista" element={<CreateAccArtista />} />
        <Route path="*" element={<div>pagina 404</div>} />`
      </Routes>
    </BrowserRouter>
  );
}

export default App;
