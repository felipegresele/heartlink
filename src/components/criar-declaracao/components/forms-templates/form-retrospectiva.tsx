// ============================================================
// ETAPA 7 — FormRetrospectivaSecoes
// Layout estilo showcase: celular à esquerda + info à direita
// Navegação por dots/setas, seleção por CTA, suporte a vídeo
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionType } from "../../../../schema/retrospectiva";
import { useRetrospective } from "./retrospectiva/restrospective-context";
import { FiCalendar, FiImage } from "react-icons/fi";
import { FaRandom } from "react-icons/fa";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { FaGift, FaTimeline } from "react-icons/fa6";
import { RiMessage2Line } from "react-icons/ri";
import FaqsRetrospectiva from "../../../faqs-retrospectiva";
import { ModalContatoAjuda } from "../../../modal-contato/modal-contato";

import videoLinhaTempo from "../../../../img/retrospectiva-sessao/video-linha-tempo.mp4";
import videoGaleria from "../../../../img/retrospectiva-sessao/video-galeria.mp4";
import videoRoleta from "../../../../img/retrospectiva-sessao/video-roleta.mp4";
import videoEnigma from "../../../../img/retrospectiva-sessao/video-enigma.mp4";

interface Props {
  onContinuar: () => void;
  onPular: () => void;
}

// ── Tipos ──────────────────────────────────────────────────
interface SecaoConfig {
  id: SectionType | "time";
  badge: string;
  badgeIcon: React.ReactNode;
  titulo: string;
  descricao: string;
  cor: string; // hex — usado em badge, dot ativo, botão
  videoUrl?: string; // se tiver vídeo, renderiza <video>; senão, usa preview
  preview: React.ReactNode;
}

