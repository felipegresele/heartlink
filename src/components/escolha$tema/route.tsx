import videoTemplatePadrao from "../../img/video-tela-inicial/video-template-padrao.mp4";
import ExibirCardCelularesTelaInicial from "../exibir-sessoes-celular/exibir-card-celular-tela-inicial";
import SecaoTempadrao from "../exibir-sessoes-celular/exibir-card-celular-templates";

export function EscolhaTema() {
  return (
    <div className="text-white bg-[#FAFAFA] text-center justify-center text-black flex flex-col">
      <SecaoTempadrao />
      <div className="justify-center text-center">
        <h1 className="text-black text-4xl md:text-5xl font-extrabold">
          O que é a <span className="text-[#e687cd]">Sessão Retrospectiva</span>
        </h1>
        <p className="text-gray-500 text-md max-w-2xl mx-auto mt-5">
          Ao ativar a Retrospectiva, você adiciona seções interativas e
          emocionantes ao seu presente — galeria, linha do tempo, roleta de
          memórias e muito mais. Tudo isso já incluso no plano Para Sempre, sem
          custo adicional. Confira abaixo as seções disponíveis e veja um
          preview de cada uma.
        </p>
      </div>
      <ExibirCardCelularesTelaInicial />
      {/* <ContentTemas /> */}
    </div>
  );
}

function ContentTemas() {
  return (
    <div className="flex text-black bg-white justify-center align-center mb-15">
      <video autoPlay loop playsInline className="w-180 h-150">
        <source
          className="rounded-md"
          src={videoTemplatePadrao}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
