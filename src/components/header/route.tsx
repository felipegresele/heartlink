import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthModal } from "../auth/AuthModal";
import { LoginModal } from "../auth/LoginModal";
import { SlArrowDown } from "react-icons/sl";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import imgLogo from "../../img/logo-heartcode.webp";

interface Usuario {
  nome: string | null;
  email: string | null;
}

export function Header() {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirModalLogin, setExibirModalLogin] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  // Dentro do componente
  const navigate = useNavigate();

  const carregarUsuario = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsuario({ nome: user.username, email: user.email });
    } else {
      setUsuario(null);
    }
  };

  useEffect(() => {
    carregarUsuario();
    window.addEventListener("storage", carregarUsuario);
    return () => window.removeEventListener("storage", carregarUsuario);
  }, []);

  const abrirModal = () => setExibirModal(true);
  const fecharModal = () => setExibirModal(false);

  const abrirModalLogin = () => setExibirModalLogin(true);

  const fecharModalLogin = () => {
    setExibirModalLogin(false);
    carregarUsuario();
  };

  const deslogar = () => {
    localStorage.removeItem("user");
    setUsuario(null);
    setMenuAberto(false);
  };

  return (
    <header className="bg-white sticky top-0 z-[999] border-b border-pink-400 p-8 flex justify-between items-center h-[72px]">
      <div className="flex items-center gap-2 z-[1001]">
        <Link
          to="/"
          className="text-black text-2xl font-black tracking-tighter"
        >
          <img src={imgLogo} className="max-w-50" />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
        {["Início", "Sobre", "Help"].map((item) => (
          <Link
            key={item}
            to={item === "Início" ? "/" : `/${item.toLowerCase()}`}
            className="text-black hover:text-[#e687cd] transition-colors text-xl"
          >
            {item === "Help" ? "F.A.Q" : item}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {usuario ? (
          <div className="relative group">
            <button className="flex items-center gap-3 bg-gray-100 py-2 px-4 rounded-full border border-white/10 text-white">
              <div className="w-6 h-6 bg-pink-500 cursor-pointer rounded-full flex items-center justify-center text-[10px] font-bold">
                {usuario.nome?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-bold text-black">{usuario.nome}</span>
              <SlArrowDown
                size={10}
                className="group-hover:rotate-180 transition-transform"
              />
            </button>

            {/* Dropdown - z-50 aqui para garantir que apareça sobre o conteúdo */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[1002]">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-black hover:bg-white/5 hover:text-black transition-colors cursor-pointer"
                onClick={() => {
                  navigate("/perfil");
                }}
              >
                <FiUser /> Meu Perfil
              </button>
              <button
                onClick={deslogar}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-pink-400 hover:bg-pink-500/10 transition-colors cursor-pointer"
              >
                <FiLogOut /> Sair
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={abrirModalLogin}
              className="cursor-pointer text-black text-xl font-bold px-4 py-2 hover:bg-white/10 rounded-lg transition-all"
            >
              Entrar
            </button>
            <button
              onClick={abrirModal}
              className="cursor-pointer bg-[#e687cd] hover:bg-pink-400 text-white text-xl font-bold py-2 px-6 rounded-full shadow-lg shadow-red-600/20 transition-all"
            >
              Cadastrar
            </button>
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-white z-[1001] p-2"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        {menuAberto ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* Mobile Menu - Corrigido visibilidade */}
      <div
        className={`
        fixed inset-0 bg-black flex flex-col p-6 pt-24 gap-8 transition-transform duration-300 md:hidden z-[1000]
        ${menuAberto ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {usuario && (
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold text-white uppercase">
              {usuario.nome?.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold text-lg">{usuario.nome}</p>
              <p className="text-xs text-gray-400">{usuario.email}</p>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-6 text-2xl font-black text-white">
          <Link
            to="/"
            onClick={() => setMenuAberto(false)}
            className="hover:text-red-500 transition-colors"
          >
            Início
          </Link>
          <Link
            to="/sobre"
            onClick={() => setMenuAberto(false)}
            className="hover:text-red-500 transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="/help"
            onClick={() => setMenuAberto(false)}
            className="hover:text-red-500 transition-colors"
          >
            F.A.Q
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-4 pb-8">
          {usuario ? (
            <>
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuAberto(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white/10 text-white p-4 rounded-2xl font-bold border border-white/20"
              >
                <FiUser /> Meu Perfil
              </button>

              <button
                onClick={deslogar}
                className="w-full bg-red-600/10 text-red-500 p-4 rounded-2xl font-bold border border-red-500/20"
              >
                Sair da Conta
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setExibirModalLogin(true);
                  setMenuAberto(false);
                }}
                className="w-full border border-white/20 text-white p-4 rounded-2xl font-bold text-lg"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setExibirModal(true);
                  setMenuAberto(false);
                }}
                className="w-full bg-red-600 text-white p-4 rounded-2xl font-bold text-lg"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modais */}
      {exibirModal && <AuthModal fecharModal={fecharModal} />}
      {exibirModalLogin && <LoginModal fecharModal={fecharModalLogin} />}
    </header>
  );
}
