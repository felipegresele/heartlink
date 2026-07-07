import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa6";
import { IoImage } from "react-icons/io5";

function FloatingHearts() {
  const hearts = [
    { top: "10%", left: "5%", size: "w-4 h-4", delay: "0s", opacity: "opacity-20" },
    { top: "20%", left: "90%", size: "w-6 h-6", delay: "0.5s", opacity: "opacity-15" },
    { top: "60%", left: "8%", size: "w-3 h-3", delay: "1s", opacity: "opacity-25" },
    { top: "75%", left: "88%", size: "w-5 h-5", delay: "1.5s", opacity: "opacity-20" },
    { top: "40%", left: "95%", size: "w-3 h-3", delay: "0.8s", opacity: "opacity-15" },
    { top: "85%", left: "15%", size: "w-4 h-4", delay: "0.3s", opacity: "opacity-20" },
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

interface Props {
  linkPadrao?: string;
  linkSpotify?: string;
}

export function DemoBanner({
  linkPadrao = "https://www.heartcodegift.com.br/p/37ca69",
  linkSpotify = "https://www.heartcodegift.com.br/p/b90832",
}: Props) {
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
        className="relative w-200 overflow-hidden mb-2"
        style={{
          background:
            "linear-gradient(135deg, #be123c 0%, #9f1239 40%, #6d1b7b 100%)",
          minHeight: 260,
          borderRadius: "1.5rem",
        }}
      >
        <FloatingHearts />

        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-10 gap-6">
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

            {/* Dois botões separados, cada um com seu link */}
            <div className="flex gap-3">
              <motion.a
                href={linkPadrao}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    animation: "shimmer 2s infinite",
                  }}
                />
                <IoImage size={16} className="relative z-10" />
                <span className="relative z-10">Padrão</span>
              </motion.a>

              <motion.a
                href={linkSpotify}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold cursor-pointer"
                style={{
                  background: "rgba(29,185,84,0.2)",
                  border: "1.5px solid rgba(29,185,84,0.45)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    animation: "shimmer 2s infinite",
                  }}
                />
                <FaSpotify size={16} className="relative z-10" />
                <span className="relative z-10">Spotify</span>
              </motion.a>
            </div>

            <p className="text-white/50 text-xs">Não é necessário cadastro.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}