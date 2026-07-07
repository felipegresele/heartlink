"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaHeart } from "react-icons/fa";
import { IoStar, IoClose } from "react-icons/io5";

/**
 * ------------------------------------------------------------------
 * Star Memory Preview
 * ------------------------------------------------------------------
 * Pequeno céu noturno interativo. Cada memória adicionada pelo usuário
 * vira uma estrela — algumas ainda bloqueadas, outras já reveladas.
 * ------------------------------------------------------------------
 */

export interface StarMemory {
  id: string;
  message: string;
  unlocked: boolean;
  /** opcionais — usados no modal quando disponíveis */
  title?: string;
  date?: string;
}

interface StarMemoryPreviewProps {
  stars: StarMemory[];
}

type Point = { x: number; y: number };

// Layouts "desenhados à mão" para cada quantidade de estrelas.
const LAYOUTS: Record<number, Point[]> = {
  1: [{ x: 50, y: 50 }],
  2: [
    { x: 32, y: 38 },
    { x: 68, y: 62 },
  ],
  3: [
    { x: 50, y: 26 },
    { x: 26, y: 70 },
    { x: 74, y: 70 },
  ],
  4: [
    { x: 50, y: 20 },
    { x: 78, y: 40 },
    { x: 64, y: 78 },
    { x: 24, y: 56 },
  ],
};

// pseudo-aleatório determinístico, evita "pulos" visuais entre renders
function seeded(n: number) {
  const x = Math.sin(n * 999.123) * 10000;
  return x - Math.floor(x);
}

/* ------------------------------------------------------------------ */
/* Camadas de fundo                                                    */
/* ------------------------------------------------------------------ */

