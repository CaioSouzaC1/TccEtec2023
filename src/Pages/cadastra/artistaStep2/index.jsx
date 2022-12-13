import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";

const CreateAccArtistaStepTwo = () => {
  const sendForm = async (event) => {
    event.preventDefault();

    const selectInput = (seletor) => {
      return document.querySelector(`form.Form ${seletor}`).value;
    };

    const nome = selectInput(".Nome");
    const nomeArt = selectInput(".NomeArtistico");
    const cpf = selectInput(".cpf");
    const whatsApp = selectInput(".whatsApp");

    try {
      const createArt = await fetch("http://127.0.0.1:3333/createAcc", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          nameArt: nomeArt,
          cpf: cpf,
          email: "email@email.com",
          pass: "senha",
          whatsApp: whatsApp,
        }),
      });
      console.log(createArt.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="Form" onSubmit={sendForm}>
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
        <InputText
          class="whatsApp"
          label="WhatsApp"
          placeholder="Seu whatsApp"
        ></InputText>
        <br />
        <Button text="Enviar"></Button>
      </form>
    </>
  );
};
export default CreateAccArtistaStepTwo;
