import { useEffect, useState } from "react";
import imgLogo from "../../../../img/logo.png";

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
          className="w-20 h-20 rounded-full flex-shrink-0 border-2 border-pink-500/40"
        />
        <div className="relative bg-white/5 border border-white/10 text-white px-6 py-5 rounded-2xl rounded-tl-sm shadow-lg flex-1">
          <div className="absolute -left-2 top-5 w-3 h-3 bg-white/5 border-l border-b border-white/10 rotate-45" />
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">
            {textoExibido}
            <span className="animate-pulse text-red-500">|</span>
          </p>
        </div>
      </div>

      {/* Botões — só aparecem quando esconderBotoes for false */}
      {!esconderBotoes && (
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onVerMais}
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors"
          >
            Ver seções disponíveis
          </button>
          <button
            onClick={() => setModalPularAberto(true)}
            className="w-full py-2.5 rounded-xl border border-white/30 text-white/70 font-medium text-sm hover:text-white hover:border-white/50 transition-colors"
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
            className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl">💔</div>
            <h3 className="text-white font-bold text-lg">Tem certeza?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              A Sessão Retrospectiva{" "}
              <span className="text-white font-semibold">
                não poderá ser adicionada depois do pagamento.
              </span>{" "}
              É a parte que mais emociona quem recebe — um diferencial incrível
              que transforma o presente em algo verdadeiramente inesquecível.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => setModalPularAberto(false)}
                className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors"
              >
                Quero adicionar a Retrospectiva
              </button>
              <button
                onClick={() => {
                  setModalPularAberto(false);
                  onPular?.();
                }}
                className="w-full py-2.5 rounded-xl border border-white/20 text-white/50 font-medium text-sm hover:text-white hover:border-white/30 transition-colors"
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