import { useState, useEffect } from "react";
import MusicPlayerFooter from "../music/exibir-musica";
import type { PreviewCarrosselProps } from "../../../../schema/preview";
import { RetrospectiveBtn } from "../forms-templates/retrospectiva/botao-retrospectiva";

export default function PreviewCarrossel({
  titulo = "Seu título aqui",
  mensagem = "Sua mensagem aqui",
  musicaSelecionada = null,
  imagens = [],
  dataConhecimento = "",
  modoExibicao = "padrao",
  modoImagem = "carrossel",
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

  const [modalRetrospectivaAberto ,setModalRetrospectivaAberto] = useState(false)

  // Carrossel automático
  useEffect(() => {
    if (modoImagem !== "carrossel" || imagens.length === 0) return;
    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [imagens, modoImagem]);

  // Contagem de tempo
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
          <div className="mt-4 w-full max-w-[300px] aspect-square overflow-hidden rounded-md mb-4 shadow-lg">
            <img
              src={imagens[indiceAtual]}
              alt="Carrossel"
              className="w-full h-full object-cover"
            />
            <div className="flex justify-center mt-2 gap-2">
              {imagens.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === indiceAtual ? "bg-white" : "bg-gray-500"}`}
                />
              ))}
            </div>
          </div>
        );

      case "slideshow":
        return (
          <div className="relative w-full max-w-[300px] aspect-square overflow-hidden rounded-md mb-4 shadow-lg">
            <img
              src={imagens[indiceAtual]}
              alt="Slideshow"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIndiceAtual((prev) => (prev - 1 + imagens.length) % imagens.length)}
              className="absolute top-1/2 left-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ⟨
            </button>
            <button
              onClick={() => setIndiceAtual((prev) => (prev + 1) % imagens.length)}
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
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Compartilhando momentos há</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(tempoDetalhado).map(([label, value], i) => (
                <div key={i} className="bg-black/60 backdrop-blur-sm rounded-md p-3 flex flex-col items-center border border-white/10">
                  <span className="text-2xl font-bold text-white">{String(value).padStart(2, "0")}</span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-300 mt-6 text-sm">
              Desde {new Date(dataConhecimento).toLocaleDateString("pt-BR")}
            </p>
          </div>
        );

      case "classico":
        return (
          <p className="text-gray-300 mt-6 text-sm italic">
            {tempoDetalhado.anos} anos, {tempoDetalhado.meses} meses, {tempoDetalhado.dias} dias, {tempoDetalhado.horas} horas, {tempoDetalhado.minutos} minutos e {tempoDetalhado.segundos} segundos juntos.
          </p>
        );

      case "simples":
        return (
          <p className="text-gray-300 mt-6 text-base font-medium">
            Estamos juntos há {tempoDetalhado.anos} anos e {tempoDetalhado.meses} meses ❤️
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-400 rounded-md">
 <div className="bg-gray-900 p-8 rounded-xl text-center flex flex-col items-center relative overflow-hidden min-h-[700px] border border-white/5 shadow-2xl transition-all duration-500">
      {/* <BackgroundEffects effect={efeitoFundo} /> */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="bg-white w-[400px] flex flex-col items-center justify-center p-4"> 
        {renderImagens()}
        <h1 style={{ color: "black", fontFamily: "Arial", fontSize: "24px" }} className="mb-6 drop-shadow-md">{titulo}</h1>
        </div>
        <p style={{ fontSize: "24px" }} className="max-w-[500px] break-words whitespace-pre-wrap overflow-hidden p-4 text-gray-200 leading-relaxed">{mensagem}</p>
        {renderTempo()}
      </div>
      
    </div>
    <div className=" w-full relative z-10">
        <RetrospectiveBtn isVisible={() => setModalRetrospectivaAberto(true)} />
          {modalRetrospectivaAberto && <RetrospectiveModal onClose={() => setModalRetrospectivaAberto(false)} />}
        <MusicPlayerFooter musica={musicaSelecionada ?? null} />
      </div>
    </div>
  );
}

function RetrospectiveModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-pink-100 rounded-full p-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#f472b6" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="#f472b6"/>
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Retrospectiva bloqueada
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">
            A retrospectiva só poderá ser acessada após o{" "}
            <span className="text-pink-400 font-medium">presente</span> ficar
            pronto e pago.
          </p>

          <button
            onClick={onClose}
            className="mt-2 w-full py-2.5 rounded-xl bg-pink-400 text-white text-sm font-medium hover:bg-pink-500 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}