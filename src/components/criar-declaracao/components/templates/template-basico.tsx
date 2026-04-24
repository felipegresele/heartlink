import { useState, useEffect } from "react";
import {
  FaFont,
  FaImages,
  FaMusic,
  FaCalendar,
  FaPalette,
  FaCommentDots,
} from "react-icons/fa";
import {
  RetrospectiveProvider,
  useRetrospective,
} from "../forms-templates/retrospectiva/restrospective-context";
import { TimelineSection } from "../forms-templates/retrospectiva/timeline-section";
import { WheelSection } from "../forms-templates/retrospectiva/roleta";
import { GallerySection } from "../forms-templates/retrospectiva/galeria-sessao";
import { EnigmaSection } from "../forms-templates/retrospectiva/enigma-sessao";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { saveRetrospective } from "../../../../api/retrospectiva";
import StepHeader from "../ui/StepHeader";
import { FormTitulo } from "../forms-templates/form-titulo";
import { FormMensagem } from "../forms-templates/form-mensagem";
import { FormImagens } from "../forms-templates/img-cloudnary/form-imagens";
import { FormTempoConhecimento } from "../forms-templates/form-tempo";
import { FormModoImagem } from "../forms-templates/form-modo-imagens";
import { FormModoExibicao } from "../forms-templates/form-modo-exibicao";
import { FormRetrospectivaSecoes } from "../forms-templates/form-retrospectiva";
import { EscolherPlano } from "../forms-templates/escolher-plano";
import { PagamentoStep } from "../forms-templates/carrinho-pagamento";
import PreviewCarrossel from "../preview/preview-carrosel";
import ContentEscolherMusica from "../music/escolher-musica";
import { MensagemComEfeitoEscritaRetrospectiva } from "../mensagem-efeito/mensagem-efeito";
import FaqsRetrospectiva from "../../../faqs-retrospectiva";

const DRAFT_KEY = "heartlink_criador_rascunho";

type SubEtapaRetrospectiva = "selecao" | "formulario";