// ── Dados das seções ───────────────────────────────────────
const SECOES: SecaoConfig[] = [
  {
    id: "timeline",
    badge: "Linha do Tempo",
    badgeIcon: <FiCalendar size={11} />,
    titulo: "Linha do Tempo",
    descricao:
      "Reviva sua jornada com uma linha do tempo animada e elegante, destacando os marcos mais importantes da sua história.",
    cor: "#ec4899",
    videoUrl: videoLinhaTempo,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col px-3 pt-5 pb-2">
        <p className="text-white text-[13px] font-bold text-center">
          Nossa Jornada
        </p>
        <p className="text-white/40 text-[9px] text-center mb-3">
          Cada momento que nos trouxe até aqui
        </p>
        <div className="flex flex-col gap-2 overflow-hidden">
          {[
            {
              mes: "Maio 2022",
              texto: "Nossas almas se encontraram pela primeira vez",
              emoji: "📷",
            },
            {
              mes: "Jun 2022",
              texto: "Nosso primeiro encontro especial",
              emoji: "🌹",
            },
            {
              mes: "Dez 2022",
              texto: "Viagem inesquecível juntos",
              emoji: "✈️",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-2 flex gap-2 items-start"
            >
              <div className="w-9 h-11 bg-white/5 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                {item.emoji}
              </div>
              <div>
                <p className="text-pink-400 text-[9px] font-semibold mb-0.5">
                  {item.mes}
                </p>
                <p className="text-white/60 text-[8px] leading-snug">
                  {item.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "wheel",
    badge: "Roleta",
    badgeIcon: <FaRandom size={11} />,
    titulo: "Roleta",
    descricao:
      "Deixe o acaso decidir a próxima aventura do casal. Gire e descubram juntos o que fazer a seguir.",
    cor: "#a855f7",
    videoUrl: videoRoleta,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-white text-[13px] font-bold">Próxima Aventura</p>
        <p className="text-white/40 text-[9px]">Gire para descobrir</p>
        <div
          className="w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center relative overflow-hidden"
          style={{
            background:
              "conic-gradient(#ec4899 0deg 60deg, #a855f7 60deg 120deg, #6ee7b7 120deg 180deg, #fbbf24 180deg 240deg, #f87171 240deg 300deg, #60a5fa 300deg 360deg)",
          }}
        >
          <div className="w-6 h-6 rounded-full bg-[#0d0816] border-[3px] border-[#1a1a2e]" />
        </div>
        <p className="text-white/30 text-[9px]">Toque para girar</p>
      </div>
    ),
  },
  {
    id: "gallery",
    badge: "Galeria",
    badgeIcon: <FiImage size={11} />,
    titulo: "Galeria de Fotos",
    descricao:
      "Um mosaico cheio de memórias. Adicione fotos e legendas especiais para cada momento marcante da história de vocês.",
    cor: "#3b82f6",
    videoUrl: videoGaleria,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col px-3 pt-5 pb-3">
        <p className="text-white text-[13px] font-bold text-center mb-3">
          Nossas Memórias
        </p>
        <div className="grid grid-cols-3 gap-1 flex-1">
          {["📷", "🌹", "🎂", "🎵", "✈️", "🌅", "💌", "🎉", "🥂"].map(
            (e, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-lg flex items-center justify-center text-sm aspect-square"
              >
                {e}
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    id: "enigma",
    badge: "Jogo de Palavras",
    badgeIcon: <IoExtensionPuzzleSharp size={11} />,
    titulo: "Jogo de Palavras",
    descricao:
      "Cartões interativos que revelam as palavras que descrevem o amor de vocês. Uma experiência única e divertida.",
    cor: "#f59e0b",
    videoUrl: videoEnigma,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-white text-[12px] font-bold">Adivinhe a palavra</p>
        <div className="flex gap-1">
          {["A", "M", "O", "R", "❤️", "S"].map((l, i) => (
            <div
              key={i}
              className="w-[22px] h-[22px] bg-[#1a1a2e] rounded flex items-center justify-center text-amber-400 text-[10px] font-bold"
            >
              {l}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="w-[22px] h-[22px] bg-[#0d0d1a] border border-white/10 rounded"
              />
            ))}
        </div>
        <p className="text-white/30 text-[9px]">Toque nas letras ✨</p>
      </div>
    ),
  },
  {
    id: "time",
    badge: "Intro Animada",
    badgeIcon: <FaTimeline size={11} />,
    titulo: "Intro Animada do Casal",
    descricao:
      "Uma intro estilo Spotify Wrapped com o tempo de vocês, fotos caindo e efeitos de pixel. Aparece primeiro ao abrir a página.",
    cor: "#ec4899",
    videoUrl: videoLinhaTempo,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-2.5 px-4 relative overflow-hidden">
        {/* scanlines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #a855f7 2px, #a855f7 3px)",
          }}
        />
        <div className="flex gap-1 mb-1">
          {["#ec4899", "#a855f7", "#8b5cf6"].map((c, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-sm"
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="text-white/40 text-[9px] font-mono">pixels →</p>
        <p className="text-white text-sm font-extrabold tracking-wide">
          Nome do Casal
        </p>
        <div className="flex gap-4 mt-1">
          <div className="text-center">
            <p className="text-pink-400 text-lg font-black">365d</p>
            <p className="text-white/30 text-[8px]">dias</p>
          </div>
          <div className="text-center">
            <p className="text-purple-400 text-lg font-black">8760h</p>
            <p className="text-white/30 text-[8px]">horas</p>
          </div>
        </div>
        <span className="absolute top-5 right-3 text-sm opacity-40">✨</span>
        <span className="absolute bottom-7 left-3 text-xs opacity-30">💫</span>
      </div>
    ),
  },
];

// ── Helper: converte id para SectionType (exclui "time") ──
function isSectionType(id: string): id is SectionType {
  return id !== "time";
}

// ── Componente principal ───────────────────────────────────
export function FormRetrospectivaSecoes({ onContinuar, onPular }: Props) {
  const { data, toggleSection, toggleEfeitoTime } = useRetrospective();
  const [current, setCurrent] = useState(0);
  const [modalContatoAberto, setModalContatoAberto] = useState(false);

  const secao = SECOES[current];
  const total = SECOES.length;

  // Verifica se a seção atual está selecionada
  const isSelected =
    secao.id === "time"
      ? data.efeitoTime
      : data.secoesSelecionadas.includes(secao.id as SectionType);

  // Qualquer coisa selecionada habilita o botão de continuar
  const temAlgoSelecionado =
    data.secoesSelecionadas.length > 0 || data.efeitoTime;

  function handleToggle() {
    if (secao.id === "time") {
      toggleEfeitoTime();
    } else if (isSectionType(secao.id)) {
      toggleSection(secao.id);
    }
  }

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }

  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  // Contagem de selecionadas (para exibição)
  const countLabel = [
    data.secoesSelecionadas.length > 0
      ? `${data.secoesSelecionadas.length} seção(ões)`
      : null,
    data.efeitoTime ? "Intro animada" : null,
  ]
    .filter(Boolean)
    .join(" + ");

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <div className="flex gap-2 items-center mb-1">
          <FaGift className="text-white/60" />
          <h3 className="text-white font-bold text-base">
            Seções da Retrospectiva
          </h3>
          {/* Botão de contato */}
          <RiMessage2Line
            onClick={() => setModalContatoAberto(true)}
            className="cursor-pointer bg-red-600 rounded-md w-5 h-5"
          />
        </div>
        <p className="text-white/40 text-xs leading-relaxed">
          Navegue pelas seções e adicione as que quiser à sua página.
        </p>
      </div>

      {/* ── Layout showcase ── */}
      <div className="flex gap-10 items-center justify-center min-h-[400px] w-full">
        {/* Celular */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          {/* Corações decorativos */}
          <HeartDecor />

          {/* Frame do celular */}
          <div
            className="relative w-[200px] h-[380px] rounded-[28px] overflow-hidden flex-shrink-0"
            style={{
              border: "5px solid #1a1a2e",
              boxShadow: "0 0 0 1.5px #2a2a4a",
              background: "#0d0d1a",
            }}
          >
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#1a1a2e] rounded-full z-10" />

            {/* Tela — vídeo ou preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={secao.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                {secao.videoUrl ? (
                  <video
                    src={secao.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  secao.preview
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Info lateral */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border w-fit text-[10px] font-semibold"
            style={{
              borderColor: secao.cor + "40",
              background: secao.cor + "18",
              color: secao.cor,
            }}
          >
            {secao.badgeIcon}
            {secao.badge}
          </div>

          {/* Título */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={secao.id + "-title"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-white font-extrabold text-xl leading-tight"
            >
              {secao.titulo}
            </motion.h2>
          </AnimatePresence>

          {/* Descrição */}
          <AnimatePresence mode="wait">
            <motion.p
              key={secao.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="text-white/50 text-xs leading-relaxed w-100"
            >
              {secao.descricao}
            </motion.p>
          </AnimatePresence>

          {/* Dots + setas */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors text-base"
            >
              ‹
            </button>

            <div className="flex items-center gap-1.5">
              {SECOES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-200 rounded-full border-none"
                  style={{
                    width: i === current ? "20px" : "7px",
                    height: "7px",
                    background:
                      i === current ? secao.cor : "rgba(255,255,255,0.2)",
                    borderRadius: i === current ? "4px" : "50%",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors text-base"
            >
              ›
            </button>
          </div>

          {/* Botão principal */}
          <motion.button
            onClick={handleToggle}
            animate={{
              background: isSelected ? "#16a34a" : secao.cor,
            }}
            transition={{ duration: 0.25 }}
            className="max-w-70 py-3 rounded-xl text-white font-bold text-sm flex flex-col items-center justify-center gap-0.5 border-none"
          >
            <span className="text-[10px] font-medium opacity-70">
              {isSelected ? "Adicionado ✓" : "Experiência Completa"}
            </span>
            <span>
              {isSelected ? "Remover seção ✕" : "Sim! Quero adicionar agora ↗"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Contador de selecionadas */}
      <AnimatePresence>
        {temAlgoSelecionado && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-white text-xs"
          >
            {countLabel} selecionada(s)
          </motion.p>
        )}
      </AnimatePresence>

      {/* Botões de ação */}
      <div className="flex flex-col gap-2 pt-1">
        <AnimatePresence>
          {temAlgoSelecionado && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={onContinuar}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              {data.secoesSelecionadas.length > 0
                ? "Personalizar seções →"
                : "Continuar →"}
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={onPular}
          className="w-full py-2.5 rounded-xl border border-white/10 text-white/40 font-medium text-xs hover:text-white/60 hover:border-white/20 transition-colors"
        >
          Pular — sem retrospectiva
        </button>
      </div>

      <ModalContatoAjuda
        abrirModal={modalContatoAberto}
        onClose={() => setModalContatoAberto(false)}
      />

      <FaqsRetrospectiva />
    </div>
  );
}

// ── Corações decorativos ao redor do celular ──────────────
function HeartDecor() {
  return (
    <>
      {/* coração grande superior esquerdo */}
      <svg
        viewBox="0 0 24 24"
        className="absolute -top-2 -left-4 w-8 h-8 text-red-400 opacity-50"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      {/* coração médio superior direito */}
      <svg
        viewBox="0 0 24 24"
        className="absolute top-4 -right-5 w-6 h-6 text-red-500 opacity-35"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      {/* coração pequeno meio esquerdo */}
      <svg
        viewBox="0 0 24 24"
        className="absolute top-1/2 -left-6 w-5 h-5 text-red-400 opacity-25"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      {/* coração grande inferior direito */}
      <svg
        viewBox="0 0 24 24"
        className="absolute -bottom-3 -right-4 w-8 h-8 text-red-500 opacity-40"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
    </>
  );
}
