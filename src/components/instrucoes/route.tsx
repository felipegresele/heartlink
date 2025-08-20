export function RegrasComoFunciona() {
  const regras = [
    {
      id: 1,
      title: "Preencha os dados",
      description:
        "Preencha o formulário com os dados do casal e personalize as páginas com seus momentos especiais, incluindo fotos que deseja eternizar.",
    },
    {
      id: 2,
      title: "Pagamento",
      description:
        "Faça o pagamento de forma segura utilizando cartão de crédito ou Pix.",
    },
    {
      id: 3,
      title: "Receba o código QR no e-mail",
      description:
        "Receba o código QR do site personalizado no seu e-mail. Compartilhe digitalmente ou imprima para surpreender o seu amor da forma que achar mais especial.",
    },
  ];

  return (
    <div className="text-center py-12 bg-black text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Como funciona?</h1>
      <p className="max-w-2xl mx-auto text-gray-300 mb-12">
        Crie momentos únicos e eternize suas memórias especiais com nossa
        plataforma. Em apenas três passos simples, você pode criar uma
        experiência personalizada e romântica para surpreender seu amor.
      </p>

      <div className="relative flex justify-between items-start max-w-5xl mx-auto">
        {/* linha tracejada */}
        <div className="absolute top-6 left-0 right-0 h-0.5 border-t-2 border-dotted border-gray-700"></div>

        {regras.map((item) => (
          <div key={item.id} className="flex-1 text-center px-4">
            {/* bolinha com número */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12 mx-auto rounded-full border-2 border-red-500 bg-black text-red-500 shadow-lg">
              <span className="font-bold text-lg">{item.id}</span>
            </div>

            {/* título e descrição */}
            <h3 className="mt-6 font-semibold text-lg text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
