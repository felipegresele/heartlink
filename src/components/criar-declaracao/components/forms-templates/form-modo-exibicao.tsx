import type { FormModoExibicaoProps } from "../../../../schema/form-templates";

export function FormModoExibicao({
  modoExibicao,
  setModoExibicao,
}: FormModoExibicaoProps) {
  const opcoes = [
    { label: "Padrão", value: "padrao" },
    { label: "Clássico", value: "classico" },
    { label: "Simples", value: "simples" },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Modo de mostrar tempo</h2>
      <div className="flex gap-4">
        {opcoes.map((op) => (
          <label
            key={op.value}
            className={`cursor-pointer p-1 rounded-md border text-sm ${
              modoExibicao === op.value
                ? "border-[#e687cd] bg-gray-300"
                : "border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="modoExibicao"
              value={op.value}
              checked={modoExibicao === op.value}
              onChange={(e) => setModoExibicao(e.target.value as "padrao" | "classico" | "simples")}
              className="mr-2"
            />
            {op.label}
          </label>
        ))}
      </div>
    </div>
  );
}
