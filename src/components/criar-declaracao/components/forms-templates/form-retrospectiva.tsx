// ============================================================
// ETAPA 7 — FormRetrospectivaSecoes
// Cards visuais estilo mockup + botões Continuar / Pular
// ============================================================
import { motion, AnimatePresence } from "framer-motion";
import type { SectionType } from "../../../../schema/retrospectiva";
import { useRetrospective } from "./retrospectiva/restrospective-context";
import { FiCalendar, FiClock, FiImage } from "react-icons/fi";
import { FaRandom } from "react-icons/fa";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { FaGift, FaMessage, FaTimeline } from "react-icons/fa6";
import FaqsRetrospectiva from "../../../faqs-retrospectiva";
import { ModalContatoAjuda } from "../../../modal-contato/modal-contato";
import { useState } from "react";
import { RiMessage2Line } from "react-icons/ri";

interface Props {
  onContinuar: () => void;
  onPular: () => void;
}

// ── Dados visuais de cada seção (sem "time" — tratado separadamente) ──────
const SECOES_DISPONIVEIS: {
  id: SectionType;
  titulo: string;
  descricao: string;
  badge: React.ReactNode;
  icone: React.ReactNode;
  preview: React.ReactNode;
  gradiente: string;
  badgeColor: string;
}[] = [
  {
    id: "timeline",
    titulo: "Linha do Tempo",
    descricao: "Momentos especiais com foto e história",
    badge: <FiCalendar />,
    icone: <FiClock />,
    gradiente: "from-pink-900/60 to-rose-900/60",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    preview: (
      <div className="flex flex-col gap-1.5 w-full">
        {["Set 2022", "Out 2022", "Jan 2023"].map((mes, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-400 shrink-0" />
            <div className="flex-1 h-2 rounded bg-white/10" />
            <span className="text-[9px] text-white/30">{mes}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "wheel",
    titulo: "Roleta",
    descricao: "Sorteie a próxima aventura do casal",
    badge: <FaRandom />,
    icone: <FaRandom />,
    gradiente: "from-purple-900/60 to-violet-900/60",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    preview: (
      <div className="flex items-center justify-center w-full">
        <div className="relative w-14 h-14">
          {[
            "#FF6B9D",
            "#FFC857",
            "#6EC6FF",
            "#A8E6CF",
            "#B39DDB",
            "#FF8E53",
          ].map((cor, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-4"
              style={{
                borderColor: cor,
                transform: `rotate(${i * 60}deg)`,
                clipPath: "polygon(50% 50%, 100% 0%, 100% 50%)",
                opacity: 0.7,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "gallery",
    titulo: "Galeria de Fotos",
    descricao: "Grid com fotos e legendas especiais",
    badge: <FiImage />,
    icone: <FiImage />,
    gradiente: "from-blue-900/60 to-cyan-900/60",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    preview: (
      <div className="grid grid-cols-3 gap-1 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded bg-white/10 flex items-center justify-center"
          >
            <span className="text-[10px] opacity-30">📷</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "enigma",
    titulo: "Jogo de Palavras",
    descricao: "Cartões que revelam o que você ama",
    badge: <IoExtensionPuzzleSharp />,
    icone: <IoExtensionPuzzleSharp />,
    gradiente: "from-amber-900/60 to-orange-900/60",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    preview: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex gap-1 justify-center">
          {["G", "R", "R", "I", "S", "O"].map((letra, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded bg-white/15 flex items-center justify-center text-[9px] font-bold text-white/60"
            >
              {letra}
            </div>
          ))}
        </div>
        <div className="flex gap-1 justify-center">
          {["_", "_", "_", "_", "_", "_"].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded bg-white/5 border border-white/10"
            />
          ))}
        </div>
        <p className="text-center text-[8px] text-white/30 mt-0.5">
          Adivinhe a palavra ✨
        </p>
      </div>
    ),
  },
];

// ── Componente principal ──────────────────────────────────────
export function FormRetrospectivaSecoes({ onContinuar, onPular }: Props) {
  const { data, toggleSection, toggleEfeitoTime } = useRetrospective();
  const selecionadas = data.secoesSelecionadas;
  const efeitoTimeAtivo = data.efeitoTime;
  const [modalContatoAberto, setModalContatoAberto] = useState(false);

  // Conta como selecionada para habilitar o botão de continuar
  const temAlgoSelecionado = selecionadas.length > 0 || efeitoTimeAtivo;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <div className="flex gap-2 items-center mb-2">
          <FaGift />
          <h3 className="text-white font-bold text-base">
            Seções da Retrospectiva
          </h3>
        </div>
        <p className="text-white/40 text-xs leading-relaxed">
          Escolha os blocos que aparecerão na sua página. Personalize cada um
          depois.
        </p>
      </div>

      {/* Grid de cards de seções normais */}
      <div className="grid grid-cols-2 gap-3">
        {SECOES_DISPONIVEIS.map((secao, idx) => {
          const selecionada = selecionadas.includes(secao.id);

          return (
            <motion.button
              key={secao.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              onClick={() => toggleSection(secao.id)}
              className={`relative flex flex-col rounded-2xl border overflow-hidden text-left transition-all
                ${
                  selecionada
                    ? "border-white/40 shadow-lg shadow-white/5 ring-1 ring-white/20"
                    : "border-white/10 hover:border-white/20"
                }
              `}
            >
              {/* Fundo gradiente */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${secao.gradiente} transition-opacity ${
                  selecionada ? "opacity-100" : "opacity-50"
                }`}
              />

              {/* Badge selecionado */}
              <AnimatePresence>
                {selecionada && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center z-10"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2.5"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Conteúdo */}
              <div className="relative z-10 p-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${secao.badgeColor}`}
                  >
                    {secao.badge} {secao.titulo}
                  </span>
                </div>

                <div
                  className={`w-full rounded-xl p-2.5 transition-colors ${
                    selecionada ? "bg-black/30" : "bg-black/20"
                  }`}
                >
                  {secao.preview}
                </div>

                <p className="text-[10px] text-white/40 leading-tight">
                  {secao.descricao}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Card especial: Tempo Animado (efeitoTime) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: SECOES_DISPONIVEIS.length * 0.07 }}
        className={`relative rounded-2xl border overflow-hidden transition-all cursor-pointer ${
          efeitoTimeAtivo
            ? "border-pink-400/60 shadow-lg shadow-pink-500/10 ring-1 ring-pink-400/30"
            : "border-white/10 hover:border-white/20"
        }`}
        onClick={toggleEfeitoTime}
      >
        {/* Fundo gradiente especial */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-pink-900/60 via-purple-900/50 to-violet-900/60 transition-opacity ${
            efeitoTimeAtivo ? "opacity-100" : "opacity-50"
          }`}
        />

        {/* Partículas decorativas */}
        {efeitoTimeAtivo && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {["#ec4899", "#a855f7", "#8b5cf6", "#f472b6"].map((cor, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-sm opacity-60"
                style={{
                  background: cor,
                  top: `${20 + i * 18}%`,
                  right: `${8 + i * 5}%`,
                  transform: `rotate(${i * 30}deg)`,
                  animation: `pulse ${1 + i * 0.3}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
        )}

        {/* Toggle check */}
        <AnimatePresence>
          {efeitoTimeAtivo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center z-10 shadow-lg shadow-pink-500/40"
            >
              <svg
                viewBox="0 0 12 12"
                className="w-3 h-3"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
              >
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conteúdo */}
        <div className="relative z-10 p-4 flex gap-4 items-center">
          {/* Ícone animado */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
              efeitoTimeAtivo
                ? "bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30"
                : "bg-white/10"
            }`}
          >
            <FaTimeline
              size={22}
              className={efeitoTimeAtivo ? "text-white" : "text-white/40"}
            />
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  efeitoTimeAtivo
                    ? "bg-pink-500/30 text-pink-200 border-pink-400/40"
                    : "bg-white/10 text-white/40 border-white/10"
                }`}
              >
                ✨ Exclusivo
              </span>
            </div>
            <h4
              className={`font-bold text-sm leading-tight ${
                efeitoTimeAtivo ? "text-white" : "text-white/70"
              }`}
            >
              Intro Animada do Casal
            </h4>
            <p className="text-[11px] text-white/40 mt-1 leading-snug">
              Uma intro estilo Spotify Wrapped com o tempo de vocês, fotos
              caindo e efeitos de pixel. Aparece primeiro ao abrir a página.
            </p>
          </div>
        </div>

        {/* Preview da animação (mini) */}
        <div className="relative z-10 mx-4 mb-4 rounded-xl bg-black/40 p-3 flex items-center justify-center gap-3 border border-white/5">
          <div className="flex gap-1">
            {["#ec4899", "#a855f7", "#8b5cf6"].map((cor, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-sm"
                style={{ background: cor, opacity: efeitoTimeAtivo ? 1 : 0.3 }}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/50 font-mono">pixels</span>
          <span className="text-[11px] font-bold text-white/60">→</span>
          <span
            className={`text-[11px] font-extrabold ${
              efeitoTimeAtivo
                ? "bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                : "text-white/30"
            }`}
          >
            Nome do Casal
          </span>
          <span className="text-[11px] font-bold text-white/60">→</span>
          <span
            className={`text-[13px] font-black ${
              efeitoTimeAtivo ? "text-pink-400" : "text-white/30"
            }`}
          >
            365d
          </span>
          <span className="text-[11px] font-bold text-white/60">→</span>
          <span
            className={`text-[13px] font-black ${
              efeitoTimeAtivo ? "text-purple-400" : "text-white/30"
            }`}
          >
            8760h
          </span>
        </div>

        {/* Indicador de estado */}
        <div className="relative z-10 px-4 pb-3">
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden ${
              efeitoTimeAtivo ? "bg-pink-900/50" : "bg-white/5"
            }`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              animate={{ width: efeitoTimeAtivo ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <p
            className={`text-[9px] mt-1.5 text-center font-medium ${
              efeitoTimeAtivo ? "text-pink-400" : "text-white/20"
            }`}
          >
            {efeitoTimeAtivo
              ? "✓ Ativado — aparece ao abrir a página"
              : "Clique para ativar"}
          </p>
        </div>
      </motion.div>

      {/* Contador */}
      <AnimatePresence>
        {temAlgoSelecionado && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-white/30 text-xs"
          >
            {selecionadas.length > 0 && `${selecionadas.length} seção(ões)`}
            {selecionadas.length > 0 && efeitoTimeAtivo && " + "}
            {efeitoTimeAtivo && "Intro animada"}
            {" selecionada(s)"}
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
              {selecionadas.length > 0
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
      <RiMessage2Line
        onClick={() => setModalContatoAberto(true)}
        className="cursor-pointer bg-red-600 rounded-md w-5 h-5"
      />

      <ModalContatoAjuda
        abrirModal={modalContatoAberto}
        onClose={() => setModalContatoAberto(false)}
      />
      <FaqsRetrospectiva />
    </div>
  );
}
