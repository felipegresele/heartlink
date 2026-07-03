import { useEffect } from "react";
import type { ModalPresenteProps } from "../../../../../schema/presente-pronto/ver-presente";

export default function ModalPresente({
  usuarioNome,
  corTextos,
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
 
      <div className="flex flex-col items-center gap-4 max-w-xs w-full">
        <h1 className="text-3xl font-extrabold leading-tight">
          <span className={corTextos}>{usuarioNome}</span> separou um{" "}
          <span className={corTextos}>presente</span> especial!
        </h1>
 
        <p className="text-gray-400 text-sm leading-relaxed">
          Um momento único feito com carinho para celebrar a jornada de vocês
        </p>
 
        <button
          onClick={onClose}
          style={{ backgroundColor: corTextos}}
          className={`mt-4 hover:bg-red-400 active:scale-95 transition-all text-white font-bold text-base px-10 py-3 rounded-full shadow-lg`}
        >
          Ver Presente
        </button>
      </div>
    </div>
  );
}
 