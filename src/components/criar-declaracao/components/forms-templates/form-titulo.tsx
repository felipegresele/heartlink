import type { FormTituloProps } from "../../../../schema/form-templates";


export function FormTitulo({
  titulo,
  setTitulo,
  corTitulo,
  setCorTitulo,
  fonteTitulo,
  setFonteTitulo,
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
    </div>
  );
}