function TwinklingStars() {
  const dots = useMemo(
    () =>
      Array.from({ length: 55 }).map((_, i) => ({
        id: i,
        top: seeded(i * 1.7) * 100,
        left: seeded(i * 3.1 + 5) * 100,
        size: seeded(i * 5.3) > 0.85 ? 2 : 1,
        duration: 2 + seeded(i * 7.1) * 4,
        delay: seeded(i * 2.9) * 6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        top: seeded(i * 4.2 + 11) * 100,
        left: seeded(i * 6.6 + 3) * 100,
        duration: 22 + seeded(i * 9.4) * 18,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute w-[3px] h-[3px] rounded-full bg-[#e687cd]/30 blur-[1px]"
          style={{ top: `${p.top}%`, left: `${p.left}%` }}
          animate={{ y: [0, -14, 0], x: [0, 8, 0], opacity: [0.08, 0.3, 0.08] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Meteor({ onDone }: { onDone: () => void }) {
  const path = useMemo(() => {
    const fromRight = Math.random() > 0.5;
    const startLeft = fromRight ? 55 + Math.random() * 30 : 5 + Math.random() * 25;
    const startTop = -6;
    const endLeft = fromRight ? startLeft - (40 + Math.random() * 15) : startLeft + (40 + Math.random() * 15);
    const endTop = 106;
    const dx = endLeft - startLeft;
    const dy = endTop - startTop;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { startLeft, startTop, endLeft, endTop, angle, duration: 1 + Math.random() * 0.6 };
  }, []);

  return (
    <motion.div
      className="absolute"
      initial={{ left: `${path.startLeft}%`, top: `${path.startTop}%`, opacity: 0 }}
      animate={{ left: `${path.endLeft}%`, top: `${path.endTop}%`, opacity: [0, 1, 1, 0] }}
      transition={{ duration: path.duration, ease: "easeIn" }}
      onAnimationComplete={onDone}
      style={{ rotate: path.angle }}
    >
      <div className="relative w-20 h-[2px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-white rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />
      </div>
    </motion.div>
  );
}

function MeteorField() {
  const [meteors, setMeteors] = useState<number[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 8000 + Math.random() * 7000;
      timeout = setTimeout(() => {
        idRef.current += 1;
        setMeteors((m) => [...m, idRef.current]);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {meteors.map((id) => (
          <Meteor key={id} onDone={() => setMeteors((m) => m.filter((x) => x !== id))} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Linhas de constelação — conectam as memórias reveladas               */
/* ------------------------------------------------------------------ */

function ConstellationLines({ points }: { points: Point[] }) {
  if (points.length < 2) return null;

  const lines = points.slice(1).map((p, i) => ({ a: points[i], b: p }));
  if (points.length >= 3) lines.push({ a: points[points.length - 1], b: points[0] });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {lines.map((line, i) => {
        const dx = line.b.x - line.a.x;
        const dy = line.b.y - line.a.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-white/0 via-white/25 to-white/0 origin-left"
            style={{ top: `${line.a.y}%`, left: `${line.a.x}%`, width: `${length}%`, rotate: angle }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 + i * 0.2, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Estrela de memória                                                   */
/* ------------------------------------------------------------------ */

function MemoryStar({
  star,
  x,
  y,
  index,
  onOpen,
}: {
  star: StarMemory;
  x: number;
  y: number;
  index: number;
  onOpen: (s: StarMemory) => void;
}) {
  const locked = !star.unlocked;
  const [shake, setShake] = useState(false);

  function handleClick() {
    if (locked) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onOpen(star);
  }

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${y}%`, left: `${x}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, x: shake ? [0, -4, 4, -4, 0] : 0 }}
      transition={{ delay: 0.2 + index * 0.15, type: "spring", stiffness: 180, damping: 14 }}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={locked ? {} : { scale: 1.28, y: -4 }}
        whileTap={locked ? {} : { scale: 0.95 }}
        className="relative flex items-center justify-center outline-none"
        aria-label={locked ? "Estrela ainda bloqueada" : star.title || "Ver memória"}
      >
        {/* halo */}
        <motion.span
          className={`absolute rounded-full blur-xl ${locked ? "bg-white/5" : "bg-[#e687cd]/40"}`}
          style={{ width: 46, height: 46 }}
          animate={locked ? {} : { scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* núcleo */}
        <motion.span
          className={`relative rounded-full ${
            locked ? "bg-white/20" : "bg-gradient-to-br from-white via-[#ffe9f7] to-[#e687cd]"
          }`}
          style={{
            width: locked ? 10 : 16,
            height: locked ? 10 : 16,
            boxShadow: locked ? "none" : "0 0 14px 4px rgba(230,135,205,0.65), 0 0 30px 10px rgba(230,135,205,0.25)",
          }}
          animate={locked ? {} : { scale: [1, 1.12, 1] }}
          transition={{ duration: 2.6 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
        {locked && <FaLock className="absolute text-white/40" size={9} />}
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                                 */
/* ------------------------------------------------------------------ */

function MemoryModal({ star, onClose }: { star: StarMemory | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {star && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <IoClose size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <IoStar className="text-[#e687cd]" size={20} />
              <h4 className="text-white font-semibold text-base leading-tight pr-6">
                {star.title || "Uma memória especial"}
              </h4>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 mb-4" />

            <div className="flex gap-2">
              <FaHeart className="text-[#e687cd] mt-0.5 shrink-0" size={13} />
              <p className="text-white/80 text-sm leading-relaxed">{star.message}</p>
            </div>

            {star.date && <p className="text-white/35 text-xs mt-4">{star.date}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Estado vazio                                                         */
/* ------------------------------------------------------------------ */

function EmptySky() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.span
        className="relative flex items-center justify-center"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute w-10 h-10 rounded-full bg-white/5 blur-lg" />
        <span className="relative w-2.5 h-2.5 rounded-full bg-white/25" />
      </motion.span>
      <p className="text-white/40 text-xs mt-4 text-center px-6">Sua primeira estrela aparecerá aqui.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                 */
/* ------------------------------------------------------------------ */

export default function StarMemoryPreview({ stars }: StarMemoryPreviewProps) {
  const [selected, setSelected] = useState<StarMemory | null>(null);
  const visible = stars.slice(0, 4);
  const layout = LAYOUTS[visible.length] || [];

  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      style={{ background: "radial-gradient(120% 100% at 50% 0%, #131b3a 0%, #0b1026 55%, #05070f 100%)" }}
    >
      <TwinklingStars />
      <FloatingParticles />
      <MeteorField />

      {visible.length > 0 ? (
        <>
          <ConstellationLines points={layout} />
          {visible.map((star, i) => (
            <MemoryStar key={star.id} star={star} x={layout[i].x} y={layout[i].y} index={i} onOpen={setSelected} />
          ))}
        </>
      ) : (
        <EmptySky />
      )}

      <MemoryModal star={selected} onClose={() => setSelected(null)} />
    </div>
  );
}