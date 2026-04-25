import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Tipinhos flutuantes de fundo ──────────────────────────
function FloatingHearts() {
  const hearts = [
    {
      top: "10%",
      left: "5%",
      size: "w-4 h-4",
      delay: "0s",
      opacity: "opacity-20",
    },
    {
      top: "20%",
      left: "90%",
      size: "w-6 h-6",
      delay: "0.5s",
      opacity: "opacity-15",
    },
    {
      top: "60%",
      left: "8%",
      size: "w-3 h-3",
      delay: "1s",
      opacity: "opacity-25",
    },
    {
      top: "75%",
      left: "88%",
      size: "w-5 h-5",
      delay: "1.5s",
      opacity: "opacity-20",
    },
    {
      top: "40%",
      left: "95%",
      size: "w-3 h-3",
      delay: "0.8s",
      opacity: "opacity-15",
    },
    {
      top: "85%",
      left: "15%",
      size: "w-4 h-4",
      delay: "0.3s",
      opacity: "opacity-20",
    },
  ];

  return (
    <>
      {hearts.map((h, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="white"
          className={`absolute ${h.size} ${h.opacity} pointer-events-none`}
          style={{
            top: h.top,
            left: h.left,
            animation: `floatHeart 3s ease-in-out infinite`,
            animationDelay: h.delay,
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
        </svg>
      ))}
    </>
  );
}

// ── Mock de celular ───────────────────────────────────────
function MockPhone({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: isLeft ? -6 : 6 }}
      animate={{ opacity: 1, y: 0, rotate: isLeft ? -6 : 6 }}
      transition={{ duration: 0.7, delay: isLeft ? 0.2 : 0.4 }}
      className="relative flex-shrink-0"
      style={{ width: 160 }}
    >
      <div
        className="relative rounded-[24px] overflow-hidden"
        style={{
          width: 160,
          height: 300,
          background: "#0d0d1a",
          border: "4px solid #1a1a2e",
          boxShadow: "0 0 0 1px #2a2a4a, 0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[#1a1a2e] rounded-full z-10" />

        {isLeft ? (
          // Celular esquerdo — tela de música
          <div className="w-full h-full flex flex-col px-3 pt-7 pb-3 gap-2">
            <p className="text-white text-[10px] font-bold text-center">
              Nossa Trilha Sonora
            </p>
            <p className="text-white/40 text-[7px] text-center leading-relaxed">
              Cada momento ao seu lado tem uma música perfeita.
            </p>
            <div className="flex-1 bg-gradient-to-b from-pink-900/40 to-purple-900/40 rounded-xl flex items-center justify-center mt-1">
              <svg
                viewBox="0 0 24 24"
                fill="#ec4899"
                className="w-10 h-10 opacity-60"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div className="flex justify-between items-center px-1">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              <div className="flex-1 mx-2 h-0.5 bg-white/20 rounded-full">
                <div className="w-1/3 h-full bg-pink-500 rounded-full" />
              </div>
              <p className="text-white/30 text-[7px]">2:34</p>
            </div>
          </div>
        ) : (
          // Celular direito — wrapped do casal
          <div className="w-full h-full flex flex-col px-3 pt-7 pb-3">
            <p className="text-white/50 text-[7px] text-center font-semibold tracking-widest mb-2">
              WRAPPED DO CASAL
            </p>
            <div className="w-12 h-12 rounded-full bg-pink-500/20 border-2 border-pink-500/40 mx-auto mb-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="#ec4899" className="w-6 h-6">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
              </svg>
            </div>
            <p className="text-white text-[10px] font-bold text-center">
              Momento Especial
            </p>
            <p className="text-pink-400 text-[8px] text-center mb-3">
              Ana & Carlos
            </p>
            <div className="space-y-1.5">
              {[
                { label: "DIAS JUNTOS", value: "847" },
                { label: "HORAS JUNTOS", value: "20.328" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 rounded-lg px-2 py-1.5"
                >
                  <p className="text-white/30 text-[6px] font-semibold tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-white text-[14px] font-black leading-none">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Componente principal ──────────────────────────────────
interface Props {
  onAbrirDemo: () => void;
}

export function DemoBanner({ onAbrirDemo }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #be123c 0%, #9f1239 40%, #6d1b7b 100%)",
          minHeight: 260,
          borderRadius: "1.5rem",
        }}
      >
        {/* Corações flutuantes de fundo */}
        <FloatingHearts />

        {/* Padrão de pontos sutil */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Conteúdo */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-10 gap-6">
          {/* Celular esquerdo */}
          <div className="hidden md:block">
            <MockPhone side="left" />
          </div>

          {/* Texto central */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center flex-1 gap-5"
          >
            <h2 className="text-white/40 font-extrabold text-3xl md:text-4xl leading-tight">
              Teste Nossa
              <br />
              <span className="text-pink-100">Demo Interativa</span>
            </h2>

            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              Veja como sua página vai ficar antes mesmo de criar. Sem cadastro
              necessário.
            </p>

            {/* Botão */}
            <motion.button
              onClick={onAbrirDemo}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "white",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  animation: "shimmer 2s infinite",
                }}
              />
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4 relative z-10"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="relative z-10 cursor-pointer">Explorar a Demo</span>
            </motion.button>

            <p className="text-white/50 text-xs">Não é necessário cadastro.</p>
          </motion.div>

          {/* Celular direito */}
          <div className="hidden md:block">
            <MockPhone side="right" />
          </div>
        </div>
      </div>
    </>
  );
}
