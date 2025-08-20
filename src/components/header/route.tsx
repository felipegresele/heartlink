import { Link } from "react-router-dom";
import img from "../../assets/img.jpg";
import { useState } from "react";
import { AuthModal } from "../auth/AuthModal"; // Certifique-se de que o caminho está correto

export function Header() {
  const [exibirModal, setExibirModal] = useState(false);

  const abrirModal = () => {
    setExibirModal(true);
  };

  const fecharModal = () => {
    setExibirModal(false);
  };

  return (
    <div className="bg-black p-6 justify-between flex items-center">
      <div className="flex gap-2 justify-center items-center">
        <img src={img} className="w-15" />
        <Link to="/" className="text-white text-3xl font-bold">
          Heart<span className="text-red-500">Link.</span>
        </Link>
      </div>
      <div className="flex text-white text-[15px] gap-8 font-bold">
        <Link to="/">Início</Link>
        <Link to="/dicas">Como funciona?</Link>
        <Link to="/temas">Temas</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/help">F.A.Q</Link>
      </div>
      <div className="text-white">
        <div className="flex gap-4">
          <Link
            to="/login" // Rota de login
            className="bg-black border-1 border-red-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 font-bold"
          >
            Entrar
          </Link>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 font-bold w-30 h-10"
            onClick={abrirModal} // Abre o modal de Cadastro
          >
            Cadastrar
          </button>
        </div>

        {exibirModal && <AuthModal fecharModal={fecharModal} />}
      </div>
    </div>
  );
}
