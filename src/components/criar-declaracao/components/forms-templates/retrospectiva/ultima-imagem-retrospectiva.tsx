import { FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

export function UltimaSessaoRetrospectiva({
  photos,
  nomeCasal,
  totalDias,
  dataDia,
  nomeMes,
  corBg,
}: {
  photos: string[];
  nomeCasal: string;
  totalDias: number;
  dataDia: number;
  nomeMes: string;
  corBg: string;
}) {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center text-white px-4 relative overflow-hidden"
      style={{ background: `linear-gradient(to bottom, ${corBg}, #000)` }}
    >
      {/* Glow de fundo */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${corBg}, transparent)`,
        }}
      />

      <div
        className="w-full max-w-sm rounded-3xl p-5 backdrop-blur-2xl shadow-2xl border border-white/10 bg-white/5 relative z-10"
      >
        {/* Badge topo */}
        <div className="flex justify-center mb-4">
          <span
            className="text-black text-xs px-4 py-1 rounded-full font-semibold"
            style={{ backgroundColor: corBg }}
          >
            RETROSPECTIVA DO CASAL
          </span>
        </div>

        {/* Foto com animação */}
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

        {/* Frase emocional */}
        <p className="text-xs text-gray-400 text-center italic mb-4">
          Cada momento juntos valeu a pena
        </p>

        {/* Separador */}
        <div className="flex items-center gap-2 my-4 opacity-40">
          <div className="flex-1 h-[1px] bg-white/20" />
          ❤️
          <div className="flex-1 h-[1px] bg-white/20" />
        </div>

        {/* Data */}
        <div
          className="rounded-xl p-3 flex items-center gap-3 mb-4"
          style={{ backgroundColor: `${corBg}30` }}
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: corBg }}
          >
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

        {/* Barra de progresso fake */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1">JORNADA DO AMOR</p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "70%",
                background: corBg,
              }}
            />
          </div>
        </div>

        {/* Badge nível */}
        <div className="flex justify-center">
          <span className="text-xs px-3 py-1 rounded-full bg-white/10">
            💎 Amor verdadeiro
          </span>
        </div>
      </div>
    </div>
  );
}
