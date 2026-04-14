// ============================================================
// SEÇÃO — WheelSection
// Roleta animada com até 10 opções
// Corações caem ao sortear + modal com resultado
// ============================================================
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaRedo, FaRandom, FaTimes } from "react-icons/fa";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";

// ── Coração caindo ─────────────────────────────────────────────
interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

function FallingHearts({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    if (!active) { setHearts([]); return; }

    const emojis = ["❤️", "💕", "💖", "💗", "💝", "🩷"];
    const particles: HeartParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 1.8 + Math.random() * 1.5,
      delay: Math.random() * 0.8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(particles);

    const timer = setTimeout(() => setHearts([]), 4000);
    return () => clearTimeout(timer);
  }, [active]);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ y: -60, x: `${h.x}vw`, opacity: 1, scale: 0.5 }}
          animate={{ y: "110vh", opacity: [1, 1, 0], scale: [0.5, 1.2, 0.8] }}
          transition={{ duration: h.duration, delay: h.delay, ease: "easeIn" }}
          style={{ position: "absolute", top: 0, left: 0, fontSize: h.size }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

// ── Modal de resultado ─────────────────────────────────────────
function ResultModal({
  vencedor,
  onClose,
}: {
  vencedor: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative bg-gradient-to-br from-rose-900/90 to-purple-900/90 border border-pink-500/40 rounded-3xl p-8 mx-4 max-w-xs w-full text-center shadow-2xl shadow-pink-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
          >
            <FaTimes size={14} />
          </button>

          <div className="text-5xl mb-3">🎉</div>
          <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-widest">
            Sorteado!
          </p>
          <p className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            {vencedor}
          </p>
          <p className="text-white/40 text-xs mt-3">Toque fora para fechar</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Componente principal ───────────────────────────────────────
export function WheelSection() {
  const { data, addWheelItem, updateWheelItem, removeWheelItem } =
    useRetrospective();

  const [novoItem, setNovoItem] = useState("");
  const [erro, setErro] = useState("");
  const [girando, setGirando] = useState(false);
  const [anguloAtual, setAnguloAtual] = useState(0);
  const [vencedor, setVencedor] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCoracoes, setMostrarCoracoes] = useState(false);

  const cheio = data.wheel.length >= LIMITS.wheel;
  const items = data.wheel;

  function handleAdd() {
    if (!novoItem.trim()) { setErro("Digite uma opção."); return; }
    const ok = addWheelItem(novoItem.trim());
    if (!ok) { setErro("Limite de 10 opções atingido."); return; }
    setNovoItem("");
    setErro("");
    setVencedor(null);
  }

  function girarRoleta() {
    if (items.length < 2 || girando) return;
    setGirando(true);
    setVencedor(null);
    setMostrarModal(false);

    const voltas = 5 + Math.random() * 3;
    const anguloExtra = Math.random() * 360;
    const totalAngulo = voltas * 360 + anguloExtra;
    const novoAngulo = anguloAtual + totalAngulo;

    setAnguloAtual(novoAngulo);

    setTimeout(() => {
      const anguloFinal = novoAngulo % 360;
      const fatia = 360 / items.length;
      const indice = Math.floor(((360 - anguloFinal) % 360) / fatia) % items.length;
      const resultado = items[indice].texto;

      setVencedor(resultado);
      setGirando(false);

      // Disparar corações e modal
      setMostrarCoracoes(true);
      setTimeout(() => {
        setMostrarModal(true);
        setMostrarCoracoes(false);
      }, 600);
    }, 3600);
  }

  function renderWheel() {
    if (items.length === 0) return null;
    const cx = 150, cy = 150, r = 140;
    const fatia = (2 * Math.PI) / items.length;

    return items.map((item, i) => {
      const startAngle = i * fatia - Math.PI / 2;
      const endAngle = startAngle + fatia;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = fatia > Math.PI ? 1 : 0;

      const midAngle = startAngle + fatia / 2;
      const tx = cx + (r * 0.65) * Math.cos(midAngle);
      const ty = cy + (r * 0.65) * Math.sin(midAngle);

      const d = `M${cx},${cy} L${x1},${y1} A${r},${r},0,${largeArc},1,${x2},${y2} Z`;

      return (
        <g key={item.id}>
          <path d={d} fill={item.cor} stroke="#1a1a2e" strokeWidth="2" />
          <text
            x={tx}
            y={ty}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={items.length > 6 ? "9" : "11"}
            fontWeight="bold"
            transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${tx}, ${ty})`}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {item.texto.length > 10 ? item.texto.slice(0, 10) + "…" : item.texto}
          </text>
        </g>
      );
    });
  }

  return (
    <>
      {/* Corações caindo */}
      <FallingHearts active={mostrarCoracoes} />

      {/* Modal de resultado */}
      {mostrarModal && vencedor && (
        <ResultModal vencedor={vencedor} onClose={() => setMostrarModal(false)} />
      )}

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3">
          <span className="text-2xl"><FaRandom /></span>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">Roleta</h3>
            <p className="text-white/40 text-xs">Sorteie a próxima aventura de vocês</p>
          </div>
          <div className="ml-auto">
            <LimiteBadge atual={items.length} maximo={LIMITS.wheel} />
          </div>
        </div>

        {/* Formulário */}
        {!cheio && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: Jantar romântico, Cinema…"
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-pink-400"
            />
            <button
              onClick={handleAdd}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <FaPlus size={14} />
            </button>
          </div>
        )}
        {erro && <p className="text-red-400 text-xs">{erro}</p>}

        {/* Roleta SVG */}
        {items.length >= 2 && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Seta */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[22px] border-l-transparent border-r-transparent border-b-white drop-shadow-lg" />
              </div>

              <motion.svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                animate={{ rotate: anguloAtual }}
                transition={{ duration: 3.5, ease: [0.15, 0.9, 0.3, 1] }}
              >
                {renderWheel()}
                <circle cx="150" cy="150" r="18" fill="#1a1a2e" stroke="white" strokeWidth="3" />
                <circle cx="150" cy="150" r="8" fill="white" />
              </motion.svg>
            </div>

            <button
              onClick={girarRoleta}
              disabled={girando}
              className={`flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-all ${
                girando
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-red-500/30"
              }`}
            >
              <motion.span
                animate={girando ? { rotate: 360 } : { rotate: 0 }}
                transition={girando ? { repeat: Infinity, duration: 0.8, ease: "linear" } : {}}
              >
                <FaRedo size={14} />
              </motion.span>
              {girando ? "Girando…" : "Girar a Roleta"}
            </button>
          </div>
        )}

        {items.length < 2 && items.length > 0 && (
          <p className="text-white/30 text-xs text-center">Adicione pelo menos 2 opções para girar</p>
        )}

        {/* Lista */}
        <div className="space-y-2">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-3"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.cor }}
                />
                <input
                  type="text"
                  value={item.texto}
                  onChange={(e) => updateWheelItem(item.id, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm outline-none focus:border-pink-400"
                />
                <button
                  onClick={() => removeWheelItem(item.id)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                >
                  <FaTrash size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
