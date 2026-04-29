import { useEffect, useState } from "react";
import imgLogo from "../../../../img/mascote-fotos/cara-apaixonado.png";
import imgTriste from "../../../../img/mascote-fotos/triste.png";

interface Props {
  onPular?: () => void;
  onVerMais?: () => void;
  esconderBotoes?: boolean;
}

export function MensagemComEfeitoEscritaRetrospectiva({ onPular, onVerMais, esconderBotoes }: Props) {
  const texto =
    "Uau seu presente está ficando lindo! Mas ainda dá para transformar em algo inesquecível com a Sessão Retrospectiva.";

  const [textoExibido, setTextoExibido] = useState("");
  const [digitando, setDigitando] = useState(true);
  const [modalPularAberto, setModalPularAberto] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTextoExibido(texto.slice(0, i + 1));
      i++;
      if (i === texto.length) {
        clearInterval(interval);
        setDigitando(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Área principal: avatar flutuante + balão */}
      <div className="flex items-center gap-4 py-4">

        {/* Avatar flutuante animado */}
        <div
          className="w-20 h-20 flex-shrink-0 rounded-full border-[3px] border-white ring-2 ring-pink-300 bg-pink-50 overflow-hidden"
          style={{ animation: "floatKoala 3s ease-in-out infinite" }}
        >
          <img
            src={imgLogo}
            alt="Coalinha"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Balão de texto */}
        <div className="relative bg-gray-100 border border-gray-200 rounded-2xl px-5 py-4 shadow-sm flex-1">
          {/* Seta do balão apontando para o avatar */}
          <div className="absolute -left-2 top-6 w-3 h-3 bg-gray-100 border-l border-b border-gray-200 rotate-45" />

          {digitando && (
            <p className="text-xs text-pink-400 font-medium mb-1 animate-pulse">
              digitando...
            </p>
          )}

          <p className="text-lg md:text-xl font-semibold leading-relaxed text-black">
            {textoExibido}
            {digitando && (
              <span className="animate-pulse text-pink-400 ml-0.5">|</span>
            )}
          </p>
        </div>
      </div>

      {/* Botões */}
      {!esconderBotoes && (
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onVerMais}
            className="w-full py-3 rounded-xl bg-[#e687cd] hover:bg-pink-400 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            Ver seções disponíveis
          </button>
          <button
            onClick={() => setModalPularAberto(true)}
            className="w-full py-2.5 rounded-xl border border-black text-black font-medium text-sm cursor-pointer"
          >
            Continuar sem retrospectiva
          </button>
        </div>
      )}

      <style>{`
        @keyframes floatKoala {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      {/* Modal confirmação */}
      {modalPularAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setModalPularAberto(false)}
        >
          <div
            className="bg-white text-black border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imgTriste} className="w-24 h-24 mx-auto" alt="Coalinha triste" />
            <h3 className="font-bold text-lg text-center">Tem certeza?</h3>
            <p className="text-gray-500 text-sm leading-relaxed text-center">
              A Sessão Retrospectiva{" "}
              <span className="text-gray-600 font-semibold">
                não poderá ser adicionada depois do pagamento.
              </span>{" "}
              É a parte que mais emociona quem recebe — um diferencial incrível
              que transforma o presente em algo verdadeiramente inesquecível.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => setModalPularAberto(false)}
                className="w-full py-3 rounded-xl bg-[#e687cd] hover:bg-pink-400 text-white font-bold text-sm transition-colors"
              >
                Quero adicionar a Retrospectiva
              </button>
              <button
                onClick={() => {
                  setModalPularAberto(false);
                  onPular?.();
                }}
                className="w-full py-2.5 rounded-xl border border-black text-black font-medium text-sm hover:border-gray-300 transition-colors"
              >
                Continuar sem retrospectiva
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}