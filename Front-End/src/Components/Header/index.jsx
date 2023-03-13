import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <ul className="flex flex-row">
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
