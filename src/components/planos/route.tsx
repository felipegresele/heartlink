import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import AuthModal from "../auth/AuthModal";

export function Planos() {
    return (
        <div className="flex flex-col bg-black text-white text-center">
            <h1 className="font-semibold text-xl text-white">Nossos Planos</h1>
            <h1 className="text-4xl font-extrabold mt-3">Escolha o plano ideal</h1>
            <p className="text-gray-400 mt-5">Escolha o plano ideal para você criar sua página personalizada. Você pode escolher entre os planos abaixo.</p>
            <PlanoPageContent />
        </div>
    )
}

function PlanoPageContent() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCreateClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Redirecionar para a página de criação se autenticado
    window.location.href = '/criar';
  };

   const planos = [
    {
      titulo: "Para sempre",
      descricao: "Esse plano é vitalício, não precisa renovar.",
      recomendado: true,
      precoAntigo: "R$ 54,00",
      precoAtual: "R$ 28,00",
      periodo: "uma vez",
      recursos: [
        { text: "Texto dedicado", ativo: true },
        { text: "Contador em tempo real", ativo: true, destaque: true },
        { text: "Data de início", ativo: true },
        { text: "QR Code exclusivo", ativo: true, destaque: true },
        { text: "Máximo de 8 imagens", ativo: true },
        { text: "Com música", ativo: true, destaque: true },
        { text: "Fundo dinâmico", ativo: true },
        { text: "Com animações exclusivas", ativo: true, destaque: true },
        { text: "URL personalizada", ativo: true },
        { text: "Suporte 24 horas", ativo: true, destaque: true },
      ],
    },
    {
      titulo: "Anual",
      descricao: "Esse plano possui um período de 1 ano.",
      recomendado: false,
      precoAntigo: "R$ 42,00",
      precoAtual: "R$ 24,00",
      periodo: "por ano",
      recursos: [
        { text: "Texto dedicado", ativo: true },
        { text: "Contador em tempo real", ativo: true, destaque: true },
        { text: "Data de início", ativo: true },
        { text: "QR Code exclusivo", ativo: true, destaque: true },
        { text: "Máximo de 4 imagens", ativo: true },
        { text: "Sem música", ativo: false, destaque: true },
        { text: "Sem fundo dinâmico", ativo: false },
        { text: "Sem animações exclusivas", ativo: false, destaque: true },
        { text: "URL personalizada", ativo: true },
        { text: "Suporte 24 horas", ativo: true, destaque: true },
      ],
    },
  ];

  return (
    <div className="bg-black min-h-screen flex justify-center items-center px-6 py-16">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {planos.map((plano, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl border ${
              plano.recomendado ? "border-red-500" : "border-gray-700"
            } flex flex-col gap-6 bg-gradient-to-b from-black via-gray-800 to-black`}
          >
            {plano.recomendado && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm w-max">
                ⭐ Recomendado
              </span>
            )}
            <h2 className="text-2xl font-bold text-red-500">{plano.titulo}</h2>
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

            <button 
              onClick={handleCreateClick}
              className="mt-auto bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold"
            >
              Criar minha página
            </button>
          </div>
        ))}
      </div>
      
      {/* Modal de Autenticação */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            // Redirecionar após login bem-sucedido
            window.location.href = '/criar';
          }}
        />
      )}
    </div>
  );
}