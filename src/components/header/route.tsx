import { Link } from "react-router-dom";
import img from "../../assets/img.jpg";
import { useEffect, useState } from "react";
import { AuthModal } from "../auth/AuthModal";
import { LoginModal } from "../auth/LoginModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { SlArrowDown } from "react-icons/sl";
import { FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalLogin, setExibirModalLogin] = useState(false);
  const [usuario, setUsuario] = useState<{ nome: string | null; email: string | null } | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({ nome: user.displayName, email: user.email });
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const abrirModal = () => setExibirModal(true);
  const fecharModal = () => setExibirModal(false);
  const abrirModalLogin = () => setExibirModalLogin(true);

  const deslogar = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <header className="bg-black p-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={img} className="w-15" />
        <Link to="/" className="text-white text-3xl font-bold">
          Heart<span className="text-red-500">Link.</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <nav className="hidden md:flex text-white text-[15px] gap-8 font-bold">
        <Link to="/">Início</Link>
        <Link to="/dicas">Como funciona?</Link>
        <Link to="/temas">Temas</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/help">F.A.Q</Link>
      </nav>

      {/* User/Login Buttons Desktop */}
      <div className="hidden md:flex items-center gap-4 text-white">
        {usuario ? (
          <div className="relative group">
            <button className="flex items-center gap-2 bg-black border py-2 px-4 rounded-md hover:bg-gray-600 font-bold border-none">
              <span>{usuario?.nome || "Usuário"}</span>
              <SlArrowDown size={15} color="white" />
            </button>
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

      {/* Hamburger Button Mobile */}
      <div className="md:hidden text-white">
        <button onClick={toggleMenu}>
          {menuAberto ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuAberto && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center gap-4 py-4 md:hidden z-50">
          <Link to="/" className="text-white font-bold" onClick={toggleMenu}>
            Início
          </Link>
          <Link to="/dicas" className="text-white font-bold" onClick={toggleMenu}>
            Como funciona?
          </Link>
          <Link to="/temas" className="text-white font-bold" onClick={toggleMenu}>
            Temas
          </Link>
          <Link to="/planos" className="text-white font-bold" onClick={toggleMenu}>
            Planos
          </Link>
          <Link to="/help" className="text-white font-bold" onClick={toggleMenu}>
            F.A.Q
          </Link>

          {usuario ? (
            <button
              onClick={() => {
                deslogar();
                toggleMenu();
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-md font-bold"
            >
              Desconectar Conta
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  abrirModalLogin();
                  toggleMenu();
                }}
                className="bg-black border border-red-500 text-white py-2 px-4 rounded-md font-bold"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  abrirModal();
                  toggleMenu();
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md font-bold"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>
      )}

      {exibirModal && <AuthModal fecharModal={fecharModal} />}
      {exibirModalLogin && <LoginModal fecharModal={fecharModal} />}
    </header>
  );
}
