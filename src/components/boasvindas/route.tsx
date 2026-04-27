import { Link } from "react-router-dom";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import imgCelular from "../../img/hero-section.png";
import { AvaliacoesDeslizando } from "../avaliacoes/card-avaliacoes";
import { HiHeart } from "react-icons/hi2";

export function BoasVindas() {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 text-black bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 overflow-hidden">
      {/* Efeito de brilho de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-200 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Corações flutuantes decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className="absolute top-[8%] left-[5%] text-pink-300 text-3xl animate-float"
          style={{ animationDuration: "4s", animationDelay: "0s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute top-[15%] right-[8%] text-pink-400 text-xl animate-float"
          style={{ animationDuration: "5s", animationDelay: "0.5s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute top-[55%] left-[3%] text-fuchsia-300 text-base animate-float"
          style={{ animationDuration: "3.5s", animationDelay: "1s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute bottom-[12%] left-[10%] text-pink-300 text-2xl animate-float"
          style={{ animationDuration: "4.5s", animationDelay: "0.3s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute bottom-[20%] right-[6%] text-pink-400 text-4xl animate-float"
          style={{ animationDuration: "6s", animationDelay: "0.8s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute top-[38%] right-[4%] text-fuchsia-300 text-sm animate-float"
          style={{ animationDuration: "3s", animationDelay: "1.2s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute top-[70%] right-[14%] text-pink-300 text-lg animate-float"
          style={{ animationDuration: "5s", animationDelay: "0.6s" }}
        >
          <HiHeart />
        </span>
        <span
          className="absolute top-[28%] left-[7%] text-fuchsia-400 text-xs animate-float"
          style={{ animationDuration: "4s", animationDelay: "1.5s" }}
        >
          <HiHeart />
        </span>
      </div>
      
      {/* Conteúdo esquerdo */}
      <div className="relative max-w-lg z-10">
        <h1 className="text-5xl md:text-6xl mt-6 font-bold mb-4 text-gray-900">
          Declare seu amor
        </h1>
        <p className="mb-8 text-lg md:text-xl text-gray-500">
          Crie uma página personalizada para quem você ama e surpreenda a pessoa
          com uma declaração especial que ficará para sempre.
        </p>

        <Link
          to="/criar"
          className="relative flex gap-2 cursor-pointer bg-gradient-to-r from-[#e687cd] to-pink-500 hover:from-pink-400 hover:to-fuchsia-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-pink-200 transition-all duration-300 max-w-100 h-15 justify-start items-center overflow-hidden group"
        >
          {/* Shimmer no botão */}
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
          <FaHeartCircleExclamation size={20} /> Criar minha página
        </Link>

        <div className="mt-6 w-full max-w-md">
          <AvaliacoesDeslizando />
        </div>
      </div>

      {/* Imagem do celular com efeitos */}
      <div className="relative w-full md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0 z-10">
        {/* Brilho atrás do celular */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-pink-300 rounded-full opacity-20 blur-3xl" />
        </div>

        {/* Corações ao redor do celular */}
        <span className="absolute top-2 right-6 md:right-16 text-pink-400 text-3xl animate-[float_4s_ease-in-out_infinite] z-20">
          <HiHeart />
        </span>
        <span className="absolute bottom-4 left-6 md:left-16 text-fuchsia-400 text-2xl animate-[float_5s_ease-in-out_infinite_0.7s] z-20">
          <HiHeart />
        </span>
        <span className="absolute top-1/3 left-2 md:left-8 text-pink-300 text-lg animate-[float_3.5s_ease-in-out_infinite_1.1s] z-20">
          <HiHeart />
        </span>
        <span className="absolute bottom-1/3 right-2 md:right-8 text-pink-400 text-xl animate-[float_4.5s_ease-in-out_infinite_0.4s] z-20">
          <HiHeart />
        </span>

        <div className="relative">
          {/* Anel de brilho ao redor do celular */}
          <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-pink-200 via-fuchsia-100 to-pink-300 opacity-40 blur-md" />
          <img
            src={imgCelular}
            alt="Exemplo de página"
            className="relative z-10 w-[320px] sm:w-[420px] md:w-[500px] lg:w-[560px] rounded-3xl drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
