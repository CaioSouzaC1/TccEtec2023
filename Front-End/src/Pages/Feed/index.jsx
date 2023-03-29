import { useEffect, useRef, useState, useContext } from "react";
import verifyJwt from "../../Utils/Security/verifyJwt";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ThePageText from "../../Components/ThePageText";
import ButtonLogout from "../../Components/ButtonLogout";
import ProfileImage from "../../Components/ProfileImage";
import { UserContext } from "../../Contexts/User";
import { API_URL } from "../../Utils/Admin";

const Feed = () => {
  const [lastPlacesState, setLastPlacesState] = useState(false);

  const stateRef = useRef(null);
  const navigate = useNavigate();
  const { auth, user, type } = useContext(UserContext);
  if (auth === false) {
    navigate("/login", {
      state: {
        isAuth: false,
      },
    });
  }

  const lastPlaces = async () => {
    try {
      let ultimos = await fetch(`${API_URL}/estabelecimentos/ultimos`);

      if (ultimos.status === 200) {
        ultimos = await ultimos.json();
        setLastPlacesState(ultimos);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const options = {
    // loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      536: {
        items: 2,
      },
      1000: {
        items: 3,
        nav: true,
        dots: true,
      },
    },
  };

  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      // verifyAuth();
      lastPlaces();
    }
  }, []);

  // const verifyAuth = async () => {
  //   let isAuth = await (await verifyJwt()).auth;
  //   if (!isAuth) {

  //   }
  // };

  return (
    <>
      <ThePageText text="Voice Feed" />
      <Link to="/meu-perfil">
        <Button text="Meu Perfil"></Button>
      </Link>
      <br />
      {lastPlacesState && (
        <OwlCarousel className="owl-theme" {...options}>
          {lastPlacesState.map((e) => {
            return (
              <div key={e.pubId} className="item text-center">
                <ProfileImage
                  name={e.name}
                  pubId={e.pubId}
                  type={"Establishment"}
                />
                <Link to={`/estabelecimento/${e.pubId}`}>
                  <h3>{e.name}</h3>
                  <h4>{e.logradouro}</h4>
                  <h5>{e.bairro}</h5>
                </Link>
              </div>
            );
          })}
        </OwlCarousel>
      )}
      <br />

      <Link to="/meus-eventos">
        <Button text="Meus Eventos"></Button>
      </Link>
      <br />
      <ButtonLogout />
    </>
  );
};
export default Feed;
