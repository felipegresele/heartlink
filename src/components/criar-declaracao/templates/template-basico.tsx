import React, { useState, useEffect } from "react";
import ContentEscolherMusica from "../components/music/escolher-musica";
import { QRCodeCanvas } from "qrcode.react";
import BackgroundEffects, {
  type EffectType,
} from "../components/effects/BackgroundEffects";
import {
  FaFont,
  FaImages,
  FaMusic,
  FaCalendar,
  FaPalette,
  FaCommentDots,
} from "react-icons/fa";
import StepHeader from "../components/ui/StepHeader";
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
  const totalEtapas = 8;
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

  const [efeitoFundo, setEfeitoFundo] = useState<EffectType>("none");

  const [pageLink, setPageLink] = useState("");

  const [customEmojis, setCustomEmojis] = useState<string[]>(["✨", "🌸", "☁️"]);

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
      {/* COLUNA DO FORMULÁRIO */}
      <div className="flex-1 space-y-6">
        
        {/* ETAPAS 1 a 5 (TÍTULO, MENSAGEM, FOTOS, MÚSICA, DATA) */}
        {etapa === 1 && (
          <>
            <StepHeader icon={FaFont} titulo="Título da página" descricao="Escolha um título especial." etapa={etapa} totalEtapas={totalEtapas} />
            <FormTitulo titulo={titulo} setTitulo={setTitulo} corTitulo={corTitulo} setCorTitulo={setCorTitulo} fonteTitulo={fonteTitulo} setFonteTitulo={setFonteTitulo} tamanhoTitulo={tamanhoTitulo} setTamanhoTitulo={setTamanhoTitulo} />
          </>
        )}

        {etapa === 2 && (
          <>
            <StepHeader icon={FaCommentDots} titulo="Declaração" descricao="Escreva sua mensagem." etapa={etapa} totalEtapas={totalEtapas} />
            <FormMensagem mensagem={mensagem} setMensagem={setMensagem} tamanhoMensagem={tamanhoMensagem} setTamanhoMensagem={setTamanhoMensagem} />
          </>
        )}

        {etapa === 3 && (
          <>
            <StepHeader icon={FaImages} titulo="Fotos" descricao="Adicione suas fotos." etapa={etapa} totalEtapas={totalEtapas} />
            <FormImagens imagens={imagens} setImagens={setImagens} />
          </>
        )}

        {etapa === 4 && (
          <>
            <StepHeader icon={FaMusic} titulo="Escolher música" descricao="Trilha sonora do casal." etapa={etapa} totalEtapas={totalEtapas} />
            <ContentEscolherMusica onMusicSelect={setMusicaSelecionada} videoSelecionado={musicaSelecionada} />
          </>
        )}

        {etapa === 5 && (
          <>
            <StepHeader icon={FaCalendar} titulo="Data" descricao="Quando tudo começou?" etapa={etapa} totalEtapas={totalEtapas} />
            <FormTempoConhecimento dataConhecimento={dataConhecimento} setDataConhecimento={setDataConhecimento} />
          </>
        )}

        {/* ETAPA 6 - LAYOUT (ORGANIZADO) */}
        {etapa === 6 && (
          <>
            <StepHeader icon={FaPalette} titulo="Layout" descricao="Como as fotos e o tempo aparecem." etapa={etapa} totalEtapas={totalEtapas} />
            <FormModoImagem modoImagem={modoImagem} setModoImagem={setModoImagem} />
            <FormModoExibicao modoExibicao={modoExibicao} setModoExibicao={setModoExibicao} />
          </>
        )}

        {/* ETAPA 7 - EFEITOS (ORGANIZADO) */}
        {etapa === 7 && (
          <>
            <StepHeader icon={FaPalette} titulo="Efeitos Visuais" descricao="Animações de fundo." etapa={etapa} totalEtapas={totalEtapas} />
            <div className="mt-6 space-y-6">
              <div>
                <label className="block mb-2 font-bold text-sm text-gray-300">Estilo do Efeito</label>
                <div className="grid grid-cols-3 gap-2">
                  {["none", "coracoes", "estrelas", "pontinhos", "aurora", "custom"].map((eff) => (
                    <button
                      key={eff}
                      onClick={() => setEfeitoFundo(eff as EffectType)}
                      className={`p-2 text-xs rounded border transition-all ${
                        efeitoFundo === eff ? "border-white-500 bg-white-500/20" : "border-gray-600"
                      }`}
                    >
                      {eff.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {efeitoFundo === "custom" && (
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                  <label className="block mb-3 font-bold text-sm text-pink-400">Escolha até 3 emojis</label>
                  <div className="flex flex-wrap gap-2">
                    {["✨", "🌸", "☁️", "🚀", "🔥", "🐱", "🌈", "💎", "🌙", "🍀"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          if (customEmojis.includes(emoji)) {
                            setCustomEmojis(customEmojis.filter((e) => e !== emoji));
                          } else if (customEmojis.length < 3) {
                            setCustomEmojis([...customEmojis, emoji]);
                          }
                        }}
                        className={`text-2xl p-2 rounded-md ${customEmojis.includes(emoji) ? "bg-pink-500/40 border border-pink-500" : "bg-black/40"}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ETAPA 8 - FINALIZAR */}
        {etapa === 8 && (
          <>
            <StepHeader icon={FaFont} titulo="Finalizar" descricao="Gere seu link e QR Code." etapa={etapa} totalEtapas={totalEtapas} />
            <button onClick={criarPagina} className="bg-pink-600 hover:bg-pink-700 p-4 rounded-xl w-full font-bold shadow-lg transition-all">
              Criar página ❤️
            </button>
          </>
        )}

        {/* CONTROLES DE NAVEGAÇÃO (CORRIGIDO) */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <button
            onClick={voltarEtapa}
            disabled={etapa === 1}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 font-bold w-80 h-13 justify-center border border-gray-500"
          >
            <SlArrowLeft size={12} /> Voltar
          </button>
          
          {etapa < totalEtapas && (
            <button
              onClick={proximaEtapa}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-black bg-white hover:bg-gray-100 font-bold w-80 h-13 justify-center"
            >
              Próximo <SlArrowRight size={12} />
            </button>
          )}
        </div>
      </div>

      {/* COLUNA DE PREVIEW */}
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
          efeitoFundo={efeitoFundo}
          customEmojis={customEmojis}
        />
      </div>
        
        {/* QR CODE (Abaixo do Preview) */}
        {pageLink && (
          <div className="mt-6 p-6 bg-white rounded-xl flex flex-col items-center gap-4 text-black animate-in zoom-in-95">
            <h2 className="text-xl font-bold">Página Criada!</h2>
            <QRCodeCanvas value={pageLink} size={180} />
            <p className="text-xs text-gray-500 break-all">{pageLink}</p>
          </div>
        )}
      </div>
  )}

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
  efeitoFundo,
  customEmojis
}: PreviewCarrosselProps & { efeitoFundo: EffectType }) {
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
          <div className="w-full max-w-[400px] aspect-square overflow-hidden rounded-md mb-4 shadow-lg">
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
          <div className="grid grid-cols-2 gap-2 mb-4 w-full max-w-[400px]">
            {imagens.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Imagem ${i}`}
                className="w-full h-32 object-cover rounded-md shadow-md"
              />
            ))}
          </div>
        );

      case "slideshow":
        return (
          <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-md mb-4 shadow-lg">
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
              className="absolute top-1/2 left-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ⟨
            </button>
            <button
              onClick={() =>
                setIndiceAtual((prev) => (prev + 1) % imagens.length)
              }
              className="absolute top-1/2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
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
          <div className="mt-4 text-center w-full max-w-[500px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Compartilhando momentos há
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(tempoDetalhado).map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-black/60 backdrop-blur-sm rounded-md p-3 flex flex-col items-center border border-white/10"
                >
                  <span className="text-2xl font-bold">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-6 text-sm">
              Desde {new Date(dataConhecimento).toLocaleDateString("pt-BR")}
            </p>
          </div>
        );

      case "classico":
        return (
          <p className="text-gray-300 mt-6 text-sm italic">
            {tempoDetalhado.anos} anos, {tempoDetalhado.meses} meses,{" "}
            {tempoDetalhado.dias} dias, {tempoDetalhado.horas} horas,{" "}
            {tempoDetalhado.minutos} minutos e {tempoDetalhado.segundos}{" "}
            segundos juntos.
          </p>
        );

      case "simples":
        return (
          <p className="text-gray-300 mt-6 text-base font-medium">
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
      <h1 className="font-bold text-center text-[20px] mb-5 text-gray-300 tracking-tight">
        Pré-visualização do seu site
      </h1>

      {/* AJUSTE AQUI: Adicionado min-h e garantido overflow-hidden para os corações */}
      <div className="bg-gray-900 p-8 rounded-xl text-center flex flex-col items-center relative overflow-hidden min-h-[700px] border border-white/5 shadow-2xl transition-all duration-500">
        {/* O BackgroundEffects agora vai preencher esses 700px ou mais */}
        <BackgroundEffects effect={efeitoFundo} />

        {/* Conteúdo com Z-10 para ficar ACIMA dos efeitos */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1
            className="mb-6 drop-shadow-md"
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
            className="max-w-[500px] break-words whitespace-pre-wrap overflow-hidden p-4 text-gray-200 leading-relaxed"
            style={{ fontSize: `${tamanhoMensagem}px` }}
          >
            {mensagem || "Sua mensagem aqui"}
          </p>

          {renderTempo()}
        </div>

        {/* Footer da música fixo no fundo da área de preview */}
        <div className="mt-30 w-full relative z-10">
          <MusicPlayerFooter musica={musicaSelecionada ?? null} />
        </div>
      </div>
    </>
  );
}
