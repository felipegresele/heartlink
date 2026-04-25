import { useRef, useState, type ChangeEvent } from "react";
import { FaCamera } from "react-icons/fa";

const CLOUD_NAME = "dsqzqfga2";
const UPLOAD_PRESET = "heartlink";
const FOLDER = "heartlink/timeline";

const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp"];

interface UploadImagemTimelineProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  label?: string;
}

export function UploadImagemTimeline({ value, onChange, className = "", label }: UploadImagemTimelineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!TIPOS_ACEITOS.includes(file.type)) {
      alert("Formato não permitido! Use JPG, PNG ou WebP (GIF não é aceito).");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", FOLDER);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        alert("Erro ao fazer upload da imagem. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro no upload:", err);
      alert("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className={`relative cursor-pointer group rounded-xl overflow-hidden border-2 border-dashed border-white/20 hover:border-pink-400 transition-all ${className}`}
      onClick={() => !uploading && inputRef.current?.click()}
    >
      {uploading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-pink-400 animate-pulse">
          <FaCamera size={24} />
          <span className="text-xs">Enviando...</span>
        </div>
      ) : value ? (
        <>
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <FaCamera size={20} className="text-white" />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-[#e687cd] group-hover:text-pink-400 transition-colors">
          <FaCamera size={24} />
          <span className="text-xs">{label ?? "Foto do momento"}</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
