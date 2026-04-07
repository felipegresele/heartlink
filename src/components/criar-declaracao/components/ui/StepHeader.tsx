import type { IconType } from "react-icons/lib";

interface StepHeaderProps {
  icon: IconType;
  titulo: string;
  descricao: string;
  etapa: number;
  totalEtapas: number;
}

export default function StepHeader({
  icon: Icon,
  titulo,
  descricao,
  etapa,
  totalEtapas,
}: StepHeaderProps) {
  const progresso = (etapa / totalEtapas) * 100;

  return (
    <div className="mb-6">

      {/* BARRA PROGRESSO */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-red-500 h-full transition-all duration-500"
          style={{ width: `${progresso}%` }}
        />
      </div>

      {/* TEXTO PROGRESSO */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">
          Etapa {etapa}/{totalEtapas}
        </span>
      </div>

      {/* HEADER ETAPA */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gray-800 p-3 rounded-lg">
          <Icon className="text-xl text-white" />
        </div>

        <h1 className="text-3xl font-bold">
          {titulo}
        </h1>
      </div>

      <p className="text-gray-400 text-sm max-w-xl">
        {descricao}
      </p>
    </div>
  );
}