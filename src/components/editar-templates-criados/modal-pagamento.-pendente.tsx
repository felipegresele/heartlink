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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <FiShoppingBag size={16} className="text-[#e687cd]" />
            <div>
              <h2 className="text-sm font-bold text-gray-800">Finalizar pagamento</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {page.receiverName ? `Declaração para ${page.receiverName}` : "Declaração pendente"}
              </p>
            </div>
          </div>
          <button
            onClick={onFechar}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <IoClose size={18} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Aviso de pendente */}
          <div className="flex items-start gap-2 text-xs text-amber-600 border border-amber-200 bg-amber-50 p-3 rounded-xl">
            <FiAlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>Esta declaração está aguardando pagamento. Finalize agora para ativá-la.</span>
          </div>

          {/* Resumo do pedido */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-xs mb-3 text-gray-700 uppercase tracking-wide">Resumo do pedido</h3>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={13} className="text-gray-400" />
                <span>Plano: {plano?.nome ?? "Padrão"}</span>
              </div>
              <span className="font-semibold text-gray-800">
                R$ {precoPlan.toFixed(2).replace(".", ",")}
              </span>
            </div>
            {precoMoldura > 0 && (
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-2">
                  <MdQrCode2 size={13} className="text-gray-400" />
                  <span>QR Code personalizado</span>
                </div>
                <span className="font-semibold text-gray-800">
                  + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">Total:</span>
              <span className="text-xl font-black text-gray-800">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* QR Code personalizado */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setQrAberto(!qrAberto)}
              className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MdQrCode2 size={16} className="text-[#e687cd]" />
                QR Code personalizado
                {molduraSelecionada !== "NONE" && (
                  <span className="ml-1 bg-pink-50 text-[#e687cd] text-xs px-2 py-0.5 rounded-full border border-pink-200">
                    + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {qrAberto ? <FiChevronUp size={14} className="text-gray-400" /> : <FiChevronDown size={14} className="text-gray-400" />}
            </button>

            {qrAberto && (
              <div className="px-4 pb-4">
                <p className="text-xs text-gray-400 mb-3">
                  Escolha uma moldura especial para o QR Code. A primeira opção é gratuita.
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => setCarrosselIdx(Math.max(0, carrosselIdx - 1))}
                    disabled={carrosselIdx === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all flex-shrink-0"
                  >‹</button>

                  <div className="flex gap-2 flex-1 overflow-hidden">
                    {visiveis.map((moldura) => (
                      <button
                        key={moldura.id}
                        onClick={() => setMolduraSelecionada(moldura.id)}
                        className={`relative flex-1 min-w-0 rounded-xl border-2 transition-all overflow-hidden aspect-[2/3] ${
                          molduraSelecionada === moldura.id
                            ? "border-[#e687cd] ring-2 ring-pink-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {moldura.preview ? (
                          <img src={moldura.preview} alt={moldura.label} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-1 p-2">
                            <MdQrCode2 size={32} className="text-black" />
                            <span className="text-[10px] text-black font-bold text-center leading-tight">Sem moldura</span>
                          </div>
                        )}
                        <div className={`absolute bottom-0 left-0 right-0 py-1 text-center text-[10px] font-bold ${
                          moldura.preco === 0 ? "bg-green-500 text-white" : "bg-black/70 text-white"
                        }`}>
                          {moldura.preco === 0 ? "GRÁTIS" : `R$ ${moldura.preco.toFixed(2).replace(".", ",")}`}
                        </div>
                        {molduraSelecionada === moldura.id && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e687cd] rounded-full flex items-center justify-center">
                            <FiCheck size={9} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCarrosselIdx(Math.min(MOLDURAS.length - 3, carrosselIdx + 1))}
                    disabled={carrosselIdx >= MOLDURAS.length - 3}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all flex-shrink-0"
                  >›</button>
                </div>
                <p className="text-xs text-center text-gray-400">
                  Selecionada:{" "}
                  <span className="text-gray-700 font-medium">
                    {MOLDURAS.find((m) => m.id === molduraSelecionada)?.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Seus dados */}
          <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-xs mb-2 text-gray-700 uppercase tracking-wide">Seus dados</h3>
            <div className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm text-gray-500">
              {userEmail || "Email não encontrado"}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">O link de acesso será enviado para este email.</p>
          </div>

          {/* Aviso entrega */}
          <div className="flex items-start gap-2 text-xs text-amber-700 border border-orange-100 bg-orange-50 p-3 rounded-xl">
            <FiAlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              O QR Code para acessar sua página será enviado pela nossa equipe para o seu email após confirmação do pagamento.
            </span>
          </div>

          {/* Forma de pagamento + botão */}
          <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-xs mb-3 text-gray-700 uppercase tracking-wide">Forma de pagamento</h3>
            <div className="bg-gray-100 rounded-xl p-3 mb-3 border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Mercado Pago</span>
                <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-200">Instantâneo</span>
              </div>
              <p className="text-xs text-gray-400">Pix, cartão de crédito ou boleto</p>
            </div>

            {!paymentLink ? (
              <button
                onClick={gerarPagamento}
                disabled={isCreating}
                className="w-full py-3 rounded-xl font-bold text-sm bg-[#e687cd] hover:bg-pink-400 text-white transition-all active:scale-[0.98] shadow-lg shadow-pink-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
                <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                  <FiCheck size={16} />
                  Link gerado com sucesso!
                </div>
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-400 text-white text-center transition-all shadow-lg"
                >
                  Ir para pagamento →
                </a>
                <p className="text-xs text-gray-400 break-all text-center">{paymentLink}</p>
              </div>
            )}

            {erro && (
              <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                <FiAlertCircle size={13} /> {erro}
              </p>
            )}
          </div>

          <p className="text-xs text-center text-gray-400 pb-1">
            Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </div>
    </div>
  );
}