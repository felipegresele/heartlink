import { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  FiAlertCircle,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";
import type { LovePage } from "../../schema/schemas";

// Imagens das molduras
import molduraPadrao from "../../img/qr-code-padrao.png";
import moldura1 from "../../img/escaneie-e-se-surprenda-com-qr.webp";
import moldura2 from "../../img/juntos-para-sempre-com-qr.webp";
import moldura3 from "../../img/spotify-com-qr.webp";
import moldura4 from "../../img/supresa-para-vc-com-qr.webp";
import moldura5 from "../../img/carta-com-qr.webp";

const PLANO_INFO: Record<string, { nome: string; preco: number }> = {
  VITALICIO: { nome: "Para Sempre (Vitalício)", preco: 25.0 },
  PADRAO: { nome: "Padrão", preco: 20.0 },
};

const MOLDURAS = [
  { id: "NONE", label: "Sem moldura", preco: 0, preview: molduraPadrao },
  { id: "ESCANEIE", label: "Escaneie e se Surpreenda", preco: 2.9, preview: moldura1 },
  { id: "JUNTOS", label: "Juntos Para Sempre", preco: 2.9, preview: moldura2 },
  { id: "SPOTIFY", label: "Spotify", preco: 2.9, preview: moldura3 },
  { id: "SURPRESA", label: "Surpresa pra Você", preco: 2.9, preview: moldura4 },
  { id: "CARTA", label: "Carta de Amor", preco: 2.9, preview: moldura5 },
];

interface ModalPagamentoPendenteProps {
  page: LovePage;
  onFechar: () => void;
}

export function ModalPagamentoPendente({ page, onFechar }: ModalPagamentoPendenteProps) {
  const [qrAberto, setQrAberto] = useState(true);
  const [molduraSelecionada, setMolduraSelecionada] = useState("NONE");
  const [carrosselIdx, setCarrosselIdx] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [erro, setErro] = useState("");

  const plano = page.planType ? PLANO_INFO[page.planType] : null;
  const precoPlan = plano?.preco ?? 20.0;
  const precoMoldura = MOLDURAS.find((m) => m.id === molduraSelecionada)?.preco ?? 0;
  const total = precoPlan + precoMoldura;

  const visiveis = MOLDURAS.slice(carrosselIdx, carrosselIdx + 3);
  const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email ?? "";

  async function gerarPagamento() {
    setIsCreating(true);
    setErro("");
    try {
      const res = await fetch("https://lovepage-backend.onrender.com/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: page.id,
          planType: page.planType ?? "PADRAO",
          qrCodeFrame: molduraSelecionada,
          totalAmount: total,
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar pagamento");

      const raw = await res.text();
      setPaymentLink(raw.replace(/^"|"$/g, ""));
    } catch {
      setErro("Não foi possível gerar o link. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 py-4 rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <FiShoppingBag size={18} className="text-red-500" />
            <div>
              <h2 className="text-base font-bold text-white">Finalizar pagamento</h2>
              <p className="text-xs text-white/40 mt-0.5">
                {page.receiverName ? `Declaração para ${page.receiverName}` : "Declaração pendente"}
              </p>
            </div>
          </div>
          <button
            onClick={onFechar}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Aviso de pendente */}
          <div className="flex items-start gap-3 text-sm text-amber-300 border border-amber-500/20 bg-amber-500/10 p-4 rounded-xl">
            <FiAlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              Esta declaração está aguardando pagamento. Finalize agora para ativá-la.
            </span>
          </div>

          {/* Resumo do pedido */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-4 text-gray-100">Resumo do pedido</h3>
            <div className="flex justify-between items-center text-sm text-gray-300 mb-3">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={14} className="text-gray-500" />
                <span>Plano: {plano?.nome ?? "Padrão"}</span>
              </div>
              <span className="font-semibold text-white">
                R$ {precoPlan.toFixed(2).replace(".", ",")}
              </span>
            </div>
            {precoMoldura > 0 && (
              <div className="flex justify-between items-center text-sm text-gray-300 mb-3">
                <div className="flex items-center gap-2">
                  <MdQrCode2 size={14} className="text-gray-500" />
                  <span>QR Code personalizado</span>
                </div>
                <span className="font-semibold text-white">
                  + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                </span>
              </div>
            )}
            <div className="border-t border-gray-700 pt-4 mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-400">Total:</span>
              <span className="text-2xl font-black text-white">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* QR Code personalizado */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
            <button
              onClick={() => setQrAberto(!qrAberto)}
              className="w-full flex justify-between items-center p-5 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                <MdQrCode2 size={18} className="text-red-400" />
                QR Code personalizado
                {molduraSelecionada !== "NONE" && (
                  <span className="ml-2 bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-500/30">
                    + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {qrAberto ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>

            {qrAberto && (
              <div className="px-5 pb-5">
                <p className="text-xs text-gray-500 mb-4">
                  Escolha uma moldura especial para o QR Code. A primeira opção é gratuita.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setCarrosselIdx(Math.max(0, carrosselIdx - 1))}
                    disabled={carrosselIdx === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-30 transition-all flex-shrink-0"
                  >‹</button>

                  <div className="flex gap-3 flex-1 overflow-hidden">
                    {visiveis.map((moldura) => (
                      <button
                        key={moldura.id}
                        onClick={() => setMolduraSelecionada(moldura.id)}
                        className={`relative flex-1 min-w-0 rounded-xl border-2 transition-all overflow-hidden aspect-[2/3] ${
                          molduraSelecionada === moldura.id
                            ? "border-red-500 ring-2 ring-red-500/30"
                            : "border-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {moldura.preview ? (
                          <img src={moldura.preview} alt={moldura.label} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-1 p-2">
                            <MdQrCode2 size={40} className="text-black" />
                            <span className="text-[10px] text-black font-bold text-center leading-tight">Sem moldura</span>
                          </div>
                        )}
                        <div className={`absolute bottom-0 left-0 right-0 py-1.5 text-center text-[11px] font-bold ${
                          moldura.preco === 0 ? "bg-green-600 text-white" : "bg-black/80 text-white"
                        }`}>
                          {moldura.preco === 0 ? "GRÁTIS" : `R$ ${moldura.preco.toFixed(2).replace(".", ",")}`}
                        </div>
                        {molduraSelecionada === moldura.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <FiCheck size={11} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCarrosselIdx(Math.min(MOLDURAS.length - 3, carrosselIdx + 1))}
                    disabled={carrosselIdx >= MOLDURAS.length - 3}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-30 transition-all flex-shrink-0"
                  >›</button>
                </div>
                <p className="text-xs text-center text-gray-400">
                  Selecionada:{" "}
                  <span className="text-white font-medium">
                    {MOLDURAS.find((m) => m.id === molduraSelecionada)?.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Seus dados */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-3 text-gray-100">Seus dados</h3>
            <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300">
              {userEmail || "Email não encontrado"}
            </div>
            <p className="text-xs text-gray-500 mt-2">O link de acesso será enviado para este email.</p>
          </div>

          {/* Aviso entrega */}
          <div className="flex items-start gap-3 text-xs text-orange-300 border border-orange-900/50 bg-orange-950/20 p-4 rounded-xl">
            <FiAlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              O QR Code para acessar sua página será enviado pela nossa equipe para o seu email após confirmação do pagamento.
            </span>
          </div>

          {/* Forma de pagamento + botão */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-4 text-gray-100">Forma de pagamento</h3>
            <div className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Mercado Pago</span>
                <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full border border-green-600/30">Instantâneo</span>
              </div>
              <p className="text-xs text-gray-500">Pix, cartão de crédito ou boleto</p>
            </div>

            {!paymentLink ? (
              <button
                onClick={gerarPagamento}
                disabled={isCreating}
                className="w-full py-4 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 text-white transition-all active:scale-[0.98] shadow-lg shadow-red-600/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isCreating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Gerando...
                  </span>
                ) : (
                  `Pagar R$ ${total.toFixed(2).replace(".", ",")} ❤️`
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <FiCheck size={16} />
                  Link gerado com sucesso!
                </div>
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl font-bold text-sm bg-green-600 hover:bg-green-500 text-white text-center transition-all shadow-lg"
                >
                  Ir para pagamento →
                </a>
                <p className="text-xs text-gray-300 break-all text-center">{paymentLink}</p>
              </div>
            )}

            {erro && (
              <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                <FiAlertCircle size={13} /> {erro}
              </p>
            )}
          </div>

          <p className="text-xs text-center text-gray-600">
            Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </div>
    </div>
  );
}