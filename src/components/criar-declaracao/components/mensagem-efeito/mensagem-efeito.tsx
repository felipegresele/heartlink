import { useEffect, useState } from "react";
import imgLogo from "../../../../img/mascote-fotos/cara-apaixonado.png";
import imgTriste from "../../../../img/mascote-fotos/cara-apaixonado.png";

interface Props {
  onPular?: () => void;
  onVerMais?: () => void;
  esconderBotoes?: boolean;
}

export function MensagemComEfeitoEscritaRetrospectiva({ onPular, onVerMais, esconderBotoes }: Props) {
  const texto =
    "Uau seu presente está ficando lindo! Mas ainda dá para transformar em algo inesquecível com a Sessão Retrospectiva.";

  const [textoExibido, setTextoExibido] = useState("");
  const [modalPularAberto, setModalPularAberto] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTextoExibido(texto.slice(0, i + 1));
      i++;
      if (i === texto.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Balão */}
      <div className="flex items-start gap-5 py-4">
        <img
          src={imgLogo}
          className="w-25 h-22 rounded-full object-cover flex-shrink-0 border-2 border-pink-500/40"
        />
        <div className="relative bg-gray-100 border border-gray-300 text-black px-6 py-5 rounded-2xl rounded-xl shadow-lg flex-1">
          <div className="absolute -left-2 top-5 w-3 h-3 bg-white/5 border-l border-b border-white/10 rotate-45" />
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">
            {textoExibido}
            <span className="animate-pulse text-pink-400">|</span>
          </p>
        </div>
      </div>

      {/* Botões — só aparecem quando esconderBotoes for false */}
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

      {/* Modal confirmação */}
      {modalPularAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setModalPularAberto(false)}
        >
          <div
            className="bg-white text-black border border-white/10 rounded-2xl p-6 max-w-sm w-full justify-center space-y-4 "
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imgTriste} className="w-30 h-30"/>
            <h3 className="font-bold text-lg">Tem certeza?</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
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