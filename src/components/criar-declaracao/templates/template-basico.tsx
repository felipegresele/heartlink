import { useState } from "react";
import ContentEscolherMusica from "../components/music/escolher-musica";
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
import { PagamentoStep } from "../components/forms-templates/carrinho-pagamento";
import { FormRetrospectivaSecoes } from "../components/forms-templates/form-retrospectiva";
import {
  RetrospectiveProvider,
  useRetrospective,
} from "../components/forms-templates/retrospectiva/restrospective-context";
import { TimelineSection } from "../components/forms-templates/retrospectiva/timeline-section";
import { WheelSection } from "../components/forms-templates/retrospectiva/roleta";
import { GallerySection } from "../components/forms-templates/retrospectiva/galeria-sessao";
import { EnigmaSection } from "../components/forms-templates/retrospectiva/enigma-sessao";
import { saveRetrospective } from "../../../api/retrospectiva";

type SubEtapaRetrospectiva = "selecao" | "formulario";

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

// ─────────────────────────────────────────────────────────────
// Componente interno que acessa o contexto da retrospectiva
// (precisa estar dentro do RetrospectiveProvider)
// ─────────────────────────────────────────────────────────────
function CriadorDeclaracaoInner() {
  const totalEtapas = 9;
  const [etapa, setEtapa] = useState(1);
  const [subEtapaRetro, setSubEtapaRetro] =
    useState<SubEtapaRetrospectiva>("selecao");

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
  const [modoImagem, setModoImagem] = useState<"carrossel" | "slideshow">(
    "carrossel"
  );

  const [musicaSelecionada, setMusicaSelecionada] = useState<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
  } | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [pageId, setPageId] = useState<string | null>(null);

  // Acessa os dados da retrospectiva do contexto
  const { data: retroData } = useRetrospective();

  function proximaEtapa() {
    if (!validarEtapaAtual()) {
      alert("Preencha os campos antes de continuar");
      return;
    }
    if (etapa + 1 === 7) setSubEtapaRetro("selecao");
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
      alert("Você precisa estar logado para criar uma página!");
      return;
    }

    // 1. Cria a página principal
    const response = await fetch(
      "https://lovepage-backend.onrender.com/api/love-pages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      }
    );

    const data = await response.json();
    console.log(data)
    const createdPageId: string = data.id;
    setPageId(createdPageId);

    // 2. Se o usuário preencheu alguma seção de retrospectiva, salva no backend
    if (retroData.secoesSelecionadas.length > 0) {
      // Monta o JSON no formato esperado pelo backend
      const retrospectivePayload = {
        selectedSections: retroData.secoesSelecionadas,
        timeline: retroData.timeline,
        wheel: retroData.wheel,
        gallery: retroData.gallery,
        enigma: retroData.enigma,
      };

      try {
        await saveRetrospective(createdPageId, retrospectivePayload);
      } catch (err) {
        // Não bloqueia o fluxo — apenas loga o erro
        console.error("Erro ao salvar retrospectiva:", err);
      }
    }

    console.log(removeEventListener)
    setEtapa(9);
  }

  function validarEtapaAtual() {
    switch (etapa) {
      case 1: return titulo.trim().length > 0;
      case 2: return mensagem.trim().length > 0;
      case 3: return imagens.length > 0;
      case 4: return dataConhecimento !== "";
      case 5: return musicaSelecionada !== null;
      case 6: return true;
      case 7: return true;
      case 8: return selectedPlan !== null;
      default: return true;
    }
  }

  const etapa7Ativa = etapa === 7;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-white min-h-screen">
      <div className="flex-1 space-y-6 min-h-[calc(100vh-160px)] md:min-h-auto">

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
            <StepHeader icon={FaCalendar} titulo="Data" descricao="Quando tudo começou?" etapa={etapa} totalEtapas={totalEtapas} />
            <FormTempoConhecimento dataConhecimento={dataConhecimento} setDataConhecimento={setDataConhecimento} />
          </>
        )}

        {etapa === 5 && (
          <>
            <StepHeader icon={FaMusic} titulo="Escolher música" descricao="Escolha uma música que lembra esta pessoa." etapa={etapa} totalEtapas={totalEtapas} />
            <ContentEscolherMusica onMusicSelect={setMusicaSelecionada} videoSelecionado={musicaSelecionada} />
          </>
        )}

        {etapa === 6 && (
          <>
            <StepHeader icon={FaPalette} titulo="Layout" descricao="Como as fotos e o tempo aparecem." etapa={etapa} totalEtapas={totalEtapas} />
            <FormModoImagem modoImagem={modoImagem} setModoImagem={setModoImagem} />
            <FormModoExibicao modoExibicao={modoExibicao} setModoExibicao={setModoExibicao} />
          </>
        )}

        {etapa === 7 && subEtapaRetro === "selecao" && (
          <FormRetrospectivaSecoes
            onContinuar={() => setSubEtapaRetro("formulario")}
            onPular={() => setEtapa((prev) => prev + 1)}
          />
        )}

        {etapa === 7 && subEtapaRetro === "formulario" && (
          <FormsSecoesSelecionadas
            onVoltar={() => setSubEtapaRetro("selecao")}
            onContinuar={() => setEtapa((prev) => prev + 1)}
          />
        )}

        {etapa === 8 && (
          <EscolherPlano selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
        )}

        {etapa === 9 && (
          <PagamentoStep pageId={pageId} selectedPlan={selectedPlan} />
        )}

        {!etapa7Ativa && (
          <div className={`flex justify-between items-center pt-6 border-t border-white/10 gap-2 ${etapa === 8 ? "mt-12 md:mt-6" : ""}`}>
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

      {etapa !== 7 && etapa !== 8 && etapa !== 9 ? (
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