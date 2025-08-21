import { Link } from "react-router-dom";

export function EscolherTemplate() {
  const templates = [
    {
      id: 1,
      title: "Template Padrão",
      path: "/padrao",
      button: "Criar",
    },
    {
      id: 2,
      title: "Template Netflix",
      path: "/netflix",
      button: "Criar",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start text-white p-6">
      <h1 className="font-bold text-3xl mt-6 mb-2">Modelos de templates disponíveis</h1>
      <p className="text-sm text-gray-400 mb-10 text-center">
        Escolha qual você deseja para surpreender alguém
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {templates.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 hover:bg-gray-800 transition-all duration-200 rounded-lg shadow-lg w-60 h-40 flex flex-col items-center justify-center p-4 text-center"
          >
            <h2 className="text-xl font-bold mb-4">{item.title}</h2>
            <Link
              to={item.path}
              className="bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-2 rounded-md font-semibold"
            >
              {item.button}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-16">Em breve mais disponíveis</p>
    </div>
  );
}
