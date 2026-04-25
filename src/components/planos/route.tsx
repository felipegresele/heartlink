import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export function Planos() {

    return (
        <div className="flex flex-col bg-[#FAFAFA] text-center">
            <h1 className="font-semibold text-xl text-black">Nossos Planos</h1>
            <h1 className="text-4xl font-extrabold mt-3 text-[#e687cd]">Escolha o plano ideal</h1>
            <p className="text-gray-500 mt-5">Escolha o plano ideal para você criar sua página personalizada. Você pode escolher entre os planos abaixo.</p>
            <PlanoPageContent />
        </div>
    )

}

function PlanoPageContent() {

   const planos = [
    {
      titulo: "Para sempre",
      descricao: "Esse plano é vitalício, não precisa renovar.",
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
        { text: "Fundo dinâmico", ativo: true },
        { text: "Com animações exclusivas", ativo: true, destaque: true },
        { text: "URL personalizada", ativo: true },
        { text: "Suporte 24 horas", ativo: true, destaque: true },
      ],
    },
    {
      titulo: "Padrão",
      descricao: "Esse plano possui acesso por 24 horas.",
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
        { text: "Suporte 24 horas", ativo: true, destaque: true },
      ],
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex justify-center items-center px-6 py-16">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {planos.map((plano, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl border ${
              plano.recomendado ? "border-red-500" : "border-gray-700"
            } flex flex-col gap-6 bg-gradient-to-b from-black via-gray-800 to-black`}
          >
            {plano.recomendado && (
              <span className="bg-pink-400 text-white px-3 py-1 rounded-full text-sm w-max">
                ⭐ Recomendado
              </span>
            )}
            <h2 className="text-2xl font-bold text-pink-500">{plano.titulo}</h2>
            <p className="text-gray-400">{plano.descricao}</p>

            <ul className="flex flex-col gap-2">
              {plano.recursos.map((recurso, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${
                    recurso.destaque ? "font-bold" : ""
                  } ${recurso.ativo ? "text-white" : "text-gray-600 line-through"}`}
                >
                  {recurso.ativo ? <FaCheck color="green"/> : <FaTimes color="red" />}
                  {recurso.text}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <span className="text-gray-500 line-through">{plano.precoAntigo}</span>
              <h3 className="text-3xl font-bold text-white">
                {plano.precoAtual} <span className="text-gray-400 text-base">/{plano.periodo}</span>
              </h3>
            </div>

            <button className="mt-auto bg-[#e687cd] hover:bg-pink-500 text-white py-3 rounded-lg font-bold cursor-pointer">
              Criar minha página
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}