import type { FormTituloProps } from "../../../../schema/form-templates";


export function FormTitulo({
  titulo,
  setTitulo,
  mensagemTitulo,
}: FormTituloProps) {
  
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">
        {mensagemTitulo}
      </h2>
      <input
        type="text"
        maxLength={30}
        placeholder="Digite o título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 rounded-md text-black bg-gray-100 border border-gray-300"
      />
    </div>
  );
}