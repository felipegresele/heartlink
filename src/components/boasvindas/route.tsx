import { Link } from "react-router-dom";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import AuthModal from "../auth/AuthModal";

export function BoasVindas() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCreateClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <div
      className="relative flex flex-col items-start justify-center min-h-screen px-8 md:px-20 text-white bg-black"
    >
      <div className="max-w-lg">
        <h3 className="mb-4 text-xl">Vamos começar?</h3>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Declare seu amor
        </h1>
        {/* <TextoAnimado /> */}
        <p className="mb-8 text-lg md:text-xl">
          Crie uma página personalizada para quem você ama e surpreenda a pessoa
          com uma declaração especial que ficará para sempre.
        </p>

        <Link
          to="/criar"
          onClick={handleCreateClick}
          className="flex gap-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-300 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 w-100 h-15 justify-start items-center"
        >
          <FaHeartCircleExclamation size={20} /> Criar minha página
        </Link>

        {/* Avaliação dos usuários */}
        <div className="flex items-center mt-6 space-x-2">
          <div className="flex -space-x-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/2.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/3.jpg"
              alt=""
            />
          </div>
          <span className="text-yellow-400 font-semibold">★★★★★</span>
          <span>Mais de 10.465 usuários satisfeitos</span>
        </div>
      </div>

      {/* Imagem do celular */}
      <div className="absolute right-8 top-20 md:top-1/4 w-80 md:w-[400px]">
        <img
          src="https://via.placeholder.com/400x800" // substitua pela imagem do celular com a página
          alt="Exemplo de página"
          className="rounded-xl shadow-2xl"
        />
      </div>
      
      {/* Modal de Autenticação */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
          }}
        />
      )}
    </div>
  );
}

// function TextoAnimado() {
//   return (
//     <div>
//       <h3 className="text-3xl md:text-4xl text-red-500 mb-6 italic">
//         <ReactTyped
//           strings={[
//             "para seu amor!",
//             "para alguém especial!",
//             "para eternizar momentos!",
//             "para surpreender alguém!",
//             "para seu amigo!",
//           ]}
//           typeSpeed={50}
//           backSpeed={30} 
//           loop      
//         />
//       </h3>
//     </div>
//   );
// }