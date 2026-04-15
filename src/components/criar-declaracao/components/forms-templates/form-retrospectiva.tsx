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
import { FaGift, FaTimeline } from "react-icons/fa6";

interface Props {
  onContinuar: () => void; // avança para os formulários das seções
  onPular: () => void;     // pula sem selecionar nada
}

// ── Dados visuais de cada seção ───────────────────────────────
const SECOES_DISPONIVEIS: {
  id: SectionType;
  titulo: string;
  descricao: string;
  badge: React.ReactNode;
  icone:  React.ReactNode;
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
          {["#FF6B9D", "#FFC857", "#6EC6FF", "#A8E6CF", "#B39DDB", "#FF8E53"].map(
            (cor, i) => (
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
            )
          )}
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
        <p className="text-center text-[8px] text-white/30 mt-0.5">Adivinhe a palavra ✨</p>
      </div>
    ),
  },
  {
    id: "time",
    titulo: "Tempo de casal animado",
    descricao: "Seu tempo de casal animado e fotos com efeitos animados. 100% personalizada para esse amor tão especial de vocês dois!",
    badge: <FaTimeline />,
    icone: <FaTimeline />,
    gradiente: "from-amber-900/60 to-orange-900/60",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    preview: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex gap-1 justify-center">
              Tempo Animado
        </div>
        <div className="flex gap-1 justify-center">
          {["_", "_", "_", "_", "_", "_"].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded bg-white/5 border border-white/10"
            />
          ))}
        </div>
        <p className="text-center text-[8px] text-white/30 mt-0.5">Adivinhe a palavra ✨</p>
      </div>
    ),
  },
];

export function FormRetrospectivaSecoes({ onContinuar, onPular }: Props) {
  const { data, toggleSection } = useRetrospective();
  const selecionadas = data.secoesSelecionadas;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <div className="flex gap-2">
          <FaGift />
          <h3 className="text-white font-bold text-base mb-1">
          Seções da Retrospectiva
        </h3>
        </div>
        <p className="text-white/40 text-xs leading-relaxed">
          Escolha os blocos que aparecerão na sua página. Personalize cada um
          depois.
        </p>
      </div>

      {/* Grid de cards */}
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
                {/* Badge tipo / ícone */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${secao.badgeColor}`}
                  >
                    {secao.badge} {secao.titulo}
                  </span>
                </div>

                {/* Preview visual */}
                <div
                  className={`w-full rounded-xl p-2.5 transition-colors ${
                    selecionada ? "bg-black/30" : "bg-black/20"
                  }`}
                >
                  {secao.preview}
                </div>

                {/* Descrição */}
                <p className="text-[10px] text-white/40 leading-tight">
                  {secao.descricao}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Contador */}
      <AnimatePresence>
        {selecionadas.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-white/30 text-xs"
          >
            {selecionadas.length} selecionada(s)
          </motion.p>
        )}
      </AnimatePresence>

      {/* Botões de ação */}
      <div className="flex flex-col gap-2 pt-1">
        <AnimatePresence>
          {selecionadas.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={onContinuar}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Personalizar seções →
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
    </div>
  );
}