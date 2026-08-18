import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiAlertCircle,
  FiCheck,
  FiCreditCard,
} from "react-icons/fi";
import { MdQrCode2, MdPix } from "react-icons/md";
import { PixPagamento } from "./carrinho-pagamento-pix";

// Importa as imagens das molduras
import molduraPadrao from "../../../../../img/qr-code-padrao.png";
import moldura1 from "../../../../../img/escaneie-e-se-surprenda-com-qr.webp";
import moldura2 from "../../../../../img/juntos-para-sempre-com-qr.webp";
import moldura3 from "../../../../../img/spotify-com-qr.webp";
import moldura4 from "../../../../../img/supresa-para-vc-com-qr.webp";
import moldura5 from "../../../../../img/carta-com-qr.webp";

interface PagamentoStepProps {
  pageId: string | null;
  selectedPlan: string | null;
}

const PLANO_INFO: Record<string, { nome: string; preco: number }> = {
  VITALICIO: { nome: "Para Sempre (Vitalício)", preco: 25 },
  PADRAO: { nome: "Padrão", preco: 20 },
};

const MOLDURAS = [
  { id: "NONE", label: "Sem moldura", preco: 0, preview: molduraPadrao },
  { id: "ESCANEIE", label: "Escaneie e se Surpreenda", preco: 2.9, preview: moldura1 },
  { id: "JUNTOS", label: "Juntos Para Sempre", preco: 2.9, preview: moldura2 },
  { id: "SPOTIFY", label: "Spotify", preco: 2.9, preview: moldura3 },
  { id: "SURPRESA", label: "Surpresa pra Você", preco: 2.9, preview: moldura4 },
  { id: "CARTA", label: "Carta de Amor", preco: 2.9, preview: moldura5 },
];

type MetodoPagamento = "selecao" | "pix" | "cartao";

