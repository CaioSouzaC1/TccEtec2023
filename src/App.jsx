import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cadastra from "./Pages/cadastra";
import CreateAccArtistaStepOne from "./Pages/cadastra/artistaStep1";
import CreateAccArtistaStepTwo from "./Pages/cadastra/artistaStep2";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Ultimos from "./Pages/estabelecimentos/ultimos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/cadastra" element={<Cadastra></Cadastra>} />
        <Route
          path="/cadastra/artista/etapa/1"
          element={<CreateAccArtistaStepOne />}
        />
        <Route
          path="/cadastra/artista/etapa/2"
          element={<CreateAccArtistaStepTwo />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/estabelecimentos/ultimos" element={<Ultimos></Ultimos>} />
        <Route path="*" element={<div>pagina 404</div>} />`
      </Routes>
    </BrowserRouter>
  );
}

export default App;
