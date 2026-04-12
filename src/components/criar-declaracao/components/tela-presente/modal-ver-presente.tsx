import { useEffect } from "react";
import type { ModalPresenteProps } from "../../../../schema/presente-pronto/ver-presente";

export default function ModalPresente({
  usuarioNome,
  onClose,
}: ModalPresenteProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
 
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-8 text-white text-center">
      {/* Badge tipo "Wrapped" no topo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <span className="bg-green-500 text-black text-xs font-bold px-4 py-1 rounded-full tracking-wide uppercase">
          Wrapped
        </span>
      </div>
 
      <div className="flex flex-col items-center gap-4 max-w-xs w-full">
        <h1 className="text-3xl font-extrabold leading-tight">
          {usuarioNome} separou um{" "}
          <span className="text-green-400">presente</span> especial!
        </h1>
 
        <p className="text-gray-400 text-sm leading-relaxed">
          Um momento único feito com carinho para celebrar a jornada de vocês
        </p>
 
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 hover:bg-green-400 active:scale-95 transition-all text-black font-bold text-base px-10 py-3 rounded-full shadow-lg"
        >
          Ver Presente
        </button>
      </div>
    </div>
  );
}
 