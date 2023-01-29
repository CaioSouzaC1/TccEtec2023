import { Buffer } from "buffer";
const generateDocId = (id1, id2) => {
  let hash = Buffer.from(id1 + id2)
    .toString("base64")
    .substring(40, 70);

  return hash;
};

export default generateDocId;
