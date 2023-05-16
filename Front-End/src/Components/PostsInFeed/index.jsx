import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../Utils/Admin";
import Loader from "../Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import get_metatag_value from "../../Utils/MyFunctions/get_metatag_value";

const PostsInFeed = () => {
  const [data, setData] = useState(false);

  const fetchData = async () => {
    const posts = await (await fetch(`${API_URL}/post/feed`)).json();

    setData(posts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  if (!data) {
    return <Loader />;
  }

  return (
    data && (
      <>
        <h2 className="text-2xl font-bold mt-8 mb-4">Últimos posts</h2>
        <section className="bg-s-black p-4 mb-8 rounded">
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
            className="lastPlaces"
          >
            {data &&
              data.map((post) => {
                if (post.format === "post") {
                  return (
                    <SwiperSlide key={post.id}>
                      <Link
                        className={`flex flex-wrap items-center p-2 bg-f-black brightness-90 hover:brightness-110 border-b-2 border-f-black hover:border-f-red transition-all rounded-sm ${styles.postLink}`}
                        to={`/post/${post.id}`}
                      >
                        <img
                          className="w-2/5 h-24 md:h-40 object-cover rounded-sm"
                          src={`${API_URL}/posts/PostImage-${post.id}.jpg`}
                          alt="post_image"
                        />
                        <p className="font-bold text-md w-3/5 px-4 clamp-4">
                          {get_metatag_value(post.metatags, "content")}
                        </p>
                      </Link>
                    </SwiperSlide>
                  );
                }

                if (post.format === "video") {
                  return (
                    <SwiperSlide key={post.id}>
                      <Link
                        className={`flex flex-wrap items-center p-2 bg-f-black brightness-90 hover:brightness-110 border-b-2 border-f-black hover:border-f-red transition-all rounded-sm ${styles.postLink}`}
                        to={`/post/${post.id}`}
                      >
                        <img
                          className="w-2/5 h-24 md:h-40 object-cover rounded-sm"
                          src={`https://img.youtube.com/vi/${get_metatag_value(
                            post.metatags,
                            "video_url"
                          )}/hqdefault.jpg`}
                          alt="post_image"
                        />
                        <p className="font-bold text-md w-3/5 px-4 clamp-4">
                          {get_metatag_value(post.metatags, "content")}
                        </p>
                      </Link>
                    </SwiperSlide>
                  );
                }
              })}

            <div className={`${styles.autoplayProgress}`} slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </section>
      </>
    )
  );
};
export default PostsInFeed;
