import { AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaGlobe, FaMusic } from "react-icons/fa6";

export function Recursos() {

  const recursos = [
    {
        
      icon: <FaCalendarAlt size={24} />,
      title: "Contador de tempo",
      description:
        "Mostre há quanto tempo vocês estão juntos com um contador em tempo real.",
    },
    {
      icon: <BsImage size={24} />,
      title: "Animações de fundo",
      description:
        "Escolha entre várias animações de fundo para personalizar a página.",
    },
    {
      icon: <FaMusic size={24} />,
      title: "Música dedicada",
      description:
        "Dedique uma música especial. A música será reproduzida automaticamente na página.",
    },
    {
      icon: <FaGlobe size={24} />,
      title: "Em todo lugar",
      description:
        "Crie sua página e compartilhe de qualquer lugar do mundo. Aceitamos pagamentos internacionais.",
    },
    {
      icon: <AiOutlineQrcode size={24} />,
      title: "QR Code exclusivo",
      description:
        "Crie um QR Code exclusivo para sua página. O QR Code será gerado automaticamente.",
    },
    {
      icon: <AiOutlineLink size={24} />,
      title: "URL personalizada",
      description:
        "Crie uma URL personalizada para sua página. A URL será gerada automaticamente.",
    },
  ];

  return (
    <div className="bg-black text-white py-16 px-6">
      {/* Título e descrição */}
      <div className="text-center mb-12">
        <h1 className="text-xl font-bold mb-4">Recursos Exclusivos</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Nossa plataforma oferece recursos exclusivos e incríveis para você criar
          a página personalizada perfeita do seu jeitinho
        </p>
      </div>

      {/* Grid dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {recursos.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-3 hover:bg-gray-800 hover:border-red-500 transition"
          >
            <div className="bg-red-400 p-3 w-fit rounded-full text-white">
              {item.icon}
            </div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
