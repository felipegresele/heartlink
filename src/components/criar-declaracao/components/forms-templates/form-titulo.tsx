import type { FormTituloProps } from "../../../../schema/form-templates";


export function FormTitulo({
  titulo,
  setTitulo,
  corTitulo,
  setCorTitulo,
  fonteTitulo,
  setFonteTitulo,
  tamanhoTitulo,
  setTamanhoTitulo,
}: FormTituloProps) {
  const fontes = [
    { name: "Alex Brush", value: "Alex Brush, cursive" },
    { name: "Dancing Script", value: "Dancing Script, cursive" },
    { name: "DM Serif Text", value: "DM Serif Text, serif" },
    { name: "Playfair Display", value: "Playfair Display, serif" },
    { name: "Lora", value: "Lora, serif" },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">
        Como vai se chamar a história de vocês?
      </h2>
      <input
        type="text"
        maxLength={30}
        placeholder="Digite o título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 rounded-md text-white bg-gray-800"
      />
      <div className="flex items-center gap-2">
        <label>Cor:</label>
        <input
          type="color"
          value={corTitulo}
          onChange={(e) => setCorTitulo(e.target.value)}
          className="w-10 h-8 cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>Fonte:</label>
        <select
          value={fonteTitulo}
          onChange={(e) => setFonteTitulo(e.target.value)}
          className="p-1 rounded-md text-white bg-black"
        >
          {fontes.map((f, i) => (
            <option key={i} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label>Tamanho:</label>
        <input
          type="number"
          min={10}
          max={60}
          value={tamanhoTitulo}
          onChange={(e) => setTamanhoTitulo(Number(e.target.value))}
          className="w-20 p-1 rounded-md text-white bg-gray-800"
        />
      </div>
    </div>
  );
}