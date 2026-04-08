import React, { useState } from "react";
import ContentEscolherMusica from "../components/music/escolher-musica";
import { QRCodeCanvas } from "qrcode.react";
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
import { FormTitulo } from "../components/forms-templates/form-titulo";
import { FormModoExibicao } from "../components/forms-templates/form-modo-exibicao";
import { FormModoImagem } from "../components/forms-templates/form-modo-imagens";
import { FormTempoConhecimento } from "../components/forms-templates/form-tempo";
import { FormImagens } from "../components/forms-templates/form-imagens";
import { FormMensagem } from "../components/forms-templates/form-mensagem";
import PreviewCarrossel from "../components/preview/preview-carrosel";
import { EscolherPlano } from "../components/forms-templates/escolher-plano";
import type { EffectType } from "../components/effects/BackgroundEffects";

export function CriadorDeclaracao() {
  const totalEtapas = 9;
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

  const [customEmojis, setCustomEmojis] = useState<string[]>([
    "✨",
    "🌸",
    "☁️",
  ]);

  const [musicaSelecionada, setMusicaSelecionada] = useState<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
  } | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  

  function proximaEtapa() {
    setEtapa((prev) => prev + 1);
  }

  function voltarEtapa() {
    setEtapa((prev) => prev - 1);
  }

  async function criarPagina() {
    const storedUser = localStorage.getItem("user");
    const usuario = storedUser ? JSON.parse(storedUser) : null;
    console.log(usuario);

    if (!usuario) {
      alert("Você precisa estar logado para criar uma página!");
    }

    const response = await fetch("http://localhost:8080/api/love-pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: usuario.id,
        receiverName: titulo,
        senderName: "Felipe",
        message: mensagem,
        photos: imagens,
        relationshipStartDate: dataConhecimento,
        musicId: musicaSelecionada?.id,
        musicTitle: musicaSelecionada?.title,
        theme: modoExibicao,
        planType: selectedPlan,
      }),
    });

    const data = await response.json();

    console.log(data);

    const linkPagina = `http://localhost:5173/p/${data.slug}`;

    setPageLink(linkPagina);

    localStorage.removeItem("criadorDeclaracao");
    setTitulo("");
    setMensagem("");
    setCorTitulo("#ffffff");
    setFonteTitulo("Alex Brush, cursive");
    setTamanhoTitulo(24);
    setTamanhoMensagem(16);
    setImagens([]);
    setDataConhecimento("");
    setModoExibicao("padrao");
    setModoImagem("carrossel");
    setEfeitoFundo("none");
    setCustomEmojis(["✨", "🌸", "☁️"]);
    setMusicaSelecionada(null);
    setSelectedPlan(null);
    setEtapa(1);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-white min-h-screen">
      {/* COLUNA DO FORMULÁRIO */}
      <div className="flex-1 space-y-6">
        {/* ETAPAS 1 a 5 (TÍTULO, MENSAGEM, FOTOS, MÚSICA, DATA) */}
        {etapa === 1 && (
          <>
            <StepHeader
              icon={FaFont}
              titulo="Título da página"
              descricao="Escolha um título especial."
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

        {etapa === 2 && (
          <>
            <StepHeader
              icon={FaCommentDots}
              titulo="Declaração"
              descricao="Escreva sua mensagem."
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

        {etapa === 3 && (
          <>
            <StepHeader
              icon={FaImages}
              titulo="Fotos"
              descricao="Adicione suas fotos."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <FormImagens imagens={imagens} setImagens={setImagens} />
          </>
        )}

        {etapa === 4 && (
          <>
            <StepHeader
              icon={FaMusic}
              titulo="Escolher música"
              descricao="Escolha uma musíca que lembra esta pessoa."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <ContentEscolherMusica
              onMusicSelect={setMusicaSelecionada}
              videoSelecionado={musicaSelecionada}
            />
          </>
        )}

        {etapa === 5 && (
          <>
            <StepHeader
              icon={FaCalendar}
              titulo="Data"
              descricao="Quando tudo começou?"
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <FormTempoConhecimento
              dataConhecimento={dataConhecimento}
              setDataConhecimento={setDataConhecimento}
            />
          </>
        )}

        {/* ETAPA 6 - LAYOUT (ORGANIZADO) */}
        {etapa === 6 && (
          <>
            <StepHeader
              icon={FaPalette}
              titulo="Layout"
              descricao="Como as fotos e o tempo aparecem."
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

        {/* ETAPA 7 - EFEITOS (ORGANIZADO) */}
        {etapa === 7 && (
          <>
            <StepHeader
              icon={FaPalette}
              titulo="Efeitos Visuais"
              descricao="Animações de fundo."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <div className="mt-6 space-y-6">
              <div>
                <label className="block mb-2 font-bold text-sm text-gray-300">
                  Estilo do Efeito
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "none",
                    "coracoes",
                    "estrelas",
                    "pontinhos",
                    "aurora",
                    "custom",
                  ].map((eff) => (
                    <button
                      key={eff}
                      onClick={() => setEfeitoFundo(eff as EffectType)}
                      className={`p-2 text-xs rounded border transition-all ${
                        efeitoFundo === eff
                          ? "border-white-500 bg-white-500/20"
                          : "border-gray-600"
                      }`}
                    >
                      {eff.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {efeitoFundo === "custom" && (
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                  <label className="block mb-3 font-bold text-sm text-pink-400">
                    Escolha até 3 emojis
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "✨",
                      "🌸",
                      "☁️",
                      "🚀",
                      "🔥",
                      "🐱",
                      "🌈",
                      "💎",
                      "🌙",
                      "🍀",
                    ].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          if (customEmojis.includes(emoji)) {
                            setCustomEmojis(
                              customEmojis.filter((e) => e !== emoji),
                            );
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

        {etapa === 8 && (
          <EscolherPlano
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        )}

        {/* ETAPA 8 - FINALIZAR */}
        {etapa === 9 && (
          <>
            <StepHeader
              icon={FaFont}
              titulo="Finalizar"
              descricao="Gere seu link e QR Code."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <button
              onClick={criarPagina}
              className="bg-pink-600 hover:bg-pink-700 p-4 rounded-xl w-full font-bold shadow-lg transition-all"
            >
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
          _
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
  );
}
