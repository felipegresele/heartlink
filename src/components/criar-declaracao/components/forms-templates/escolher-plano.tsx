import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface EscolherPlanoProps {
  selectedPlan: string | null;
  setSelectedPlan: (plan: string) => void;
}

export function EscolherPlano({ selectedPlan, setSelectedPlan }: EscolherPlanoProps) {
  const planos = [
    {
      titulo: "Para sempre",
      descricao: "Plano vitalício, sem necessidade de renovação.",
      planType: "VITALICIO",
      recomendado: true,
      precoAntigo: "R$ 50,00",
      precoAtual: "R$ 25,00",
      periodo: "uma vez",
      recursos: [
        { text: "Texto dedicado", ativo: true },
        { text: "Contador em tempo real", ativo: true, destaque: true },
        { text: "Data de início", ativo: true },
        { text: "QR Code exclusivo", ativo: true, destaque: true },
        { text: "Máximo de 15 imagens", ativo: true },
        { text: "Com música", ativo: true, destaque: true },
        { text: "Sem retrospectiva", ativo: true },
        { text: "Permite edição após feito", ativo: true, destaque: true },
        { text: "URL personalizada", ativo: true },
        { text: "Suporte 24h", ativo: true, destaque: true },
      ],
    },
    {
      titulo: "Padrão",
      descricao: "Esse plano possui acesso por 24 horas",
      planType: "PADRAO",
      recomendado: false,
      precoAntigo: "R$ 40,00",
      precoAtual: "R$ 20,00",
      periodo: "uma vez",
      recursos: [
        { text: "Texto dedicado", ativo: true },
        { text: "Contador em tempo real", ativo: true, destaque: true },
        { text: "Data de início", ativo: true },
        { text: "QR Code exclusivo", ativo: true, destaque: true },
        { text: "Máximo de 3 imagens", ativo: true },
        { text: "Sem música", ativo: false, destaque: true },
        { text: "Sem retrospectiva", ativo: false },
        { text: "Permite edição após feito", ativo: false, destaque: true },
        { text: "URL personalizada", ativo: true },
        { text: "Suporte 24h", ativo: true, destaque: true },
      ],
    },
  ];

  return (
    <div className="bg-[#FAFAFA] flex flex-col items-center p-4 gap-4">
      <h2 className="text-xl md:text-2xl font-bold text-black text-center mb-1">
        Escolha seu plano
      </h2>
      <p className="text-gray-500 text-center text-md mb-2">
        Escolha o que melhor se encaixa para você.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {planos.map((plano, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedPlan(plano.planType)}
            className={`p-4 rounded-xl border-2 flex flex-col gap-3 cursor-pointer transition-all bg-white shadow-sm
              ${
                selectedPlan === plano.planType
                  ? "ring-2 ring-[#e687cd] border-[#e687cd]"
                  : plano.recomendado
                  ? "border-[#e687cd]"
                  : "border-gray-200"
              }`}
          >
            {plano.recomendado && (
              <span className="bg-[#e687cd] text-white px-2 py-0.5 rounded-full text-xs w-max">
                ⭐ Recomendado
              </span>
            )}

            <h3 className="text-lg md:text-xl font-bold text-[#e687cd]">{plano.titulo}</h3>
            <p className="text-gray-400 text-sm">{plano.descricao}</p>

            <ul className="flex flex-col gap-1 mt-1 text-xs">
              {plano.recursos.map((recurso, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-1 ${
                    recurso.destaque ? "font-semibold" : ""
                  } ${recurso.ativo ? "text-gray-800" : "text-gray-300 line-through"}`}
                >
                  {recurso.ativo ? <FaCheck className="text-green-500 shrink-0" /> : <FaTimes className="text-red-400 shrink-0" />}
                  {recurso.text}
                </li>
              ))}
            </ul>

            <div className="mt-2 text-sm">
              <span className="text-gray-400 line-through">{plano.precoAntigo}</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {plano.precoAtual}{" "}
                <span className="text-gray-400 text-xs md:text-sm">/{plano.periodo}</span>
              </h3>
            </div>

            <button
              onClick={() => setSelectedPlan(plano.planType)}
              className="mt-2 bg-[#e687cd] hover:bg-pink-400 text-white py-1.5 rounded-lg font-semibold text-sm cursor-pointer transition-colors"
            >
              Quero esse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}