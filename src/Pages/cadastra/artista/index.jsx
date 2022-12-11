import Button from "../../../Components/Button/Button";
import { useEffect, useState } from "react";
import InputText from "../../../Components/InputText";

const CreateAccArtista = () => {
  const [nome, setNome] = useState("");
  const [nomeArt, setNomeArt] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    document
      .querySelector("form.Form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        setNome(document.querySelector("form.Form .Nome").value);
        setNomeArt(document.querySelector("form.Form .NomeArtistico").value);
        setCpf(document.querySelector("form.Form .cpf").value);

        // console.log(
        //   await (await fetch("http://127.0.0.1:3333/createAcc")).json()
        // );

        try {
          console.log(nome, nomeArt, cpf);
          await fetch("http://127.0.0.1:3333/createAcc", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Caio",
              nameArt: "Artista",
              cpf: "123",
            }),
          });
        } catch (err) {
          console.log(err);
        }
      });
  }, []);

  return (
    <>
      <form className="Form">
        <InputText class="Nome" label="Nome" placeholder="Seu nome"></InputText>
        <br />
        <InputText
          class="NomeArtistico"
          label="NomeArtistico"
          placeholder="Seu Nome Artistico"
        ></InputText>
        <br />
        <InputText class="cpf" label="CPF" placeholder="Seu CPF"></InputText>
        <br />
        <Button text="Enviar"></Button>
      </form>
    </>
  );
};
export default CreateAccArtista;
