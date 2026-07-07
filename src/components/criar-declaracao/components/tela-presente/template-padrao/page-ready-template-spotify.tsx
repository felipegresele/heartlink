import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChevronDown,
  FaEllipsisH,
  FaPause,
  FaPlay,
  FaRandom,
  FaRedo,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

import ModalPresente from "../modal/modal-ver-presente";
import {
  RetrospectiveModal,
  type TipoPresenteado,
} from "../template-padrao/page-ready-template-padrao";
import SpotifySingleScreen from "../../forms-templates/retrospectiva/efeito-transicao-sessao";
import type { RetrospectiveData } from "../../../../../schema/retrospectiva";
import { RetrospectiveSpotifyBtn } from "../../forms-templates/retrospectiva/botao-retrospectiva-spotify";
import SectionPopularPlaylist from "../../reusable-sections/section-popular";

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════
function calcularTempoDesdeData(dataConhecimento: string) {
  const inicio = new Date(dataConhecimento);
  const agora = new Date();
  const diffMs = agora.getTime() - inicio.getTime();
  const totalHoras = Math.floor(diffMs / (1000 * 60 * 60));
  const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { totalDias, totalHoras };
}

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const TEMPO_LABELS: Record<string, string> = {
  anos: "Anos",
  meses: "Meses",
  dias: "Dias",
  horas: "Horas",
  minutos: "Minutos",
  segundos: "Segundos",
};

const THUMB_LABELS = ["Nossos Dates", "Fotos aleatórias", "Nossa jornada"];

function fmtTime(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ── Player do YouTube em segundo plano (motor de áudio real) ────────────────
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function preloadYTScript() {
  if (window.YT && window.YT.Player) return;
  if (document.getElementById("yt-api-script")) return;
  const script = document.createElement("script");
  script.id = "yt-api-script";
  script.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(script);
}

function waitForYT(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
  });
}

