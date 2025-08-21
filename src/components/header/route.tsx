import { Link } from "react-router-dom";
import img from "../../assets/img.jpg";
import { useEffect, useState } from "react";
import { AuthModal } from "../auth/AuthModal"; // Certifique-se de que o caminho está correto
import { LoginModal } from "../auth/LoginModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { SlArrowDown } from "react-icons/sl";

export function Header() {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalLogin, setExibirModalLogin] = useState(false);
  const [usuario, setUsuario] = useState<{ nome: string | null, email: string | null } | null>(null);

  // Monitorar autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({ nome: user.displayName, email: user.email });
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe(); // limpar listener ao desmontar
  }, []);

  const abrirModal = () => setExibirModal(true);
  const fecharModal = () => setExibirModal(false);
  const abrirModalLogin = () => setExibirModalLogin(true);

  const deslogar = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  return (
    <div className="bg-black p-8 justify-between flex items-center">
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
        <div className="flex gap-4 items-center">
          {usuario ? (
            <div className="relative group">
              {/* Botão principal */}
              <button className="flex items-center gap-2 bg-black border py-2 px-4 rounded-md hover:bg-gray-600 font-bold border-none">
                <span>{usuario?.nome || "Usuário"}</span>
                <SlArrowDown size={15} color="white" />
              </button>

              {/* Menu suspenso */}
              <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={deslogar}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-red-500 rounded-md"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={abrirModalLogin}
                className="bg-black border border-red-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 font-bold"
              >
                Entrar
              </button>
              <button
                onClick={abrirModal}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 font-bold w-30 h-10"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>

        {exibirModal && <AuthModal fecharModal={fecharModal} />}
        {exibirModalLogin && <LoginModal fecharModal={fecharModal} />}
      </div>
    </div>
  );
}
