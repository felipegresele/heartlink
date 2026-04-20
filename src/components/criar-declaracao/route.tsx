import { Link } from "react-router-dom";
import { LoginModal } from "../auth/LoginModal";
import { useEffect, useState } from "react";

export function EscolherTemplate() {
  const [abrirModal, setAbrirModal] = useState(false);

  const templates = [
    {
      id: 1,
      title: "Template Padrão",
      bonus: "+ Sessão Retrospectiva",
      path: "/padrao",
      button: "Criar",
    },
  ];

  const storedUser = localStorage.getItem("user");
  const usuario = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!usuario) {
      setAbrirModal(true);
    }
  }, [usuario]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start text-white p-6">
      <h1 className="font-bold text-3xl mt-6 mb-2">
        Modelos de templates disponíveis
      </h1>
      <p className="text-sm text-gray-400 mb-10 text-center">
        Escolha qual você deseja para surpreender alguém
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {templates.map((item) => (
          <div
            key={item.id}
            className="group relative w-64 h-44 rounded-2xl p-[1px] bg-gradient-to-br from-pink-500/40 via-red-500/30 to-transparent hover:from-pink-500 hover:via-red-500 transition-all duration-300"
          >
            <div className="relative w-full h-full bg-[#0d0d1a] rounded-2xl flex flex-col items-center justify-center text-center p-5 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent" />

              <h3 className="text-lg font-bold mb-2 z-10">{item.title}</h3>

              <p className="text-xs text-white/60 mb-4 z-10">{item.bonus}</p>

              <Link
                to={item.path}
                className="z-10 px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 transition-transform duration-200"
              >
                {item.button}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-16">Em breve mais disponíveis</p>

      {abrirModal && <LoginModal fecharModal={() => setAbrirModal(false)} />}
    </div>
  );
}