export function PagamentoStep({ pageId, selectedPlan }: PagamentoStepProps) {
  const [qrAberto, setQrAberto] = useState(true);
  const [molduraSelecionada, setMolduraSelecionada] = useState("NONE");
  const [carrosselIdx, setCarrosselIdx] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [erro, setErro] = useState("");
  const [metodo, setMetodo] = useState<MetodoPagamento>("selecao");

  const plano = selectedPlan ? PLANO_INFO[selectedPlan] : null;
  const precoPlan = plano?.preco ?? 0;
  const precoMoldura = MOLDURAS.find((m) => m.id === molduraSelecionada)?.preco ?? 0;
  const total = precoPlan + precoMoldura;

  const visiveis = MOLDURAS.slice(carrosselIdx, carrosselIdx + 3);
  const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email ?? "";

  async function gerarPagamentoCartao() {
    if (!pageId || !selectedPlan) return;
    setIsCreating(true);
    setErro("");

    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    try {
      const res = await fetch(
        "https://lovepage-backend.onrender.com/api/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            pageId,
            planType: selectedPlan,
            qrCodeFrame: molduraSelecionada,
            totalAmount: total,
          }),
        },
      );

      if (!res.ok) throw new Error("Erro ao criar pagamento");

      const raw = await res.text();
      setPaymentLink(raw.replace(/^"|"$/g, ""));
    } catch {
      setErro("Não foi possível gerar o link. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  }

  // ── Se escolheu PIX, renderiza o componente de PIX ──────────────────────
  if (metodo === "pix" && pageId && selectedPlan) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-black p-4 md:p-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MdPix size={22} className="text-[#e687cd]" />
            <h1 className="text-xl font-bold">Pagar com PIX</h1>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <PixPagamento
              pageId={pageId}
              selectedPlan={selectedPlan}
              totalAmount={total}
              qrCodeFrame={molduraSelecionada}
              onVoltar={() => setMetodo("selecao")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FiShoppingBag size={22} className="text-[#e687cd]" />
          <h1 className="text-xl font-bold">Finalizar pedido</h1>
        </div>
        <p className="mt-4 text-sm md:text-base text-gray-500 mb-4">
          Finalize os detalhes abaixo e prepare-se para criar um momento inesquecível.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── COLUNA ESQUERDA ── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Resumo do pedido */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl p-5">
            <h2 className="font-bold text-base mb-4 text-black">Resumo do pedido</h2>
            <div className="flex justify-between items-center text-sm text-black mb-3">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={14} className="text-black" />
                <span>Plano: {plano?.nome ?? "—"}</span>
              </div>
              <span className="font-semibold">R$ {precoPlan.toFixed(2).replace(".", ",")}</span>
            </div>
            {precoMoldura > 0 && (
              <div className="flex justify-between items-center text-sm text-black mb-3">
                <div className="flex items-center gap-2">
                  <MdQrCode2 size={14} className="text-gray-500" />
                  <span>QR Code personalizado</span>
                </div>
                <span className="font-semibold">+ R$ {precoMoldura.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
              <span className="text-sm text-black">Total:</span>
              <span className="text-2xl font-black text-black">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* QR Code personalizado */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl overflow-hidden">
            <button
              onClick={() => setQrAberto(!qrAberto)}
              className="w-full flex justify-between items-center p-5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-black">
                <MdQrCode2 size={20} className="text-[#e687cd]" />
                QR Code personalizado
                {molduraSelecionada !== "NONE" && (
                  <span className="ml-2 bg-[#e687cd] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {qrAberto ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>

            {qrAberto && (
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-500 mb-4">
                  Escolha uma moldura especial para o QR Code. A primeira opção é gratuita.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setCarrosselIdx(Math.max(0, carrosselIdx - 1))}
                    disabled={carrosselIdx === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all flex-shrink-0"
                  >‹</button>

                  <div className="flex gap-3 flex-1 overflow-hidden">
                    {visiveis.map((moldura) => (
                      <button
                        key={moldura.id}
                        onClick={() => setMolduraSelecionada(moldura.id)}
                        className={`relative flex-1 min-w-0 rounded-xl border-2 transition-all overflow-hidden aspect-[2/3] ${
                          molduraSelecionada === moldura.id
                            ? "border-[#e687cd] ring-2 ring-pink-300/40"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img src={moldura.preview} alt={moldura.label} className="w-full h-full object-contain" />
                        <div className={`absolute bottom-0 left-0 right-0 py-1.5 text-center text-[11px] font-bold ${
                          moldura.preco === 0 ? "bg-green-600 text-white" : "bg-black/80 text-white"
                        }`}>
                          {moldura.preco === 0 ? "GRÁTIS" : `R$ ${moldura.preco.toFixed(2).replace(".", ",")}`}
                        </div>
                        {molduraSelecionada === moldura.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#e687cd] rounded-full flex items-center justify-center">
                            <FiCheck size={11} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCarrosselIdx(Math.min(MOLDURAS.length - 3, carrosselIdx + 1))}
                    disabled={carrosselIdx >= MOLDURAS.length - 3}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all flex-shrink-0"
                  >›</button>
                </div>
                <p className="text-sm text-center text-gray-500">
                  Selecionada:{" "}
                  <span className="text-black font-medium">
                    {MOLDURAS.find((m) => m.id === molduraSelecionada)?.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-3 text-xs text-orange-600 border border-orange-200 bg-orange-50 p-4 rounded-xl">
            <FiAlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              O QR Code para acessar sua página será enviado pela nossa equipe para o seu email após confirmação do pagamento.
            </span>
          </div>
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Seus dados */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl p-5">
            <h2 className="font-bold text-base mb-4 text-black">Seus dados</h2>
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-black">
              {userEmail || "Email não encontrado"}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              O link de acesso será enviado para este email.
            </p>
          </div>

          {/* Forma de pagamento */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl p-5">
            <h2 className="font-bold text-base mb-4 text-black">Forma de pagamento</h2>

            {/* ── Botões de seleção de método ── */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* PIX */}
              <button
                onClick={() => setMetodo("pix")}
                disabled={!pageId || !selectedPlan}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-[#e687cd] bg-pink-50 hover:bg-pink-100 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <MdPix size={28} className="text-[#e687cd]" />
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800">PIX</p>
                  <p className="text-[11px] text-gray-500">Aprovação imediata</p>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                  Instantâneo
                </span>
              </button>

              <button
                onClick={() => setMetodo("cartao")}
                disabled={!pageId || !selectedPlan}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiCreditCard size={26} className="text-gray-600" />
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800">Cartão</p>
                  <p className="text-[11px] text-gray-500">Mercado Pago</p>
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold border border-gray-200">
                  Crédito
                </span>
              </button>
            </div>

            {/* ── Área de cartão (link externo) ── */}
            {metodo === "cartao" && (
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-xl p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Mercado Pago</span>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-200">
                      Seguro
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Cartão de crédito</p>
                </div>

                {!paymentLink ? (
                  <button
                    onClick={gerarPagamentoCartao}
                    disabled={isCreating}
                    className="w-full py-4 rounded-xl font-bold text-sm bg-[#e687cd] hover:bg-pink-400 cursor-pointer text-white transition-all active:scale-[0.98] shadow-lg shadow-pink-200 disabled:opacity-60 disabled:cursor-not-allowed"
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
                      `Gerar link — R$ ${total.toFixed(2).replace(".", ",")} ❤️`
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
                      className="block w-full py-4 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-400 text-white text-center transition-all shadow-lg"
                    >
                      Ir para pagamento →
                    </a>
                    <p className="text-xs text-gray-400 break-all text-center">{paymentLink}</p>
                  </div>
                )}

                {erro && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-2">
                    <FiAlertCircle size={13} /> {erro}
                  </p>
                )}

                <button
                  onClick={() => setMetodo("selecao")}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors text-center mt-1"
                >
                  ← Escolher outro método
                </button>
              </div>
            )}

            {metodo === "selecao" && (
              <p className="text-xs text-gray-400 text-center mt-1">
                Escolha como deseja pagar acima
              </p>
            )}
          </div>

          <p className="text-xs text-center text-gray-500">
            Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </div>
    </div>
  );
}