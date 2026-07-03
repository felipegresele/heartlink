export type PageTemplate = "PADRAO" | "SPOTIFY";

interface FormEscolherTemplateProps {
  pageTemplate: PageTemplate;
  setPageTemplate: (value: PageTemplate) => void;
}

export function FormEscolherTemplate({
  pageTemplate,
  setPageTemplate,
}: FormEscolherTemplateProps) {
  const opcoes: { label: string; value: PageTemplate; descricao: string }[] = [
    {
      label: "Padrão",
      value: "PADRAO",
      descricao: "Cartão clássico com foto, mensagem e contador.",
    },
    {
      label: "Spotify",
      value: "SPOTIFY",
      descricao: "Visual estilo player de música, com capa e conquistas.",
    },
  ];

  return (
    <div className="space-y-2 mt-4">
      <h2 className="text-lg font-bold">Template da página</h2>
      <div className="flex gap-4 flex-wrap">
        {opcoes.map((op) => (
          <label
            key={op.value}
            className={`cursor-pointer p-3 rounded-md border text-sm w-full sm:w-56 ${
              pageTemplate === op.value
                ? "border-[#e687cd] bg-gray-300"
                : "border-gray-400"
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              <input
                type="radio"
                name="pageTemplate"
                value={op.value}
                checked={pageTemplate === op.value}
                onChange={(e) =>
                  setPageTemplate(e.target.value as PageTemplate)
                }
              />
              {op.label}
            </div>
            <p className="text-gray-600 mt-1">{op.descricao}</p>
          </label>
        ))}
      </div>
    </div>
  );
}