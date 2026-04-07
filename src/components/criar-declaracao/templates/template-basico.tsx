import React, { useState, useEffect } from "react";
import ContentEscolherMusica from "../components/music/escolher-musica";
import { QRCodeCanvas } from "qrcode.react";
import BackgroundEffects from "../components/effects/BackgroundEffects";
import {
  FaRandom,
  FaFont,
  FaImages,
  FaMusic,
  FaCalendar,
  FaPalette,
  FaCommentDots,
} from "react-icons/fa";
import StepHeader from "../components/ui/StepHeader";
import { FiAlertCircle } from "react-icons/fi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import MusicPlayerFooter from "../components/music/exibir-musica";
import { FormTitulo } from "../components/forms-templates/form-titulo";
import { FormModoExibicao } from "../components/forms-templates/form-modo-exibicao";
import { FormModoImagem } from "../components/forms-templates/form-modo-imagens";
import { FormTempoConhecimento } from "../components/forms-templates/form-tempo";
import { FormImagens } from "../components/forms-templates/form-imagens";
import { FormMensagem } from "../components/forms-templates/form-mensagem";
import type { PreviewCarrosselProps } from "../../../schema/preview";

// ---------------------- COMPONENTE PRINCIPAL ----------------------
export function CriadorDeclaracao() {
  const totalEtapas = 7;
  const [etapa, setEtapa] = useState(1);

  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [corTitulo, setCorTitulo] = useState("#ffffff");
  const [fonteTitulo, setFonteTitulo] = useState("Alex Brush, cursive");
  const [tamanhoTitulo, setTamanhoTitulo] = useState(24);
  const [tamanhoMensagem, setTamanhoMensagem] = useState(16);

  const [imagens, setImagens] = useState<string[]>([]);
  const [dataConhecimento, setDataConhecimento] = useState("");

  const [modoExibicao, setModoExibicao] = useState("padrao");
  const [modoImagem, setModoImagem] = useState("carrossel");

  const [pageLink, setPageLink] = useState("");

  const [musicaSelecionada, setMusicaSelecionada] = useState<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
  } | null>(null);

  function proximaEtapa() {
    setEtapa((prev) => prev + 1);
  }

  function voltarEtapa() {
    setEtapa((prev) => prev - 1);
  }

  async function criarPagina() {
    const response = await fetch("http://localhost:8080/api/love-pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiverName: titulo,
        senderName: "Felipe",
        message: mensagem,
        photos: imagens,
        relationshipStartDate: dataConhecimento,
        musicId: musicaSelecionada?.id,
        musicTitle: musicaSelecionada?.title,
        theme: modoExibicao,
        //planType: "premium",
      }),
    });

    const data = await response.json();

    console.log(data);

    const linkPagina = `http://localhost:5173/p/${data.slug}`;

    setPageLink(linkPagina);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-white min-h-screen">
      {/* FORMULÁRIO */}
      <div className="flex-1 space-y-6">
        {/* ETAPA 1 */}
        {etapa === 1 && (
          <>
            <StepHeader
              icon={FaFont}
              titulo="Título da página"
              descricao="Escolha um título especial para sua declaração."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <FormTitulo
              titulo={titulo}
              setTitulo={setTitulo}
              corTitulo={corTitulo}
              setCorTitulo={setCorTitulo}
              fonteTitulo={fonteTitulo}
              setFonteTitulo={setFonteTitulo}
              tamanhoTitulo={tamanhoTitulo}
              setTamanhoTitulo={setTamanhoTitulo}
            />
          </>
        )}

        {/* ETAPA 2 */}
        {etapa === 2 && (
          <>
            <StepHeader
              icon={FaCommentDots}
              titulo="Declaração"
              descricao="Escreva uma mensagem especial ou gere automaticamente."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <FormMensagem
              mensagem={mensagem}
              setMensagem={setMensagem}
              tamanhoMensagem={tamanhoMensagem}
              setTamanhoMensagem={setTamanhoMensagem}
            />
          </>
        )}

        {/* ETAPA 3 */}
        {etapa === 3 && (
          <>
            <StepHeader
              icon={FaImages}
              titulo="Fotos"
              descricao="Adicione fotos especiais do relacionamento."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <p className="text-sm font-medium flex items-center gap-2 text-orange-400">
              <FiAlertCircle /> A exibição das imagens poderá ser personalizada
              na etapa 6.
            </p>

            <FormImagens imagens={imagens} setImagens={setImagens} />
          </>
        )}

        {/* ETAPA 4 */}
        {etapa === 4 && (
          <>
            <StepHeader
              icon={FaMusic}
              titulo="Escolher música"
              descricao="Escolha uma música que represente vocês."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <ContentEscolherMusica
              onMusicSelect={setMusicaSelecionada}
              videoSelecionado={musicaSelecionada}
            />

            {musicaSelecionada && (
              <div className="flex items-center gap-3 mt-3 bg-gray-800 p-2 rounded-md">
                <img
                  src={musicaSelecionada.thumbnail}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="text-left">
                  <p className="text-sm font-medium line-clamp-1">
                    {musicaSelecionada.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {musicaSelecionada.channelTitle}
                  </p>
                </div>
                <button
                  onClick={() => setMusicaSelecionada(null)}
                  className="ml-auto text-red-400 text-xs"
                >
                  Remover
                </button>
              </div>
            )}
          </>
        )}

        {/* ETAPA 5 */}
        {etapa === 5 && (
          <>
            <StepHeader
              icon={FaCalendar}
              titulo="Data do relacionamento"
              descricao="Informe quando vocês se conheceram."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <p className="text-sm font-medium flex items-center gap-2 text-orange-400">
              <FiAlertCircle /> A exibição da data poderá ser personalizada na
              etapa 6.
            </p>

            <FormTempoConhecimento
              dataConhecimento={dataConhecimento}
              setDataConhecimento={setDataConhecimento}
            />
          </>
        )}

        {/* ETAPA 6 */}
        {etapa === 6 && (
          <>
            <StepHeader
              icon={FaPalette}
              titulo="Personalização"
              descricao="Escolha como a página será exibida."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <FormModoImagem
              modoImagem={modoImagem}
              setModoImagem={setModoImagem}
            />

            <FormModoExibicao
              modoExibicao={modoExibicao}
              setModoExibicao={setModoExibicao}
            />
          </>
        )}

        {/* ETAPA FINAL */}
        {etapa === 7 && (
          <>
            <StepHeader
              icon={FaFont}
              titulo="Finalizar"
              descricao="Clique para gerar sua página."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />

            <button
              onClick={criarPagina}
              className="bg-pink-600 hover:bg-pink-700 p-3 rounded-md w-full"
            >
              Criar página ❤️
            </button>
          </>
        )}

        {/* BOTÕES */}
        <div className="flex gap-4 pt-6">
          {etapa > 1 && (
            <button
              onClick={voltarEtapa}
              className="flex bg-gray-800 text-white border border-gray-500 px-4 py-2 rounded-md gap-2 items-center w-90 h-12 justify-center cursor-pointer"
            >
              <SlArrowLeft /> Voltar Etapa
            </button>
          )}

          {etapa < totalEtapas && (
            <button
              onClick={proximaEtapa}
              className="flex bg-white text-black px-4 py-2 rounded-md gap-2 items-center w-90 h-12 justify-center cursor-pointer"
            >
              Próxima Etapa <SlArrowRight />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <PreviewCarrossel
          titulo={titulo}
          mensagem={mensagem}
          corTitulo={corTitulo}
          fonteTitulo={fonteTitulo}
          tamanhoTitulo={tamanhoTitulo}
          tamanhoMensagem={tamanhoMensagem}
          musicaSelecionada={musicaSelecionada}
          imagens={imagens}
          dataConhecimento={dataConhecimento}
          modoExibicao={modoExibicao}
          modoImagem={modoImagem}
        />
      </div>

      {/* QR CODE */}
      {pageLink && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Seu QR Code</h2>

          <QRCodeCanvas value={pageLink} size={220} />

          <p className="text-gray-400 text-sm">Escaneie para abrir</p>

          <p className="text-pink-400 text-sm break-all">{pageLink}</p>
        </div>
      )}
    </div>
  );
}

