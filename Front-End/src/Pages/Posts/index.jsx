import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../Utils/Admin";
import Loader from "../../Components/Loader";

const Posts = () => {
  let { id } = useParams();
  const [postData, setPostData] = useState(false);
  const fetchData = async () => {
    const data = await (await fetch(`${API_URL}/post/read/${id}`)).json();
    setPostData(data);
    console.log(data);
  };

  const getVideoId = () => {
    const videoUrl = postData.metatags.find((e) => e.meta_key === "video_url");
    if (videoUrl) {
      return videoUrl.meta_value;
    }
  };

  const getTheContent = () => {
    const content = postData.metatags.find((e) => e.meta_key === "content");
    if (content) {
      return content.meta_value;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!postData) {
    return <Loader />;
  }

  if (postData && postData.post.format === "video") {
    return (
      <div className="text-center min-h-70-screen">
        <h2 className="mb-4">{getTheContent()}</h2>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "hidden",
            }}
            src={`https://www.youtube.com/embed/${getVideoId()}?autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h4 className="mt-4 font-bold text-sm">
          Post criado em :{" "}
          {new Date(postData.post.createdAt).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            timeZone: "America/Sao_Paulo",
          })}
        </h4>
      </div>
    );
  }

  if (postData && postData.post.format === "post") {
    return (
      <div className="text-center min-h-70-screen">
        <h2 className="my-4">{getTheContent()}</h2>
        <img
          className="mx-auto max-w-full rounded hover:brightness-110"
          src={`${API_URL}/posts/PostImage-${postData.post.id}.jpg`}
          alt="Post Image"
        />
        <h4 className="mt-4 font-bold text-sm">
          Post criado em :{" "}
          {new Date(postData.post.createdAt).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            timeZone: "America/Sao_Paulo",
          })}
        </h4>
      </div>
    );
  }
};

export default Posts;
