import crypto from "crypto";

const SecretJwtGenerator = () => {
  return crypto.randomBytes(64).toString("hex");
};

export default SecretJwtGenerator;
