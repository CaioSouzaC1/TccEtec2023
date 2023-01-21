import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastra from "./Pages/Cadastra";
import CreateAccArtistaStepOne from "./Pages/Cadastra/ArtistaStep1";
import CreateAccArtistaStepTwo from "./Pages/Cadastra/ArtistaStep2";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Ultimos from "./Pages/estabelecimentos/ultimos";
import ProfileArtists from "./Pages/profile/Artists";
import CreateAccEstableshimentStepOne from "./Pages/Cadastra/EstableshimentStep1";
import CreateAccEstableshimentStepTwo from "./Pages/Cadastra/EstableshimentStep2";
import CreateAccEstableshimentStepThree from "./Pages/Cadastra/EstableshimentStep3";
import Feed from "./Pages/feed";
import ProfileEstablishments from "./Pages/Profile/Establishments";
import MyProfile from "./Pages/MyProfile";
import MyEvents from "./Pages/MyEvents";

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
        <Route
          path="/cadastra/estabelecimento/etapa/1"
          element={<CreateAccEstableshimentStepOne />}
        />
        <Route
          path="/cadastra/estabelecimento/etapa/2"
          element={<CreateAccEstableshimentStepTwo />}
        />
        <Route
          path="/cadastra/estabelecimento/etapa/3"
          element={<CreateAccEstableshimentStepThree />}
        />
        <Route path="/artista/:id" element={<ProfileArtists />} />
        <Route path="/meu-perfil" element={<MyProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/meus-eventos" element={<MyEvents></MyEvents>} />
        <Route path="/estabelecimentos/ultimos" element={<Ultimos></Ultimos>} />
        <Route
          path="/estabelecimento/:id"
          element={<ProfileEstablishments />}
        />
        <Route path="*" element={<div>pagina 404</div>} />`
      </Routes>
    </BrowserRouter>
  );
}

export default App;