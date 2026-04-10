import type { FormImagensProps } from "../../../../schema/form-templates";


export function FormImagens({ imagens, setImagens }: FormImagensProps) {
  const handleAdicionarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const novasImagens: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        alert("Selecione apenas imagens!");
        return;
      }

      if (imagens.length + novasImagens.length >= 8) {
        alert("Você pode adicionar no máximo 8 imagens!");
        break;
      }

      novasImagens.push(URL.createObjectURL(file));
    }

    setImagens([...imagens, ...novasImagens]);
  };

  const removerImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Imagens</h2>
      {imagens.length < 8 && (
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleAdicionarImagem}
          className="mb-2 p-2 rounded-md text-black bg-gray-200 cursor-pointer"
        />
      )}
      <div className="flex flex-wrap gap-2">
        {imagens.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img}
              alt={`Imagem ${i + 1}`}
              className="w-14 h-14 object-cover rounded-md"
            />
            <button
              onClick={() => removerImagem(i)}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
