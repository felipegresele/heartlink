// ============================================================
// ETAPA 7 — FormRetrospectivaSecoes
// Layout estilo showcase: celular à esquerda + info à direita
// Navegação por dots/setas, seleção por CTA, suporte a vídeo
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiImage } from "react-icons/fi";
import { FaRandom } from "react-icons/fa";
import { IoExtensionPuzzleSharp, IoEye } from "react-icons/io5";
import { FaGift, FaTimeline } from "react-icons/fa6";
import { RiMessage2Line } from "react-icons/ri";

import videoLinhaTempo from "../../../../../img/retrospectiva-sessao/video-linha-tempo.mp4";
import videoGaleria from "../../../../../img/retrospectiva-sessao/video-galeria.mp4";
import videoRoleta from "../../../../../img/retrospectiva-sessao/video-roleta.mp4";
import videoEnigma from "../../../../../img/retrospectiva-sessao/video-enigma.mp4";
import videoIntroducao from "../../../../../img/retrospectiva-sessao/video-introducao.mp4";
import videoUltimaSessao from "../../../../../img/retrospectiva-sessao/video-ultima-tela.mp4";
import type { SectionType } from "../../../../../schema/retrospectiva";
import { useRetrospective } from "../retrospectiva/restrospective-context";
import { MemoriaInput } from "../retrospectiva/memoria-input";
import { ModalContatoAjuda } from "../../../../modal-contato/modal-contato";

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
  cor: string;
  videoUrl?: string;
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
      "Reviva os momentos mais especiais em uma linha do tempo animada e cheia de carinho.",
    cor: "#ec4899",
    videoUrl: videoLinhaTempo,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col px-3 pt-5 pb-2">
        <p className="text-white text-[13px] font-bold text-center">
          Nossa história com você, mãe
        </p>
        <p className="text-white/40 text-[9px] text-center mb-3">
          Os momentos que nunca vamos esquecer
        </p>
        <div className="flex flex-col gap-2 overflow-hidden">
          {[
            {
              mes: "Maio 2022",
              texto: "O dia em que você nos trouxe ao mundo",
              emoji: "📷",
            },
            {
              mes: "Jun 2022",
              texto: "O dia em que você nos trouxe ao mundo",
              emoji: "🌹",
            },
            {
              mes: "Dez 2022",
              texto: "Primeira vez que você nos surpreendeu com seu amor",
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
      "Deixe o acaso escolher a próxima surpresa que você vai fazer para ela. Gire e descubra um mimo para este dia especial.",
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
        <p className="text-white/30 text-[9px]">Toque para surpreender</p>
      </div>
    ),
  },
  {
    id: "gallery",
    badge: "Galeria",
    badgeIcon: <FiImage size={11} />,
    titulo: "Galeria de Fotos",
    descricao:
      "Um álbum cheio de amor. Adicione fotos e mensagens especiais para cada memória que vocês compartilharam.",
    cor: "#3b82f6",
    videoUrl: videoGaleria,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col px-3 pt-5 pb-3">
        <p className="text-white text-[13px] font-bold text-center mb-3">
          Memórias com você, mãe
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
      "Cartões interativos que revelam as palavras que descrevem o seu amor por ela. Uma experiência única e emocionante.",
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
    titulo: "Intro Animada para Mamãe",
    descricao:
      "Uma intro especial dedicada a sua mãe, fotos caindo e efeitos de pixel. Aparece primeiro ao abrir a retrospectiva do presente.",
    cor: "#ec4899",
    videoUrl: videoIntroducao,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-2.5 px-4 relative overflow-hidden">
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
          Nossa história para a melhor mãe do mundo
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
export function FormRetrospectivaSecoesDiaDasMaes({ onContinuar, onPular }: Props) {
  const { data, toggleSection, toggleEfeitoTime } = useRetrospective();
  const [current, setCurrent] = useState(0);
  const [modalContatoAberto, setModalContatoAberto] = useState(false);
  const [abrirModalVideo, setAbrirModalVideo] = useState(false);

  const secao = SECOES[current];
  const total = SECOES.length;

  const isSelected =
    secao.id === "time"
      ? data.efeitoTime
      : data.secoesSelecionadas.includes(secao.id as SectionType);

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

  const countLabel = [
    data.secoesSelecionadas.length > 0
      ? `${data.secoesSelecionadas.length} seção(ões)`
      : null,
    data.efeitoTime ? "Intro animada" : null,
  ]
    .filter(Boolean)
    .join(" + ");

  return (
    <div className="flex flex-col gap-5 ">
      {/* Header */}
      <div>
        <div className="flex gap-2 items-center mb-1">
          <FaGift className="text-[#e687cd]" size={20} />
          <h3 className="text-black font-bold text-base">
            Seções da Retrospectiva para sua querida Mãe
          </h3>
          <RiMessage2Line
            onClick={() => setModalContatoAberto(true)}
            className="cursor-pointer bg-[#e687cd] text-white rounded-md w-8 h-6"
          />
        </div>
        <p className="text-gray-500 font-0bold text-md font-bold leading-relaxed">
          Escolha as seções que vão compor o presente especial e surpreenda-a com memórias únicas.
        </p>
      </div>

      {/* ── Layout showcase ── */}
      <div className="flex flex-col items-center justify-center w-full gap-6 mt-2 md:flex-row">
        {/* Celular */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <HeartDecor />
          <div
            className="relative w-[250px] h-[500px] rounded-[20px] overflow-hidden flex-shrink-0"
            style={{
              border: "5px solid #1a1a2e",
              boxShadow: "0 0 0 1.5px #2a2a4a",
              background: "#0d0d1a",
            }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#1a1a2e] rounded-full z-10" />

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

        <div className="flex flex-col items-center gap-4 text-center self-center max-w-xs">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold"
            style={{
              borderColor: secao.cor + "60",
              background: secao.cor + "22",
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
              className="text-black font-extrabold text-2xl leading-tight"
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
              className="text-black text-md leading-relaxed max-w-sm"
            >
              {secao.descricao}
            </motion.p>
          </AnimatePresence>

          {/* Dots + setas */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-white/25 bg-[#e687cd] flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors text-lg"
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {SECOES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-200 rounded-full border-none"
                  style={{
                    width: i === current ? "22px" : "8px",
                    height: "8px",
                    background:
                      i === current ? secao.cor : "rgba(2, 2, 2, 0.3)",
                    borderRadius: i === current ? "4px" : "50%",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-white/25 flex items-center bg-[#e687cd] justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors text-lg"
            >
              ›
            </button>
          </div>

          {/* Botão adicionar seção */}
          <motion.button
            onClick={handleToggle}
            animate={{
              background: isSelected ? "#e687cd" : secao.cor,
            }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xs py-3 rounded-xl text-white font-bold text-sm flex flex-col items-center justify-center gap-0.5 border-none"
          >
            <span className="text-[11px] font-medium opacity-80">
              {isSelected ? "Adicionado ✓" : "Experiência Completa"}
            </span>
            <span>
              {isSelected
                ? "Remover seção ✕"
                : "Sim! Quero adicionar agora ↗"}
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
            className="text-center text-black text-sm font-medium"
          >
            ✅ {countLabel} selecionada(s)
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {temAlgoSelecionado && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white/3 p-4"
          >
            <div className="flex items-center gap-2 mb-1 justify-between">
              <p className="text-black font-semibold text-sm">
                Memórias especiais
              </p>
              <div className="gap-2 flex">
                <button onClick={() => setAbrirModalVideo(true)}>
                  <IoEye className="text-[#e687cd] hover:text-pink-500 cursor-pointer border border-[#e687cd] rounded-md" />
                </button>
                <span className="text-black text-xs ml-auto">Opcional</span>
              </div>
            </div>

            <MemoriaInput
              icon="❤️"
              label="O que você aprendeu com sua mãe de mais valioso?"
              placeholder="Ex: Um conselho…"
              field="ondeSeConheceram"
            />
            <MemoriaInput
              icon="💫"
              label="Momento favorito junto(as)"
              placeholder="Ex: Quando ela me buscou de surpresa, o dia que…"
              field="momentoFavorito"
            />
            <MemoriaInput
              icon="🚀"
              label="O que você deseja fazer com ela"
              placeholder="Ex: Viajar com ela, passar mais tempo juntos…"
              field="proximoPasso"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botões de ação */}
      <div className="flex flex-col gap-3 pt-1">
        <AnimatePresence>
          {temAlgoSelecionado && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-black text-xs text-center flex items-center gap-1.5">
                <span>👇</span>
                Clique abaixo para personalizar cada seção e ver a prévia da
                página.
              </p>
              <motion.button
                onClick={onContinuar}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-black font-extrabold text-base flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
                  boxShadow:
                    "0 0 24px rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #e687cd 50%, transparent 100%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">✨ Personalizar seções →</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onPular}
          className="w-full py-3 rounded-xl border border-gray-500 text-black font-medium text-sm hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-colors"
        >
          → Continuar sem retrospectiva
        </button>
      </div>

      <ModalContatoAjuda
        abrirModal={modalContatoAberto}
        onClose={() => setModalContatoAberto(false)}
      />

      {/* ── Modal de vídeo — corrigido para não estourar a tela ── */}
      {abrirModalVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-4"
          onClick={() => setAbrirModalVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-black rounded-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAbrirModalVideo(false)}
              className="absolute top-2 right-3 text-white text-2xl z-10"
            >
              ✕
            </button>

            <video
              autoPlay
              controls
              className="w-full max-h-[90vh] object-contain"
            >
              <source src={videoUltimaSessao} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Corações decorativos ao redor do celular ──────────────
function HeartDecor() {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className="absolute -top-2 -left-8 w-12 h-12 text-pink-400 opacity-50"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute top-4 -right-10 w-15 h-10 text-pink-500 opacity-35"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute top-1/2 -left-8 w-10 h-10 text-pink-800 opacity-25"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute -bottom-3 -right-8 w-15 h-15 text-pink-600 opacity-40"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
    </>
  );
}