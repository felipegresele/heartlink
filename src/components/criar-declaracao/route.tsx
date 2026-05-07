import { Link } from "react-router-dom";
import { LoginModal } from "../auth/LoginModal";
import { useEffect, useState } from "react";

export function EscolherTemplate() {
  const [abrirModal, setAbrirModal] = useState(false);

  const templates = [
    {
      id: 1,
      title: "Template Casal",
      bonus: "+ Sessão Retrospectiva",
      path: "/padrao",
      demo: "https://www.heartcodegift.com.br/p/37ca69", // coloque o link aqui
      button: "Criar",
    },
    {
      id: 2,
      title: "Template Dia das mães",
      bonus: "+ Sessão Retrospectiva",
      path: "/padrao-mae",
      demo: "https://www.heartcodegift.com.br/p/fc8f5e", // coloque o link aqui
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
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-start text-black p-6">
      <h1 className="font-bold text-3xl mt-6 mb-2">
        Modelos de templates disponíveis
      </h1>
      <p className="text-sm text-gray-500 mb-10 text-center">
        Escolha qual você deseja para surpreender alguém
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {templates.map((item) => (
          <div
            key={item.id}
            className="group relative w-64 h-44 rounded-2xl p-[1px] bg-gradient-to-br from-pink-300/40 via-pink-500/30 to-transparent hover:from-pink-100 hover:via-pink-200 transition-all duration-300"
          >
            <div className="relative w-full h-full bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-center p-5 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent" />

              <h3 className="text-lg font-bold mb-2 z-10">{item.title}</h3>

              <p className="text-xs text-[#e687cd] mb-4 z-10 font-bold">{item.bonus}</p>

              {/* Botões lado a lado */}
              <div className="z-10 flex gap-2">
                <Link
                  to={item.path}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 transition-transform duration-200"
                >
                  {item.button}
                </Link>

                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-pink-400 text-pink-500 bg-white hover:bg-pink-50 hover:scale-105 transition-transform duration-200"
                >
                  Ver Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-16">Em breve mais disponíveis</p>

      {abrirModal && <LoginModal fecharModal={() => setAbrirModal(false)} />}
    </div>
  );
}