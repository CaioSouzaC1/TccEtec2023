import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import verifyJwt from "../../Utils/Security/verifyJwt";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logged, setLogged] = useState(undefined);
  const location = useLocation();
  Array.from(document.querySelectorAll("ul.ul-menu li")).forEach((e) => {
    e.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });
  useEffect(() => {
    verifyJwt().then((res) => {
      setLogged(res);
    });
  }, [location]);

  return (
    <header className="pb-4 pt-5 flex justify-between items-center">
      <div className="flex items-center">
        <Link to={"/"}>
          <img
            src="/Logo/voice_white.svg"
            className="max-h-14 hover:brightness-200"
            alt="Voice Logo"
          />
        </Link>
      </div>
      <div
        className={`${styles.list_header}  ${menuOpen ? styles.oppened : ""}`}
      >
        <ul className="flex flex-row ul-menu">
          {logged && logged.auth && (
            <>
              <li className="mx-3 uppercase font-bold text-white">
                <Link className="relative pb-1" to={"/feed"}>
                  Feed
                </Link>{" "}
              </li>
              <li className="mx-3 uppercase font-bold text-white">
                <Link className="relative pb-1" to={"/meu-perfil"}>
                  Meu Perfil
                </Link>{" "}
              </li>
              <li className="mx-3 uppercase font-bold text-white">
                <Link className="relative pb-1" to={"/meus-eventos"}>
                  Meus eventos
                </Link>{" "}
              </li>
            </>
          )}
          {logged && logged.auth === false && (
            <>
              <li className="mx-3 uppercase font-bold text-white">
                <Link className="relative pb-1" to={"/login"}>
                  Login
                </Link>{" "}
              </li>
              <li className="mx-3 uppercase font-bold text-white">
                <Link className="relative pb-1" to={"/cadastra"}>
                  Criar conta
                </Link>{" "}
              </li>
            </>
          )}
          <li className="mx-3 uppercase font-bold text-white">
            <Link className="relative pb-1" to={"/sobre-nos"}>
              Sobre nós
            </Link>{" "}
          </li>
          <li className="mx-3 uppercase font-bold text-white">
            <Link className="relative pb-1" to={"/objetivo"}>
              Objetivo
            </Link>{" "}
          </li>
        </ul>
        <div
          id="hamburguer_icon"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`${styles.toogle_menu}  ${menuOpen ? styles.oppened : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
