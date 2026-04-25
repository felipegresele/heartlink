import type { FormModoImagemProps } from "../../../../schema/form-templates";


export function FormModoImagem({ modoImagem, setModoImagem }: FormModoImagemProps) {
  const opcoes = [
    { label: "Carrossel", value: "carrossel" },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Modo de exibir imagens</h2>
      <div className="flex gap-4">
        {opcoes.map((op) => (
          <label
            key={op.value}
            className={`cursor-pointer p-1 rounded-md border text-sm ${
              modoImagem === op.value
                ? "border-[#e687cd] bg-gray-300"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="modoImagem"
              value={op.value}
              checked={modoImagem === op.value}
              onChange={(e) => setModoImagem(e.target.value as "carrossel")}
              className="mr-2"
            />
            {op.label}
          </label>
        ))}
      </div>
    </div>
  );
}