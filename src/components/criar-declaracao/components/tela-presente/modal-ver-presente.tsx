import { useEffect } from "react";
import type { ModalPresenteProps } from "../../../../schema/presente-pronto/ver-presente";

export default function ModalPresente({
  usuarioNome,
  corBotao = "bg-red-600",
  onClose,
}: ModalPresenteProps) {
  // trava scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 px-6">
      <div className="bg-gray-900 text-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl border border-white/10">
        <h2 className="text-2xl font-bold mb-3">
          💌 Você recebeu um presente!
        </h2>
        <p className="text-gray-300 mb-2">
          <span className="text-red-400 font-bold">{usuarioNome}</span> preparou
          algo especial para você ❤️
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Toque no botão abaixo para descobrir...
        </p>
        <button
          onClick={onClose}
          className={`${corBotao} hover:opacity-90 transition px-8 py-3 rounded-full font-bold text-white text-lg shadow-lg`}
        >
          Ver meu presente
        </button>
      </div>
    </div>
  );
}
