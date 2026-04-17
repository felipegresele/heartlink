import { FiCalendar, FiMapPin } from "react-icons/fi";
import { FaStar, FaRocket } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function UltimaSessaoRetrospectiva({
  photos,
  nomeCasal,
  totalDias,
  dataDia,
  nomeMes,
  corBg,
  ondeSeConheceram,
  momentoFavorito,
  proximoPasso,
}: {
  photos: string[];
  nomeCasal: string;
  totalDias: number;
  dataDia: number;
  nomeMes: string;
  corBg: string;
  ondeSeConheceram?: string;
  momentoFavorito?: string;
  proximoPasso?: string;
}) {
  const temMemoria = ondeSeConheceram || momentoFavorito || proximoPasso;

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center text-white px-4 relative overflow-hidden"
      style={{ background: `linear-gradient(to bottom, ${corBg}, #000)` }}
    >
      {/* Glow de fundo */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${corBg}, transparent)` }}
      />

      <div className="w-full max-w-sm rounded-3xl p-5 backdrop-blur-2xl shadow-2xl border border-white/10 bg-white/5 relative z-10">
        {/* Badge topo */}
        <div className="flex justify-center mb-4">
          <span
            className="text-black text-xs px-4 py-1 rounded-full font-semibold"
            style={{ backgroundColor: corBg }}
          >
            RETROSPECTIVA DO CASAL
          </span>
        </div>

        {/* Foto */}
        <div className="flex justify-center mb-3">
          <motion.img
            src={photos[0]}
            className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Texto */}
        <div className="text-center mb-3">
          <h1 className="text-xl font-bold">Nossa História</h1>
          <p className="text-sm text-gray-300">{nomeCasal}</p>
        </div>

        {/* Frase */}
        <p className="text-xs text-gray-400 text-center italic mb-4">
          Cada momento juntos valeu a pena
        </p>

        {/* Separador */}
        <div className="flex items-center gap-2 my-4 opacity-40">
          <div className="flex-1 h-[1px] bg-white/20" />❤️
          <div className="flex-1 h-[1px] bg-white/20" />
        </div>

        {/* Data */}
        <div
          className="rounded-xl p-3 flex items-center gap-3 mb-4"
          style={{ backgroundColor: `${corBg}30` }}
        >
          <div className="p-2 rounded-full" style={{ backgroundColor: corBg }}>
            <FiCalendar size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-400">NOSSA DATA ESPECIAL</p>
            <h1 className="text-sm font-semibold">
              {dataDia} de {nomeMes}
            </h1>
          </div>
        </div>

        {/* Dias */}
        <div className="mb-4">
          <p className="text-xs text-gray-400">TOTAL DE DIAS JUNTOS</p>
          <h1 className="text-4xl font-bold">{totalDias}</h1>
        </div>

        {/* Barra de progresso */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1">JORNADA DO AMOR</p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "70%", background: corBg }}
            />
          </div>
        </div>

        {/* ── Memórias opcionais ── */}
        <AnimatePresence>
          {temMemoria && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Separador */}
              <div className="flex items-center gap-2 my-4 opacity-30">
                <div className="flex-1 h-[1px] bg-white/20" />✨
                <div className="flex-1 h-[1px] bg-white/20" />
              </div>

              <p className="text-white/40 text-[10px] uppercase tracking-widest text-center mb-3">
                Momentos que nos definem
              </p>

              <div className="flex flex-col gap-3">
                {ondeSeConheceram && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl p-3 flex items-start gap-3"
                    style={{ backgroundColor: `${corBg}20`, border: `1px solid ${corBg}30` }}
                  >
                    <div
                      className="p-1.5 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: `${corBg}50` }}
                    >
                      <FiMapPin size={13} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">
                        Onde nos conhecemos
                      </p>
                      <p className="text-white text-sm font-medium leading-snug">
                        {ondeSeConheceram}
                      </p>
                    </div>
                  </motion.div>
                )}

                {momentoFavorito && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl p-3 flex items-start gap-3"
                    style={{ backgroundColor: `${corBg}20`, border: `1px solid ${corBg}30` }}
                  >
                    <div
                      className="p-1.5 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: `${corBg}50` }}
                    >
                      <FaStar size={13} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">
                        Momento favorito
                      </p>
                      <p className="text-white text-sm font-medium leading-snug">
                        {momentoFavorito}
                      </p>
                    </div>
                  </motion.div>
                )}

                {proximoPasso && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-xl p-3 flex items-start gap-3"
                    style={{ backgroundColor: `${corBg}20`, border: `1px solid ${corBg}30` }}
                  >
                    <div
                      className="p-1.5 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: `${corBg}50` }}
                    >
                      <FaRocket size={13} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">
                        Próximo passo
                      </p>
                      <p className="text-white text-sm font-medium leading-snug">
                        {proximoPasso}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}