function PreviewCarrossel({
  titulo,
  mensagem,
  corTitulo,
  fonteTitulo,
  tamanhoTitulo,
  musicaSelecionada,
  tamanhoMensagem,
  imagens,
  dataConhecimento,
  modoExibicao,
  modoImagem,
  //efeitoFundo,
}: PreviewCarrosselProps) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempoDetalhado, setTempoDetalhado] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  // Auto carrossel
  useEffect(() => {
    if (modoImagem !== "carrossel" || imagens.length === 0) return;
    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [imagens, modoImagem]);

  // Tempo
  useEffect(() => {
    if (!dataConhecimento) return;
    const intervalo = setInterval(() => {
      const agora = new Date();
      const inicio = new Date(dataConhecimento);

      let diffMs = agora.getTime() - inicio.getTime();
      let segundos = Math.floor(diffMs / 1000);
      let minutos = Math.floor(segundos / 60);
      let horas = Math.floor(minutos / 60);
      let dias = Math.floor(horas / 24);
      let anos = Math.floor(dias / 365);

      segundos = segundos % 60;
      minutos = minutos % 60;
      horas = horas % 24;
      dias = dias % 365;

      const meses = Math.floor(dias / 30);
      dias = dias % 30;

      setTempoDetalhado({ anos, meses, dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dataConhecimento]);

  // Render imagens
  const renderImagens = () => {
    if (imagens.length === 0) return null;

    switch (modoImagem) {
      case "carrossel":
        return (
          <div className="w-100 h-100 overflow-hidden rounded-md mb-4">
            <img
              src={imagens[indiceAtual]}
              alt="Carrossel"
              className="w-full h-full object-cover"
            />
            <div className="flex justify-center mt-2 gap-2">
              {imagens.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === indiceAtual ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {imagens.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Imagem ${i}`}
                className="w-full h-32 object-cover rounded-md"
              />
            ))}
          </div>
        );

      case "slideshow":
        return (
          <div className="relative w-100 h-100 overflow-hidden rounded-md mb-4">
            <img
              src={imagens[indiceAtual]}
              alt="Slideshow"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() =>
                setIndiceAtual(
                  (prev) => (prev - 1 + imagens.length) % imagens.length,
                )
              }
              className="absolute top-1/2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ⟨
            </button>
            <button
              onClick={() =>
                setIndiceAtual((prev) => (prev + 1) % imagens.length)
              }
              className="absolute top-1/2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ⟩
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Render tempo
  const renderTempo = () => {
    if (!dataConhecimento) return null;

    switch (modoExibicao) {
      case "padrao":
        return (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Compartilhando momentos há
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(tempoDetalhado).map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-black rounded-md p-3 flex flex-col items-center"
                >
                  <span className="text-2xl font-bold">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Desde {new Date(dataConhecimento).toLocaleDateString("pt-BR")}
            </p>
          </div>
        );

      case "classico":
        return (
          <p className="text-gray-300 mt-4 text-sm">
            {tempoDetalhado.anos} anos, {tempoDetalhado.meses} meses,{" "}
            {tempoDetalhado.dias} dias, {tempoDetalhado.horas} horas,{" "}
            {tempoDetalhado.minutos} minutos e {tempoDetalhado.segundos}{" "}
            segundos juntos.
          </p>
        );

      case "simples":
        return (
          <p className="text-gray-300 mt-4 text-sm">
            Estamos juntos há {tempoDetalhado.anos} anos e{" "}
            {tempoDetalhado.meses} meses ❤️
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="font-bold text-center text-[20px] mb-5">
        Pré-visualização do seu site
      </h1>

      <div className="bg-gray-800 p-4 rounded-md text-center flex flex-col items-center relative overflow-hidden">
        {/* <BackgroundEffects effect={efeitoFundo} /> */}

        <div className="relative z-10">
          <h1
            className="mb-4"
            style={{
              color: corTitulo,
              fontFamily: fonteTitulo,
              fontSize: `${tamanhoTitulo}px`,
            }}
          >
            {titulo || "Seu título aqui"}
          </h1>

          {renderImagens()}

          <p
            className="max-w-full break-words whitespace-pre-wrap overflow-hidden p-2"
            style={{ fontSize: `${tamanhoMensagem}px` }}
          >
            {mensagem || "Sua mensagem aqui"}
          </p>

          {renderTempo()}
        </div>

        <div className="mt-20">
          <MusicPlayerFooter musica={musicaSelecionada ?? null} />
        </div>
      </div>
    </>
  );
}
