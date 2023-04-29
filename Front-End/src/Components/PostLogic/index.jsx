import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Article, FolderPlus, YoutubeLogo } from "phosphor-react";
import InputText from "../InputText";
import Button from "../Button/Button";
import { API_URL } from "../../Utils/Admin";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/User";
import selectValue from "../../Utils/MyFunctions/selectValue";
import getYoutubeId from "../../Utils/MyFunctions/getYoutubeId";
import errorFy from "../../Utils/Toastify/errorFy";
import { ToastContainer } from "react-toastify";
import setValueNull from "../../Utils/MyFunctions/setValueNull";
import successFy from "../../Utils/Toastify/successFy";
import selectInput from "../../Utils/MyFunctions/selectInput";

const PostLogic = (props) => {
  const sendPostVideo = async (event) => {
    event.preventDefault();
    if (!getYoutubeId(selectValue(".youtube_url"))) {
      setValueNull(".youtube_url");
      errorFy("Insira uma url válida.");

      return;
    }

    try {
      const req = await (
        await fetch(`${API_URL}/post/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: `${props.user}`,
            author_type: `${props.type}`,
            format: "video",
            content: selectValue(".video_content"),
            video_url: getYoutubeId(selectValue(".youtube_url")),
          }),
        })
      ).json();
      successFy("Video postado.");
      props.callback(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sendPost = async (event) => {
    event.preventDefault();

    try {
      const req = await (
        await fetch(`${API_URL}/post/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: `${props.user}`,
            author_type: `${props.type}`,
            format: "post",
            content: selectValue(".post_content"),
            image: selectInput("#postImageInput").target.files[0],
          }),
        })
      ).json();
      successFy("Post criado.");
      props.callback(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div className="w-4/5 mx-auto text-center">
            <h3 className="text-2xl font-bold uppercase mb-4 mt-2">
              Postagem com Foto
            </h3>
            <form className="flex flex-wrap justify-center" onSubmit={sendPost}>
              <div className="w-1/6 text-center">
                <label className="cursor-pointer" htmlFor="postImageInput">
                  <FolderPlus
                    className={`rounded-full p-2 bg-s-black hover:bg-f-gray transition-all`}
                    size={60}
                    weight="bold"
                  />
                </label>
                <input
                  id="postImageInput"
                  className="profileImage hidden"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
              <div className="w-5/6">
                <InputText
                  type="text"
                  class="post_content"
                  label="Conteúdo"
                  placeholder="Descreva sobre"
                />
              </div>
              <Button text="Postar"></Button>
            </form>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-4/5 mx-auto text-center">
            <h3 className="text-2xl font-bold uppercase mb-4 mt-2">
              Postagem com Vídeo
            </h3>
            <form
              className="flex flex-wrap justify-center"
              onSubmit={sendPostVideo}
            >
              <div className="mb-4 w-full flex flex-wrap">
                <div className="w-1/6 text-center">
                  <Article
                    className={`rounded-full p-2 bg-s-black hover:bg-f-gray transition-all`}
                    size={60}
                    weight="bold"
                  />
                </div>
                <div className="w-5/6">
                  <InputText
                    type="text"
                    class="video_content"
                    label="Conteúdo"
                    placeholder="Conteúdo"
                  />
                </div>
              </div>
              <div className="mb-4 w-full flex flex-wrap">
                <div className="w-1/6 text-center">
                  <YoutubeLogo
                    className={`rounded-full p-2 bg-s-black hover:bg-f-gray transition-all`}
                    size={60}
                    weight="bold"
                  />
                </div>
                <div className="w-5/6">
                  <InputText
                    type="text"
                    class="youtube_url"
                    label="Youtube url"
                    placeholder="Youtube url"
                  />
                </div>{" "}
              </div>
              <Button text="Postar"></Button>
            </form>
          </div>
        </SwiperSlide>
      </Swiper>
      <ToastContainer />
    </section>
  );
};
export default PostLogic;