function lerRascunho() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function FormsSecoesSelecionadas({
  onVoltar,
  onContinuar,
}: {
  onVoltar: () => void;
  onContinuar: () => void;
}) {
  const { data } = useRetrospective();
  const selecionadas = data.secoesSelecionadas;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-bold text-base mb-1">
          Personalize suas seções
        </h3>
        <p className="text-white/40 text-xs">
          Preencha os dados de cada seção que você escolheu.
        </p>
      </div>

      <div className="space-y-8">
        {selecionadas.includes("timeline") && (
          <div className="border border-white/10 rounded-2xl p-4">
            <TimelineSection />
          </div>
        )}
        {selecionadas.includes("wheel") && (
          <div className="border border-white/10 rounded-2xl p-4">
            <WheelSection />
          </div>
        )}
        {selecionadas.includes("gallery") && (
          <div className="border border-white/10 rounded-2xl p-4">
            <GallerySection />
          </div>
        )}
        {selecionadas.includes("enigma") && (
          <div className="border border-white/10 rounded-2xl p-4">
            <EnigmaSection />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/10 gap-2">
        <button
          onClick={onVoltar}
          className="flex items-center gap-2 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 font-bold w-80 h-13 justify-center border border-gray-500"
        >
          <SlArrowLeft size={12} /> Voltar
        </button>
        <button
          onClick={onContinuar}
          className="flex items-center gap-2 px-6 py-2 rounded-lg text-black bg-white hover:bg-gray-100 font-bold w-80 h-13 justify-center"
        >
          Próximo <SlArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

function CriadorDeclaracaoInner() {
  const totalEtapas = 9;

  const rascunho = lerRascunho();

  const [etapa, setEtapa] = useState<number>(rascunho?.etapa ?? 1);
  const [subEtapaRetro, setSubEtapaRetro] = useState<SubEtapaRetrospectiva>(
    rascunho?.subEtapaRetro ?? "selecao",
  );

  const [titulo, setTitulo] = useState<string>(rascunho?.titulo ?? "");
  const [mensagem, setMensagem] = useState<string>(rascunho?.mensagem ?? "");
  const [corTitulo, setCorTitulo] = useState<string>(
    rascunho?.corTitulo ?? "#ffffff",
  );
  const [fonteTitulo, setFonteTitulo] = useState<string>(
    rascunho?.fonteTitulo ?? "Alex Brush, cursive",
  );
  const [tamanhoTitulo, setTamanhoTitulo] = useState<number>(
    rascunho?.tamanhoTitulo ?? 24,
  );
  const [tamanhoMensagem, setTamanhoMensagem] = useState<number>(
    rascunho?.tamanhoMensagem ?? 16,
  );

  const [imagens, setImagens] = useState<string[]>(rascunho?.imagens ?? []);
  const [dataConhecimento, setDataConhecimento] = useState<string>(
    rascunho?.dataConhecimento ?? "",
  );

  const [modoExibicao, setModoExibicao] = useState<
    "padrao" | "classico" | "simples"
  >(rascunho?.modoExibicao ?? "padrao");

  const [modoImagem, setModoImagem] = useState<"carrossel" | "slideshow">(
    rascunho?.modoImagem ?? "carrossel",
  );

  const [musicaSelecionada, setMusicaSelecionada] = useState<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
  } | null>(rascunho?.musicaSelecionada ?? null);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    rascunho?.selectedPlan ?? null,
  );
  const [pageId, setPageId] = useState<string | null>(null);

  // ── Estado do modal de validação ──────────────────────────
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");

  function abrirModal(msg: string) {
    setModalMensagem(msg);
    setModalAberto(true);
  }

  const {
    data: retroData,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetData,
  } = useRetrospective();

  useEffect(() => {
    if (rascunho) {
      loadFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (etapa === 9) return;

    const rascunhoAtual = {
      etapa,
      subEtapaRetro,
      titulo,
      mensagem,
      corTitulo,
      fonteTitulo,
      tamanhoTitulo,
      tamanhoMensagem,
      imagens,
      dataConhecimento,
      modoExibicao,
      modoImagem,
      musicaSelecionada,
      selectedPlan,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(rascunhoAtual));
    saveToLocalStorage();
  }, [
    etapa,
    subEtapaRetro,
    titulo,
    mensagem,
    corTitulo,
    fonteTitulo,
    tamanhoTitulo,
    tamanhoMensagem,
    imagens,
    dataConhecimento,
    modoExibicao,
    modoImagem,
    musicaSelecionada,
    selectedPlan,
    saveToLocalStorage,
  ]);

  function proximaEtapa() {
    if (!validarEtapaAtual()) {
      const mensagens: Record<number, string> = {
        1: "Preencha o título da página antes de continuar.",
        2: "Escreva sua declaração antes de continuar.",
        3: "Adicione pelo menos uma foto antes de continuar.",
        4: "Informe a data em que vocês se conheceram.",
        5: "Escolha uma música antes de continuar.",
        8: "Selecione um plano antes de criar a página.",
      };
      abrirModal(mensagens[etapa] ?? "Preencha os campos antes de continuar.");
      return;
    }
    if (etapa + 1 === 7) {
      setSubEtapaRetro("selecao");
      setVerMaisRetro(false);
    }
    setEtapa((prev) => prev + 1);
  }

  function voltarEtapa() {
    if (etapa === 7 && subEtapaRetro === "formulario") {
      setSubEtapaRetro("selecao");
      return;
    }
    setEtapa((prev) => prev - 1);
  }

  async function criarPagina() {
    const storedUser = localStorage.getItem("user");
    const usuario = storedUser ? JSON.parse(storedUser) : null;

    if (!usuario) {
      abrirModal("Você precisa estar logado para criar uma página!");
      return;
    }

    const response = await fetch(
      "https://lovepage-backend.onrender.com/api/love-pages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: usuario.id,
          receiverName: titulo,
          senderName: usuario.username,
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
    console.log(data);
    const createdPageId: string = data.id;
    setPageId(createdPageId);

    if (retroData.secoesSelecionadas.length > 0 || retroData.efeitoTime) {
      const retrospectivePayload = {
        selectedSections: retroData.secoesSelecionadas,
        efeitoTime: retroData.efeitoTime,
        timeline: retroData.timeline,
        wheel: retroData.wheel,
        gallery: retroData.gallery,
        enigma: retroData.enigma,
        ondeSeConheceram: retroData.ondeSeConheceram,
        momentoFavorito: retroData.momentoFavorito,
        proximoPasso: retroData.proximoPasso,
      };

      try {
        await saveRetrospective(createdPageId, retrospectivePayload);
      } catch (err) {
        console.error("Erro ao salvar retrospectiva:", err);
      }
    }

    localStorage.removeItem(DRAFT_KEY);
    resetData();

    console.log(removeEventListener);
    setEtapa(9);
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
        return dataConhecimento !== "";
      case 5:
        return musicaSelecionada !== null;
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

  // Etapa 7 (ambas sub-etapas) e etapa 9 escondem o footer global
  const esconderFooter = etapa === 7 || etapa === 9;

  const [verMaisRetro, setVerMaisRetro] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-white min-h-screen">
      {/* ── Modal de validação ── */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="bg-gray-900 border border-white/15 rounded-2xl p-6 max-w-sm w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3 text-yellow-400 text-lg">
              ⚠
            </div>
            <p className="text-white font-semibold text-sm mb-1">
              Campo obrigatório
            </p>
            <p className="text-white/50 text-xs mb-5 leading-relaxed">
              {modalMensagem}
            </p>
            <button
              onClick={() => setModalAberto(false)}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-6 min-h-[calc(80vh-140px)] md:min-h-auto">
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

        {etapa === 5 && (
          <>
            <StepHeader
              icon={FaMusic}
              titulo="Escolher música"
              descricao="Escolha uma música que lembra esta pessoa."
              etapa={etapa}
              totalEtapas={totalEtapas}
            />
            <ContentEscolherMusica
              onMusicSelect={setMusicaSelecionada}
              videoSelecionado={musicaSelecionada}
            />
          </>
        )}

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

        {etapa === 7 && subEtapaRetro === "selecao" && (
          <>
            <MensagemComEfeitoEscritaRetrospectiva
              onPular={() => setEtapa((prev) => prev + 1)}
              onVerMais={() => setVerMaisRetro(true)}
              esconderBotoes={verMaisRetro}
            />

            {!verMaisRetro ? (
              <div className="flex justify-start w-full pt-2">
                <button
                  onClick={voltarEtapa}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 font-bold w-80 h-13 justify-center border border-gray-500"
                >
                  <SlArrowLeft size={12} /> Voltar
                </button>
              </div>
            ) : (
              <>
                <FormRetrospectivaSecoes
                  onContinuar={() => {
                    if (retroData.secoesSelecionadas.length === 0) {
                      abrirModal(
                        'Selecione ao menos uma seção da retrospectiva ou clique em "Pular sem retrospectiva" para continuar sem ela.',
                      );
                      return;
                    }
                    setSubEtapaRetro("formulario");
                  }}
                  onPular={() => setEtapa((prev) => prev + 1)}
                />
                <div className="flex justify-start pt-2">
                  <button
                    onClick={voltarEtapa}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 font-bold w-80 h-13 justify-center border border-gray-500"
                  >
                    <SlArrowLeft size={12} /> Voltar
                  </button>
                </div>
              </>
            )}
          </>
        )}
        
        {etapa === 8 && (
          <EscolherPlano
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        )}

        {etapa === 9 && (
          <PagamentoStep pageId={pageId} selectedPlan={selectedPlan} />
        )}

        {!esconderFooter && (
          <div
            className={`flex justify-between items-center pt-6 border-t border-white/10 gap-2 ${etapa === 8 ? "mt-12 md:mt-6" : ""}`}
          >
            <button
              onClick={voltarEtapa}
              disabled={etapa === 1}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 font-bold w-80 h-13 justify-center border border-gray-500 disabled:opacity-40"
            >
              <SlArrowLeft size={12} /> Voltar
            </button>

            {etapa < totalEtapas && (
              <button
                onClick={etapa === 8 ? criarPagina : proximaEtapa}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-black bg-white hover:bg-gray-100 font-bold w-80 h-13 justify-center"
              >
                {etapa === 8 ? "Criar página ❤️" : "Próximo"}{" "}
                <SlArrowRight size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      {etapa !== 1 &&
      etapa !== 2 &&
      etapa !== 3 &&
      etapa !== 7 &&
      etapa !== 8 &&
      etapa !== 9 ? (
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
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export function CriadorDeclaracao() {
  return (
    <RetrospectiveProvider>
      <CriadorDeclaracaoInner />
    </RetrospectiveProvider>
  );
}
