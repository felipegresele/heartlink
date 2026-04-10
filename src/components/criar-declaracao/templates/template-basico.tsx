import { useState } from "react";
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
import type { User } from "../../../schema/user";
import { FiAlertCircle } from "react-icons/fi";

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

  const [modoExibicao, setModoExibicao] = useState<
    "padrao" | "classico" | "simples"
  >("padrao");
  const [modoImagem, setModoImagem] = useState<
    "carrossel" | "grid" | "slideshow"
  >("carrossel");

  const [efeitoFundo, setEfeitoFundo] = useState<EffectType>("none");

  const [paymentPageLink, setPaymentPageLink] = useState("");

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

  const [isCreating, setIsCreating] = useState(false);

  function proximaEtapa() {
    if (!validarEtapaAtual()) {
      alert("Preencha os campos antes de continuar")
      return;
    }
    setEtapa((prev) => prev + 1);
  }

  function voltarEtapa() {
    setEtapa((prev) => prev - 1);
  }

  async function criarPagina() {

    setIsCreating(true);

    const storedUser = localStorage.getItem("user");
    const usuario = storedUser ? JSON.parse(storedUser) : null;

    if (!usuario) {
      alert("Você precisa estar logado para criar uma página!");
      setIsCreating(false);
      return;
    }

    const response = await fetch(
      "https://lovepage-backend.onrender.com/api/love-pages",
      {
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
      },
    );

    const data = await response.json();

    await fetch(
      `https://lovepage-backend.onrender.com/api/love-pages/${data.id}/send-qr`,
      { method: "POST" },
    );

    const paymentRes = await fetch(
      "https://lovepage-backend.onrender.com/api/payment/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: data.id,
          planType: selectedPlan,
        }),
      },
    );

    const rawResponse = await paymentRes.text();
    const paymentLink = rawResponse.replace(/^"|"$/g, "");

    setPaymentPageLink(paymentLink);
  }

  function validarEtapaAtual() {
  switch (etapa) {
    case 1:
      return titulo.trim().length > 0;

    case 2:
      return mensagem.trim().length > 0;

    case 3:
      return imagens.length > 0;

    case 4:
      return musicaSelecionada !== null;

    case 5:
      return dataConhecimento !== "";

    case 6:
      return true;

    case 7:
      return true;

    case 8:
      return selectedPlan !== null;

    default:
      return true;
  }
}

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-white min-h-screen">
      <div className="flex-1 space-y-6 min-h-[calc(100vh-160px)] md:min-h-auto">
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

        {etapa === 9 && (
          <>
            <StepHeader
              icon={FaFont}
              titulo="Finalizar"
              descricao="Gere seu link e QR Code de pagamento."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <p className="text-sm text-orange-300 flex items-center gap-2 border border-orange-300 p-4 rounded-xl">
              <FiAlertCircle /> Importante: o QR Code para acessar a sua pagína personalizada será
              enviado pela nossa equipe para o seu email após o pagamento ser
              efetuado com sucesso
            </p>
            <button
              onClick={criarPagina}
              disabled={isCreating}
              className="p-4 rounded-xl w-full font-bold shadow-lg transition-all bg-pink-600 hover:bg-pink-700 cursor-pointer"
            >
               Criar página ❤️
            </button>
            {isCreating ? <span className="text-md text-gray-200">Pagamento sendo criado, aguarde...</span> : ""}
            {paymentPageLink && (
              <div className="mt-6 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center gap-4 text-black animate-in zoom-in-95 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800">
                  Acesse o link de pagamento
                </h2>
                <p className="text-gray-500 text-center">
                  Atenção: o QR code será enviado no seu email cadastrado na sua
                  conta:{" "}
                  <span className="text-gray-700 font-medium">
                    {JSON.parse(localStorage.getItem("user") || "{}").email}
                  </span>
                </p>
                <a
                  href={paymentPageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
                >
                  Ir para pagamento
                </a>

                <QRCodeCanvas value={paymentPageLink} size={180} />

                <p className="text-xs text-gray-400 break-all text-center">
                  {paymentPageLink}
                </p>
              </div>
            )}
          </>
        )}

        <div
          className={`flex justify-between items-center pt-6 border-t border-white/10 gap-2 ${etapa === 8 ? "mt-12 md:mt-6" : ""}`}
        >
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

      {etapa !== 8 ? (
        <div>
          <h1 className="text-xl font-bold text-center">
            Pré Visualização do seu site:
          </h1>
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
