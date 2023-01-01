import { useEffect, useState } from "react";
import verifyJwt from "../../utils/security/verifyJwt";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Feed = () => {
  const [lastPlacesState, setLastPlacesState] = useState(false);
  const lastPlaces = async () => {
    try {
      let ultimos = await fetch(
        "http://127.0.0.1:3333/estabelecimentos/ultimos"
      );

      if (ultimos.status === 200) {
        ultimos = await ultimos.json();
        setLastPlacesState(ultimos);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      536: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
    lastPlaces();
  }, []);

  const verifyAuth = async () => {
    let isAuth = await (await verifyJwt()).auth;
    if (isAuth) {
    } else {
      navigate("/login", {
        state: {
          isAuth: false,
        },
      });
    }
  };

  return (
    <>
      Feed <br />
      <Link to="/meu-perfil">
        <Button text="Meu Perfil"></Button>
      </Link>
      <br />
      {lastPlacesState && (
        <OwlCarousel className="owl-theme" {...options}>
          {lastPlacesState.map((e) => {
            return (
              <div key={e.pubId} className="item">
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
    </>
  );
};
export default Feed;
