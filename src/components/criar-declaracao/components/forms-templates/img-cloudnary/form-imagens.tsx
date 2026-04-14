import { useState } from "react";
import type { FormImagensProps } from "../../../../../schema/form-templates";

const CLOUD_NAME = "dsqzqfga2";
const UPLOAD_PRESET = "heartlink";

export function FormImagens({ imagens, setImagens }: FormImagensProps) {
  const [uploading, setUploading] = useState(false);

  const handleAdicionarImagem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (imagens.length >= 3) {
      alert("Você pode adicionar no máximo 3 imagens!");
      return;
    }

    setUploading(true);
    const novasImagens: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        alert("Selecione apenas imagens!");
        continue;
      }

      if (imagens.length + novasImagens.length >= 3) {
        alert("Você pode adicionar no máximo 3 imagens!");
        break;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await res.json();

        if (data.secure_url) {
          novasImagens.push(data.secure_url); // URL permanente ✅
        } else {
          alert("Erro ao fazer upload de uma imagem.");
        }
      } catch (err) {
        console.error("Erro no upload:", err);
        alert("Erro ao enviar imagem. Tente novamente.");
      }
    }

    setImagens([...imagens, ...novasImagens]);
    setUploading(false);
  };

  const removerImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Imagens</h2>

      {imagens.length < 8 && (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAdicionarImagem}
            disabled={uploading}
            className="mb-2 p-2 rounded-md text-black bg-gray-200 cursor-pointer disabled:opacity-50"
          />
        </label>
      )}

      {uploading && (
        <p className="text-sm text-pink-400 animate-pulse">Enviando imagens...</p>
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