export function Instrucoes() {
  const steps = [
    {
      id: 1,
      title: "Personalize",
      description:
        "Personalize sua página com fotos, mensagens, efeitos especiais e muito mais.",
    },
    {
      id: 2,
      title: "Faça o pagamento",
      description:
        "Escolha seu plano preferido e faça o pagamento de forma rápida e segura.",
    },
    {
      id: 3,
      title: "Receba seu acesso",
      description:
        "Você receberá por email um QR code e link para acessar sua página.",
    },
    {
      id: 4,
      title: "Compartilhe o amor",
      description:
        "Compartilhe a página com a pessoa amada e surpreenda-a de forma especial.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-center p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-2">
        Crie sua página em poucos passos
      </h1>
      <p className="text-gray-300 max-w-md mb-10">
        Personalize uma página especial para surpreender alguém querido. 
        O processo é simples e rápido.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            {/* Círculo com número */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
              {step.id}
            </div>

            <h2 className="text-white font-semibold text-xl mt-6 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
