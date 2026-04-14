// ============================================================
// COMPONENTE — RetrospectivePage
// Página final que o destinatário visualiza
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaLock, FaLockOpen, FaRedo } from "react-icons/fa";
import { WHEEL_COLORS, type RetrospectiveData, type SectionType } from "../../../../../schema/retrospectiva";

// ── Props ─────────────────────────────────────────────────────
interface RetrospectivePageProps {
  data: RetrospectiveData;
}

// ── Label das seções ──────────────────────────────────────────
const SECTION_LABELS: Record<SectionType, string> = {
  timeline: "Nossa Linha do Tempo",
  wheel: "Roleta de Aventuras",
  gallery: "Nossa Galeria",
  enigma: "O que eu amo em você",
};

const CARD_EMOJIS = ["💕", "🌹", "✨", "💫", "🌸", "💎"];

// ── Componente principal ──────────────────────────────────────
export function RetrospectivePage({ data }: RetrospectivePageProps) {
  if (data.secoesSelecionadas.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-white/30 text-sm">
        Nenhuma seção configurada para a retrospectiva.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex flex-col items-center justify-center py-16 px-6 text-center overflow-hidden"
      >
        {/* Fundo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950/40 via-gray-950 to-gray-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="relative z-10 text-5xl mb-4"
        >
          💝
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 text-3xl font-extrabold bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-transparent"
        >
          Nossa Retrospectiva
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 text-white/40 text-sm mt-2"
        >
          Uma página feita com amor para celebrar a nossa história
        </motion.p>
      </motion.div>

      {/* Seções */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-12">
        {data.secoesSelecionadas.map((section, idx) => (
          <motion.section
            key={section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.15 }}
          >
            {/* Label da seção */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
                {SECTION_LABELS[section]}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {section === "timeline" && <TimelineView items={data.timeline} />}
            {section === "wheel" && <WheelView items={data.wheel} />}
            {section === "gallery" && <GalleryView items={data.gallery} />}
            {section === "enigma" && <EnigmaView items={data.enigma} />}
          </motion.section>
        ))}
      </div>

      {/* Rodapé */}
      <div className="text-center pb-8 text-white/20 text-xs flex items-center justify-center gap-1">
        Feito com <FaHeart className="text-pink-500" size={10} /> no HeartCode
      </div>
    </div>
  );
}

// ── Sub-views ─────────────────────────────────────────────────

function TimelineView({ items }: { items: RetrospectiveData["timeline"] }) {
  if (!items.length) return null;
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-transparent" />
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative pl-14 mb-8"
        >
          <div className="absolute left-3 top-3 w-4 h-4 rounded-full bg-pink-500 border-2 border-gray-950 shadow-lg shadow-pink-500/50" />
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/3">
            {item.imagem && (
              <img
                src={item.imagem}
                alt={item.titulo}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-white font-bold">{item.titulo}</h3>
              {item.descricao && (
                <p className="text-white/50 text-sm mt-1">{item.descricao}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WheelView({ items }: { items: RetrospectiveData["wheel"] }) {
  const [anguloAtual, setAnguloAtual] = useState(0);
  const [girando, setGirando] = useState(false);
  const [vencedor, setVencedor] = useState<string | null>(null);

  if (!items.length) return null;

  function girar() {
    if (items.length < 2 || girando) return;
    setGirando(true);
    setVencedor(null);
    const totalAngulo = anguloAtual + 5 * 360 + Math.random() * 360;
    setAnguloAtual(totalAngulo);
    setTimeout(() => {
      const final = totalAngulo % 360;
      const fatia = 360 / items.length;
      const idx = Math.floor(((360 - final) % 360) / fatia) % items.length;
      setVencedor(items[idx].texto);
      setGirando(false);
    }, 3600);
  }

  const cx = 150, cy = 150, r = 140;
  const fatia = (2 * Math.PI) / items.length;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
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
          {items.map((item, i) => {
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
                <path d={d} fill={WHEEL_COLORS[i % WHEEL_COLORS.length]} stroke="#030712" strokeWidth="2" />
                <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fill="white"
                  fontSize={items.length > 6 ? "9" : "11"} fontWeight="bold"
                  transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${tx}, ${ty})`}
                  style={{ pointerEvents: "none", userSelect: "none" }}>
                  {item.texto.length > 10 ? item.texto.slice(0, 10) + "…" : item.texto}
                </text>
              </g>
            );
          })}
          <circle cx="150" cy="150" r="18" fill="#030712" stroke="white" strokeWidth="3" />
          <circle cx="150" cy="150" r="8" fill="white" />
        </motion.svg>
      </div>

      <button
        onClick={girar}
        disabled={girando || items.length < 2}
        className={`flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-all ${
          girando ? "bg-white/10 text-white/40 cursor-not-allowed"
          : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-pink-500/30"
        }`}
      >
        <motion.span animate={girando ? { rotate: 360 } : { rotate: 0 }}
          transition={girando ? { repeat: Infinity, duration: 0.8, ease: "linear" } : {}}>
          <FaRedo size={14} />
        </motion.span>
        {girando ? "Girando…" : "Girar a Roleta"}
      </button>

      <AnimatePresence>
        {vencedor && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="text-center">
            <p className="text-white/50 text-xs mb-1">Sorteado!</p>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {vencedor} 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryView({ items }: { items: RetrospectiveData["gallery"] }) {
  const [modal, setModal] = useState<string | null>(null);
  if (!items.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.07 }}
            className="relative group rounded-xl overflow-hidden cursor-zoom-in border border-white/10"
            onClick={() => setModal(item.imagem)}
          >
            <img src={item.imagem} alt={item.descricao} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
            {item.descricao && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs">{item.descricao}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setModal(null)}>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={modal} alt="Ampliado"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EnigmaView({ items }: { items: RetrospectiveData["enigma"] }) {
  const [revelados, setRevelados] = useState<Set<string>>(new Set());

  if (!items.length) return null;

  function toggle(id: string) {
    setRevelados((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, idx) => {
        const revelado = revelados.has(item.id);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggle(item.id)}
            className="cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {!revelado ? (
                <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-pink-500/30 bg-gradient-to-br from-pink-900/40 to-purple-900/40">
                  <FaLock className="text-pink-400" size={20} />
                  <p className="text-pink-300 text-xs font-bold">Toque para revelar</p>
                </motion.div>
              ) : (
                <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/20 bg-white/5 p-3 text-center">
                  <span className="text-xl">{CARD_EMOJIS[idx % CARD_EMOJIS.length]}</span>
                  <p className="text-white text-xs font-semibold leading-tight">{item.texto}</p>
                  <FaLockOpen className="text-white/20" size={10} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}