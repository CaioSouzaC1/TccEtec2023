import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cadastra from "./Pages/Cadastra";
import CreateAccArtistaStepOne from "./Pages/Cadastra/ArtistaStep1";
import CreateAccArtistaStepTwo from "./Pages/Cadastra/ArtistaStep2";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Ultimos from "./Pages/Estabelecimentos/Ultimos";
import ProfileArtists from "./Pages/Profile/Artists";
import CreateAccEstableshimentStepOne from "./Pages/Cadastra/EstableshimentStep1";
import CreateAccEstableshimentStepTwo from "./Pages/Cadastra/EstableshimentStep2";
import CreateAccEstableshimentStepThree from "./Pages/Cadastra/EstableshimentStep3";
import Feed from "./Pages/Feed";
import ProfileEstablishments from "./Pages/Profile/Establishments";
import MyProfile from "./Pages/MyProfile";
import MyEvents from "./Pages/MyEvents";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import UserProvider from "./Contexts/User";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import About from "./Pages/About";
import Objective from "./Pages/Objective";
import NotFound from "./Pages/NotFound";
import Event from "./Pages/Event";

function App() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.configure({ easing: "ease", speed: 400 });
    NProgress.configure({ showSpinner: true });
    NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
  }, [location]);

  useEffect(() => {
    // this functionss runs 2 times at inicial load and in all route change
    // console.log("Route Change");
    NProgress.done();
  }, [location]);

  return (
    <>
      <main className="container mx-auto manual_container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastra" element={<Cadastra />} />
          <Route path="/sobre-nos" element={<About />} />
          <Route path="/objetivo" element={<Objective />} />
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
          <Route
            path="/estabelecimento/:id"
            element={<ProfileEstablishments />}
          />
          <Route path="/eventos/:id" element={<Event />} />
          <Route path="/estabelecimentos/ultimos" element={<Ultimos />} />
          <Route
            path="/meu-perfil"
            element={
              <UserProvider>
                <MyProfile />
              </UserProvider>
            }
          />
          <Route
            path="/feed"
            element={
              <UserProvider>
                <Feed />
              </UserProvider>
            }
          />
          <Route
            path="/meus-eventos"
            element={
              <UserProvider>
                <MyEvents />
              </UserProvider>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
