import { Link } from "react-router-dom";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import imgCelular from "../../img/hero-section.svg";
import { AvaliacoesDeslizando } from "../avaliacoes/card-avaliacoes";

export function BoasVindas() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-8 md:px-20 text-white bg-black">
      <div className="max-w-lg">
        <h1 className="text-5xl md:text-6xl mt-6 font-bold mb-4">
          Declare seu amor
        </h1>
        {/* <TextoAnimado /> */}
        <p className="mb-8 text-lg md:text-xl">
          Crie uma página personalizada para quem você ama e surpreenda a pessoa
          com uma declaração especial que ficará para sempre.
        </p>

        <Link
          to="/criar"
          className="flex gap-2 cursor-pointer bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-300 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 max-w-100 h-15 justify-start items-center"
        >
          <FaHeartCircleExclamation size={20} /> Criar minha página
        </Link>

        <div className="mt-6 w-full max-w-md">
          <AvaliacoesDeslizando />
        </div>
      </div>
      {/* Imagem do celular */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start mt-10 md:mt-0">
        <img
          src={imgCelular}
          alt="Exemplo de página"
          className="w-[280px] sm:w-[350px] md:w-[450px] rounded-xl"
        />
      </div>
    </div>
  );
}
