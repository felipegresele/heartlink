import { useState, useEffect } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";

import type { PreviewCarrosselProps } from "../../../../schema/preview";
import { RetrospectiveBtn } from "../forms-templates/retrospectiva/botao-retrospectiva";
import { SpotifyPlayerCard } from "../tela-presente/template-padrao/page-ready-template-spotify";

const TEMPO_LABELS: Record<string, string> = {
  anos: "Anos",
  meses: "Meses",
  dias: "Dias",
  horas: "Horas",
  minutos: "Minutos",
  segundos: "Segundos",
};

const THUMB_LABELS = ["Nossos Dates", "Fotos aleatórias", "Nossa jornada"];

export default function PreviewSpotify({
  titulo = "Seu título aqui",
  mensagem = "Sua mensagem aqui",
  musicaSelecionada = null,
  imagens = [],
  dataConhecimento = "",
  tipoPresenteado,
}: PreviewCarrosselProps) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [modalRetrospectivaAberto, setModalRetrospectivaAberto] = useState(false);
  const [tempo, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    if (imagens.length === 0) return;
    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [imagens]);

  useEffect(() => {
    if (!dataConhecimento) return;
    const intervalo = setInterval(() => {
      const agora = new Date();
      const inicio = new Date(dataConhecimento);

      let diff = agora.getTime() - inicio.getTime();
      let segundos = Math.floor(diff / 1000);
      let minutos = Math.floor(segundos / 60);
      let horas = Math.floor(minutos / 60);
      let dias = Math.floor(horas / 24);
      let anos = Math.floor(dias / 365);

      segundos %= 60;
      minutos %= 60;
      horas %= 24;
      dias %= 365;
      const meses = Math.floor(dias / 30);
      dias %= 30;

      setTempo({ anos, meses, dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dataConhecimento]);

  const dataInicio = dataConhecimento ? new Date(dataConhecimento) : null;
  const anoInicio = dataInicio ? dataInicio.getFullYear() : null;

  return (
    <div className="rounded-md overflow-hidden border border-gray-400">
      <div
        className="relative min-h-[700px] w-full text-white pb-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #1f4b5f 0%, #14313f 32%, #0a1620 65%, #000000 100%)",
        }}
      >
        {/* ── Barra superior estilo Spotify ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <FaChevronDown size={18} className="text-white/80" />
          <p className="text-xs font-bold tracking-wide text-white/90 flex items-center gap-1">
            Juntos para sempre <span>💖</span>
          </p>
          <FaEllipsisH size={18} className="text-white/80" />
        </div>

        {/* ── Player ── */}
        <div className="px-5 pt-2">
          <SpotifyPlayerCard
            capa={imagens[indiceAtual]}
            musicaId={musicaSelecionada?.id}
            musicaTitulo={musicaSelecionada?.title}
            artista={musicaSelecionada?.channelTitle || "Playlist do casal"}
          />
        </div>

        {/* ── Sobre Vocês ── */}
        <div className="px-5 mt-9">
          <h2 className="text-lg font-extrabold mb-3">Sobre Vocês</h2>
          <div className="bg-[#121212]/70 backdrop-blur rounded-2xl p-4 border border-white/5">
            {imagens[0] && (
              <img
                src={imagens[0]}
                alt={titulo}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}
            <p className="text-xl font-extrabold">{titulo}</p>
            {anoInicio && (
              <p className="text-white/50 text-sm mb-4">
                Juntos desde {anoInicio}
              </p>
            )}

            {dataConhecimento && (
              <div className="grid grid-cols-3 gap-2.5 mt-2">
                {Object.entries(tempo).map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-black/50 rounded-lg p-3 flex flex-col items-center border border-white/10"
                  >
                    <span className="text-xl font-bold">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-white/50">
                      {TEMPO_LABELS[label]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Mensagem especial ── */}
        {mensagem && (
          <div className="px-5 mt-6">
            <div className="bg-[#3d9bff]/15 border border-[#3d9bff]/30 rounded-2xl p-5">
              <p className="text-[#7fc2ff] font-bold text-sm mb-2">
                Mensagem especial
              </p>
              <p
                className={`text-white whitespace-pre-wrap leading-snug font-medium ${
                  mostrarMensagem ? "" : "line-clamp-3"
                }`}
              >
                {mensagem}
              </p>
              <button
                onClick={() => setMostrarMensagem((v) => !v)}
                className="mt-4 bg-white text-[#0a1620] font-bold text-sm px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                {mostrarMensagem ? "Ocultar Mensagem" : "Mostrar Mensagem"}
              </button>
            </div>
          </div>
        )}

        {/* ── Conheça o casal (fotos) ── */}
        {imagens.length > 0 && (
          <div className="px-5 mt-8">
            <h2 className="text-lg font-extrabold mb-3">
              Conheça {titulo || "o casal"}
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {imagens.slice(0, 3).map((foto, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={foto}
                    alt={THUMB_LABELS[i % THUMB_LABELS.length]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2">
                    <span className="text-[11px] font-bold text-white">
                      {THUMB_LABELS[i % THUMB_LABELS.length]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA Retrospectiva — mesmo comportamento do preview padrão ── */}
        <div className="mt-10">
          <RetrospectiveBtn
            tipoPresenteado={tipoPresenteado ?? undefined}
            isVisible={() => setModalRetrospectivaAberto(true)}
          />
          {modalRetrospectivaAberto && (
            <RetrospectivaBloqueadaModal
              onClose={() => setModalRetrospectivaAberto(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function RetrospectivaBloqueadaModal({ onClose }: { onClose: () => void }) {
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