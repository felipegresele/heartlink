import { FiCalendar } from "react-icons/fi";

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
      className="w-full min-h-screen flex items-center justify-center text-white px-4"
      style={{ background: `linear-gradient(to bottom, ${corBg}, #000)` }}
    >
      <div
        className="w-full max-w-sm rounded-3xl p-5 backdrop-blur-xl shadow-2xl border border-white/10"
        style={{ backgroundColor: `${corBg}20` }} // transparência
      >
        {/* Título */}
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
          <img
            src={photos[0]}
            className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
          />
        </div>

        {/* Texto */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold">Nossa História</h1>
          <p className="text-sm text-gray-300">{nomeCasal}</p>
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
      </div>
    </div>
  );
}