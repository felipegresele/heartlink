
import { useRef, type ChangeEvent } from "react";
import { FaCamera } from "react-icons/fa";

interface UploadImagemProps {
  value: string;           // base64 ou URL atual
  onChange: (base64: string) => void;
  className?: string;
  label?: string;
}

export function UploadImagem({ value, onChange, className = "", label }: UploadImagemProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      className={`relative cursor-pointer group rounded-xl overflow-hidden border-2 border-dashed border-white/20 hover:border-pink-400 transition-all ${className}`}
      onClick={() => inputRef.current?.click()}
    >
      {value ? (
        <img
          src={value}
          alt="preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-white/40 group-hover:text-pink-400 transition-colors">
          <FaCamera size={24} />
          <span className="text-xs">{label ?? "Adicionar imagem"}</span>
        </div>
      )}

      {/* Overlay de troca */}
      {value && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <FaCamera size={20} className="text-white" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}