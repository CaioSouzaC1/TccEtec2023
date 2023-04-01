import { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ThePageText from "../../Components/ThePageText";
import ButtonLogout from "../../Components/ButtonLogout";
import ProfileImage from "../../Components/ProfileImage";
import { UserContext } from "../../Contexts/User";
import { API_URL } from "../../Utils/Admin";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import styles from "./styles.module.css";
import { db } from "../../Utils/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
const Feed = () => {
  const [lastPlacesState, setLastPlacesState] = useState(false);
  const [events, setEvents] = useState(false);
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

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
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

  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      lastPlaces();
      renderEvents();
    }
  }, []);

  const renderEvents = async () => {
    const colRef = collection(db, "events");

    const dateTime = new Date().getTime();
    const eventsQuery = query(
      colRef,
      where("event_data", ">=", dateTime),
      where("status", "==", 201)
    );
    const resultQuery01 = await getDocs(eventsQuery);
    if (resultQuery01.docs < 1) {
      return;
    }

    setEvents(resultQuery01.docs);
    return;
  };

  return (
    <>
      <h2 className="text-2xl font-bold my-8">Estabelecimentos</h2>
      {lastPlacesState && (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {lastPlacesState.map((e) => {
            return (
              <SwiperSlide key={e.pubId}>
                <Link to={`/estabelecimento/${e.pubId}`}>
                  <ProfileImage
                    name={e.name}
                    pubId={e.pubId}
                    type={"Establishment"}
                  />
                  <h3>{e.name}</h3>
                  <h4>{e.logradouro}</h4>
                  <h5>{e.bairro}</h5>
                </Link>
              </SwiperSlide>
            );
          })}
          <div className={`${styles.autoplayProgress}`} slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      )}
      <br />
      <h3
        className="text-bold text-xl
      "
      ></h3>
      {events && (
        <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Confirmados</h2>
      )}
      <ul>
        {events &&
          events.map((e) => {
            const data = e.data();
            return (
              <li>
                <h4>{data.event_name}</h4>
                <h5>{data.event_type}</h5>
                <h6>{data.init_hour}</h6>
              </li>
            );
          })}
      </ul>
      <Link to="/meus-eventos">
        <Button text="Meus Eventos"></Button>
      </Link>
      <br />
      <ButtonLogout />
    </>
  );
};
export default Feed;
