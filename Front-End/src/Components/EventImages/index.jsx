import { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage";
import { Buffer } from "buffer";
import { API_URL } from "../../Utils/Admin";
import Loader from "../Loader";
import styles from "./styles.module.css";

const EventImages = (props) => {
  const [eventImages, setEventImages] = useState(<Loader />);
  useEffect(() => {
    formatEventImages(props.order, props.accepter, props.proposer);
  }, []);
  const formatEventImages = async (order, accepter, proposer) => {
    const accepterPubId = await (
      await fetch(`${API_URL}/Id-to-pubId`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${accepter.split(":")[1]}`).toString(
            "base64"
          )}`,
        }),
      })
    ).json();

    const proposerPubId = await (
      await fetch(`${API_URL}/Id-to-pubId`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${proposer.split(":")[1]}`).toString(
            "base64"
          )}`,
        }),
      })
    ).json();

    if (accepterPubId && proposerPubId) {
      if (order === "Artists") {
        setEventImages(
          <div className={`${styles.eventImages} flex`}>
            <ProfileImage
              name={"Artista"}
              pubId={accepterPubId.pubId}
              type={"Artists"}
            />
            <ProfileImage
              name={"Estabelecimento"}
              pubId={proposerPubId.pubId}
              type={"Establishment"}
            />
          </div>
        );
      }
      if (order === "Establishment") {
        setEventImages(
          <div className={`${styles.eventImages} flex`}>
            <ProfileImage
              name={"Estabelecimento"}
              pubId={proposerPubId.pubId}
              type={"Establishment"}
            />
            <ProfileImage
              name={"Artista"}
              pubId={accepterPubId.pubId}
              type={"Artists"}
            />
          </div>
        );
      }
    }
  };
  return eventImages;
};

export default EventImages;
