import CardAbout from "../../Components/CardAbout";

const About = () => {
  return (
    <section>
      <div className="flex flex-wrap">
        <div className="w-full">
          <h1 className="font-light text-2xl p-4 text-center">
            <span className="font-bold">Somos</span> uma empresa apaixonada por{" "}
            <span className="font-bold">tecnologia</span> e{" "}
            <span className="font-bold">eventos</span>, acreditamos que a
            <span className="font-bold">internet</span> pode ser uma poderosa
            ferramenta para conectar <span className="font-bold">artistas</span>{" "}
            e <span className="font-bold">donos de estabelecimentos</span> de
            entretenimento. Nosso objetivo é criar uma plataforma que{" "}
            <span className="font-bold">facilite</span> a{" "}
            <span className="font-bold">comunicação</span> e a{" "}
            <span className="font-bold">colaboração</span> entre esses dois
            grupos, de modo que possam encontrar novas oportunidades e{" "}
            <span className="font-bold">crescer juntos</span>.
          </h1>
          <h2 className="mt-4 font-light text-lg text-center">
            Construido por:
          </h2>
        </div>
        <div className="w-full flex flex-wrap">
          <CardAbout
            name="Alana Vivian"
            resp="Doumentação & Apresentação"
            img="/Peeps/alana_perfil.svg"
          />
          <CardAbout
            name="Bruno Simões"
            resp="Idealizador"
            img="/Peeps/bruno_perfil.svg"
          />
          <CardAbout
            name="Caio César"
            resp="Desenvolvimento"
            img="/Peeps/caio_perfil.svg"
          />
          <CardAbout
            name="Elisa Teixeira"
            resp="Documentação & Apresentação"
            img="/Peeps/elisa_perfil.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