// ════════════════════════════════════════════════════════════════════════════
// PLAYER — CARD ESTILO SPOTIFY (topo da página)
// ════════════════════════════════════════════════════════════════════════════
export function SpotifyPlayerCard({
  capa,
  musicaId,
  musicaTitulo,
  artista,
}: {
  capa?: string;
  musicaId?: string;
  musicaTitulo?: string;
  artista: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ytReady, setYtReady] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!musicaId) return;
    preloadYTScript();
    waitForYT().then(() => setYtReady(true));
  }, [musicaId]);

  const startTick = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setElapsed(Math.floor(playerRef.current.getCurrentTime()));
      }
    }, 500);
  }, []);

  const stopTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTick();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          /* noop */
        }
        playerRef.current = null;
      }
    };
  }, [stopTick]);

  const initPlayer = useCallback(() => {
    if (!musicaId || !containerRef.current) return;

    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(musicaId);
      return;
    }

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: musicaId,
      width: "1",
      height: "1",
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onReady: (e: any) => {
          setDuration(Math.floor(e.target.getDuration()));
          e.target.playVideo();
          setPlaying(true);
          startTick();
        },
        onStateChange: (e: any) => {
          if (e.data === 1) {
            setPlaying(true);
            setDuration(Math.floor(e.target.getDuration()));
            startTick();
          } else if (e.data === 2 || e.data === 0) {
            setPlaying(false);
            stopTick();
          }
        },
      },
    });
  }, [musicaId, startTick, stopTick]);

  const handlePlayPause = () => {
    if (!musicaId) return;
    if (!playerRef.current) {
      if (!ytReady) return;
      initPlayer();
      return;
    }
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleRestart = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0, true);
    setElapsed(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const seekTo = Math.round(
      ((e.clientX - rect.left) / rect.width) * duration,
    );
    playerRef.current.seekTo(seekTo, true);
    setElapsed(seekTo);
  };

  // Fallback decorativo — quando não há música cadastrada
  const temMusica = Boolean(musicaId);
  const progresso =
    duration > 0
      ? Math.min((elapsed / duration) * 100, 100)
      : temMusica
        ? 0
        : 5;
  const restante = duration > 0 ? duration - elapsed : 0;

  return (
    <div className="w-full max-w-sm mx-auto">
      {capa && (
        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
          <img src={capa} alt="Capa" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between mt-5">
        <div className="min-w-0 pr-3">
          <p className="text-xl font-extrabold text-white truncate">
            {musicaTitulo || "Nossa Canção"}
          </p>
          <p className="text-sm text-white/60 truncate">{artista}</p>
        </div>
        <BsCheckCircleFill className="text-[#3d9bff] shrink-0" size={26} />
      </div>

      {/* Barra de progresso */}
      <div
        className="mt-5 h-1.5 rounded-full bg-white/20 cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${progresso}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[11px] text-white/50 font-medium">
        <span>{fmtTime(elapsed)}</span>
        <span>-{fmtTime(restante)}</span>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between mt-5 px-1">
        <button
          onClick={() => setShuffle((s) => !s)}
          className={`transition-colors ${shuffle ? "text-[#1ED760]" : "text-white/50 hover:text-white"}`}
        >
          <FaRandom size={16} />
        </button>
        <button
          onClick={handleRestart}
          className="text-white/70 hover:text-white transition-colors"
        >
          <FaStepBackward size={20} />
        </button>
        <button
          onClick={handlePlayPause}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          {playing ? (
            <FaPause className="text-black" size={18} />
          ) : (
            <FaPlay className="text-black ml-1" size={18} />
          )}
        </button>
        <button
          onClick={handleRestart}
          className="text-white/70 hover:text-white transition-colors"
        >
          <FaStepForward size={20} />
        </button>
        <button
          onClick={() => setRepeat((r) => !r)}
          className={`transition-colors ${repeat ? "text-[#1ED760]" : "text-white/50 hover:text-white"}`}
        >
          <FaRedo size={16} />
        </button>
      </div>

      {/* Player oculto do YouTube — motor real de áudio */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE READY — TEMPLATE SPOTIFY
// ════════════════════════════════════════════════════════════════════════════
export default function PageReadySpotify({
  titulo,
  mensagem,
  imagens = [],
  dataConhecimento,
  musicaId,
  musicaTitulo,
  usuarioNome,
  retrospectiva,
  tipoPresenteado,
}: {
  titulo: string;
  mensagem: string;
  imagens: string[];
  dataConhecimento: string;
  musicaId?: string;
  musicaTitulo?: string;
  usuarioNome: string;
  retrospectiva?: RetrospectiveData;
  tipoPresenteado?: TipoPresenteado;
}) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempo, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [mostrarModal, setMostrarModal] = useState(true);
  const [mostrarRetrospectiva, setMostrarRetrospectiva] = useState(false);
  const [mostrarEfeitoTime, setMostrarEfeitoTime] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const efeitoJaExibido = useRef(false);

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

  const secoesStories = retrospectiva
    ? retrospectiva.secoesSelecionadas.filter((s) => s !== "time")
    : [];
  const temRetrospectiva = secoesStories.length > 0;

  const { totalDias, totalHoras } = dataConhecimento
    ? calcularTempoDesdeData(dataConhecimento)
    : { totalDias: 0, totalHoras: 0 };

  const dataInicio = dataConhecimento ? new Date(dataConhecimento) : null;
  const dataDia = dataInicio ? dataInicio.getDate() : 0;
  const nomeMes = dataInicio ? MESES[dataInicio.getMonth()] : "";
  const anoInicio = dataInicio ? dataInicio.getFullYear() : null;

  const nomeCasal =
    usuarioNome && titulo
      ? `${usuarioNome} e ${titulo}`
      : titulo || usuarioNome;

  function handleShare() {
    const shareData = {
      title: "Sempre juntos 💖",
      text: `Um presente especial para ${titulo}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  }

  return (
    <>
      {mostrarEfeitoTime && retrospectiva?.efeitoTime && (
        <SpotifySingleScreen
          senderName={titulo}
          totalDias={totalDias}
          totalHoras={totalHoras}
          corBarraPrimaria="#1ED760"
          fotos={imagens}
          onFinish={() => {
            setMostrarEfeitoTime(false);
            if (secoesStories.length > 0) {
              setMostrarRetrospectiva(true);
            }
          }}
        />
      )}

      <div
        className="relative min-h-screen w-full text-white pb-28"
        style={{
          background:
            "linear-gradient(180deg, #1f4b5f 0%, #14313f 32%, #0a1620 65%, #000000 100%)",
        }}
      >
        {mostrarModal && (
          <ModalPresente
            usuarioNome={usuarioNome}
            corTextos="#1ED760"
            onClose={() => setMostrarModal(false)}
          />
        )}

        <AnimatePresence>
          {mostrarRetrospectiva && temRetrospectiva && (
            <RetrospectiveModal
              data={retrospectiva!}
              onClose={() => setMostrarRetrospectiva(false)}
              fotos={imagens}
              nomeCasal={titulo}
              totalDias={totalDias}
              dataDia={dataDia}
              nomeMes={nomeMes}
              tipoPresenteado={tipoPresenteado}
            />
          )}
        </AnimatePresence>

        {/* ── Barra superior estilo Spotify ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <button className="text-white/80 hover:text-white transition-colors">
            <FaChevronDown size={18} />
          </button>
          <p className="text-xs font-bold tracking-wide text-white/90 flex items-center gap-1">
            Sempre juntos <span>💖</span>
          </p>
          <button
            onClick={handleShare}
            className="text-white/80 hover:text-white transition-colors"
          >
            <FaEllipsisH size={18} />
          </button>
        </div>

        {/* ── Player ── */}
        <div className="px-5 pt-2">
          <SpotifyPlayerCard
            capa={imagens[indiceAtual]}
            musicaId={musicaId}
            musicaTitulo={musicaTitulo}
            artista={usuarioNome || "Playlist do casal"}
          />
        </div>

        <SectionPopularPlaylist titulo={titulo} imagens={imagens} />

        {/* ── Sobre Vocês ── */}
        <div className="px-5 mt-9">
          <h2 className="text-lg font-extrabold mb-3">Sobre</h2>
          <div className="bg-[#121212]/70 backdrop-blur rounded-2xl p-4 border border-white/5">
            {imagens[0] && (
              <img
                src={imagens[0]}
                alt={nomeCasal}
                className="w-full h-65 object-cover rounded-xl mb-4"
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
            <div className="relative bg-[#3d9bff] rounded-2xl p-5 overflow-hidden">
              <p className="text-white/90 font-bold text-sm mb-3">
                Mensagem especial
              </p>
              <div className="relative">
                <p
                  className={`text-[#0a1620] whitespace-pre-wrap leading-snug font-extrabold text-lg ${
                    mostrarMensagem ? "" : "line-clamp-3"
                  }`}
                >
                  {mensagem}
                </p>
                {!mostrarMensagem && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(61,155,255,0) 0%, #3d9bff 90%)",
                    }}
                  />
                )}
              </div>
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
            <div className="bg-[#1a1a1a] border border-white/15 rounded-2xl p-4">
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
          </div>
        )}

        {/* ── CTA Retrospectiva — mesmo comportamento do template padrão ── */}
        {temRetrospectiva && (
          <div className="mt-10">
            <RetrospectiveSpotifyBtn
              isVisible={() => {
                if (retrospectiva?.efeitoTime && !efeitoJaExibido.current) {
                  efeitoJaExibido.current = true;
                  setMostrarEfeitoTime(true);
                } else {
                  setMostrarRetrospectiva(true);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
