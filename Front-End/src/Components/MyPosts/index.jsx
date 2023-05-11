import { useEffect, useState } from "react";
import { API_URL } from "../../Utils/Admin";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import styles from "./styles.module.css";

const MyPosts = (props) => {
  const [postsData, setPostsData] = useState(false);

  const my_type = props.type === "Establishment" ? "establishments" : "artist";

  const fetchData = async () => {
    const id = await (
      await fetch(`${API_URL}/pubId-to-Id`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${props.pubid}`).toString("base64")}`,
        }),
      })
    ).json();

    const data = await (
      await fetch(`${API_URL}/post/mys`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${my_type}:${id.id}`).toString(
            "base64"
          )}`,
        }),
      })
    ).json();
    setPostsData(data);
    console.log(data);
  };

  const get_metatag_value = (metatags, key) => {
    const metatag = metatags.find((e) => e.meta_key === key);
    if (metatag) {
      return metatag.meta_value;
    }
    return "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (postsData.lenght === 0) {
    return (
      <div className="w-full bg-s-black md:pl-4 rounded text-center mt-2">
        <h2 className="font-bold">Você ainda não tem postagens</h2>
      </div>
    );
  }

  if (!postsData) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-s-black md:pl-4 rounded text-center mt-2 md:mx-4">
      <h2 className="font-bold text-2xl py-4">Meus últimos posts</h2>

      <ul className="pb-4 w-full overflow-y-scroll h-56 scrollbar-track-red">
        {postsData &&
          postsData.map((post) => {
            if (post.format === "post") {
              return (
                <li
                  className="m-4 bg-f-black rounded border-b-2 border-b-f-red hover:border-b-f-blue hover:bg-s-black transition-all"
                  key={post.id}
                >
                  <Link
                    className={`flex flex-wrap items-center ${styles.postLink}`}
                    to={`/post/${post.id}`}
                  >
                    <img
                      className="w-2/5 h-24 md:h-40 object-cover rounded-tl-lg hover:brightness-110"
                      src={`${API_URL}/posts/PostImage-${post.id}.jpg`}
                      alt="post_image"
                    />
                    <p className="font-bold text-xl w-3/5 px-4">
                      {get_metatag_value(post.metatags, "content")}
                    </p>
                  </Link>
                </li>
              );
            }

            if (post.format === "video") {
              return (
                <li
                  className="m-4 bg-f-black rounded border-b-2 border-b-f-red hover:border-b-f-blue hover:bg-s-black transition-all"
                  key={post.id}
                >
                  <Link
                    className={`flex flex-wrap items-center ${styles.postLink}`}
                    to={`/post/${post.id}`}
                  >
                    <img
                      className="w-2/5 h-24 md:h-40 object-cover rounded-tl-lg hover:brightness-110"
                      src={`https://img.youtube.com/vi/${get_metatag_value(
                        post.metatags,
                        "video_url"
                      )}/hqdefault.jpg`}
                      alt="post_image"
                    />
                    <p className="font-bold text-xl w-3/5 px-4">
                      {get_metatag_value(post.metatags, "content")}
                    </p>
                  </Link>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default MyPosts;
