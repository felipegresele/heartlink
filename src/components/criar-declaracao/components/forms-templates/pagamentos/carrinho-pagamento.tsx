import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";

// Importa as imagens das molduras
import molduraPadrao from "../../../../../img/qr-code-padrao.png"
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
  VITALICIO: { nome: "Para Sempre (Vitalício)", preco: 5.5 },
  PADRAO: { nome: "Padrão", preco: 5.5 },
};

const MOLDURAS = [
  { id: "NONE", label: "Sem moldura", preco: 0, preview: molduraPadrao },
  {
    id: "ESCANEIE",
    label: "Escaneie e se Surpreenda",
    preco: 2.9,
    preview: moldura1,
  },
  { id: "JUNTOS", label: "Juntos Para Sempre", preco: 2.9, preview: moldura2 },
  { id: "SPOTIFY", label: "Spotify", preco: 2.9, preview: moldura3 },
  { id: "SURPRESA", label: "Surpresa pra Você", preco: 2.9, preview: moldura4 },
  { id: "CARTA", label: "Carta de Amor", preco: 2.9, preview: moldura5 },
];

export function PagamentoStep({ pageId, selectedPlan }: PagamentoStepProps) {
  const [qrAberto, setQrAberto] = useState(true);
  const [molduraSelecionada, setMolduraSelecionada] = useState("NONE");
  const [carrosselIdx, setCarrosselIdx] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [erro, setErro] = useState("");

  const plano = selectedPlan ? PLANO_INFO[selectedPlan] : null;
  const precoPlan = plano?.preco ?? 0;
  const precoMoldura =
    MOLDURAS.find((m) => m.id === molduraSelecionada)?.preco ?? 0;
  const total = precoPlan + precoMoldura;

  const moldurasSelecionaveis = MOLDURAS;
  // Itens visíveis no carrossel (3 por vez em telas maiores)
  const visiveis = moldurasSelecionaveis.slice(carrosselIdx, carrosselIdx + 3);

  const userEmail =
    JSON.parse(localStorage.getItem("user") || "{}").email ?? "";

  async function gerarPagamento() {
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
    } catch (e: any) {
      setErro("Não foi possível gerar o link. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FiShoppingBag size={22} className="text-[#e687cd]" />
          <h1 className="text-xl font-bold">Finalizar pedido</h1>
        </div>

        <p className="mt-4 text-sm md:text-base text-gray-500 mb-4">
          Finalize os detalhes abaixo e prepare-se para criar um momento
          inesquecível.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── COLUNA ESQUERDA ── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Card: Resumo do pedido */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl p-5">
            <h2 className="font-bold text-base mb-4 text-black">
              Resumo do pedido
            </h2>

            <div className="flex justify-between items-center text-sm text-black mb-3">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={14} className="text-black" />
                <span>Plano: {plano?.nome ?? "—"}</span>
              </div>
              <span className="font-semibold text-black">
                R$ {precoPlan.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {precoMoldura > 0 && (
              <div className="flex justify-between items-center text-sm text-black mb-3">
                <div className="flex items-center gap-2">
                  <MdQrCode2 size={14} className="text-gray-500" />
                  <span>QR Code personalizado</span>
                </div>
                <span className="font-semibold black">
                  + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                </span>
              </div>
            )}

            <div className="border-t border-gray-800 pt-4 mt-2 flex justify-between items-center">
              <span className="text-sm text-black">Total:</span>
              <span className="text-2xl font-black text-black">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* Card: QR Code personalizado */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl overflow-hidden">
            <button
              onClick={() => setQrAberto(!qrAberto)}
              className="w-full flex justify-between items-center p-5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-black">
                <MdQrCode2 size={20} className="text-[#e687cd]" />
                QR Code personalizado
                {molduraSelecionada !== "NONE" && (
                  <span className="ml-2 bg-[#e687cd] text-black text-md font-bold px-2 py-0.5 rounded-full border border-pink-400">
                    + R$ {precoMoldura.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {qrAberto ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </button>

            {qrAberto && (
              <div className="px-5 pb-5">
                <p className="text-md text-gray-500 mb-4">
                  Escolha uma moldura especial para o QR Code que será enviado
                  no email. A primeira opção é gratuita.
                </p>

                {/* Carrossel */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() =>
                      setCarrosselIdx(Math.max(0, carrosselIdx - 1))
                    }
                    disabled={carrosselIdx === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-30 transition-all flex-shrink-0"
                  >
                    ‹
                  </button>

                  <div className="flex gap-3 flex-1 overflow-hidden">
                    {visiveis.map((moldura) => (
                      <button
                        key={moldura.id}
                        onClick={() => setMolduraSelecionada(moldura.id)}
                        className={`relative flex-1 min-w-0 rounded-xl border-2 transition-all overflow-hidden aspect-[2/3] ${
                          molduraSelecionada === moldura.id
                            ? "border-[#e687cd] ring-2 ring-pink-500/30"
                            : "border-[#e687cd] hover:border-[#e687cd]"
                        }`}
                      >
                        {moldura.preview ? (
                          <img
                            src={moldura.preview}
                            alt={moldura.label}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          // Opção "Sem moldura" — QR simples
                          <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-1 p-2">
                            <MdQrCode2 size={40} className="text-black" />
                            <span className="text-[10px] text-black font-bold text-center leading-tight">
                              Sem moldura
                            </span>
                          </div>
                        )}

                        {/* Badge preço */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 py-1.5 text-center text-[11px] font-bold ${
                            moldura.preco === 0
                              ? "bg-green-600 text-white"
                              : "bg-black/80 text-white"
                          }`}
                        >
                          {moldura.preco === 0
                            ? "GRÁTIS"
                            : `R$ ${moldura.preco.toFixed(2).replace(".", ",")}`}
                        </div>

                        {/* Check selecionado */}
                        {molduraSelecionada === moldura.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <FiCheck size={11} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCarrosselIdx(
                        Math.min(
                          moldurasSelecionaveis.length - 3,
                          carrosselIdx + 1,
                        ),
                      )
                    }
                    disabled={carrosselIdx >= moldurasSelecionaveis.length - 3}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-30 transition-all flex-shrink-0"
                  >
                    ›
                  </button>
                </div>

                {/* Nome da selecionada */}
                <p className="text-md text-center text-gray-500">
                  Selecionada:{" "}
                  <span className="text-black font-medium">
                    {MOLDURAS.find((m) => m.id === molduraSelecionada)?.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-3 text-xs text-orange-500 border border-orange-500/50 bg-orange-100/20 p-4 rounded-xl">
            <FiAlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              O QR Code para acessar sua página será enviado pela nossa equipe
              para o seu email após confirmação do pagamento.
            </span>
          </div>
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card: Seus dados */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl p-5">
            <h2 className="font-bold text-base mb-4 text-black">Seus dados</h2>
            <div className="space-y-3">
              <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-sm text-black">
                {userEmail || "Email não encontrado"}
              </div>
              <p className="text-xs text-gray-500">
                O link de acesso será enviado para este email.
              </p>
            </div>
          </div>

          {/* Card: Pagamento */}
          <div className="bg-[#FAFAFA] border border-gray-300 rounded-2xl p-5">
            <h2 className="font-bold text-base mb-4 text-black">
              Forma de pagamento
            </h2>

            <div className="bg-gray-100 rounded-xl p-4 mb-4 border border-gray-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Mercado Pago</span>
                <span className="text-xs bg-green-600/20 text-green-600 px-2 py-0.5 rounded-full border border-green-600/30">
                  Instantâneo
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Pix, cartão de crédito ou boleto
              </p>
            </div>

            {/* Botão gerar pagamento */}
            {!paymentLink ? (
              <button
                onClick={gerarPagamento}
                disabled={isCreating}
                className="w-full py-4 rounded-xl font-bold text-sm bg-[#e687cd] hover:bg-pink-400 cursor-pointer text-white transition-all active:scale-[0.98] shadow-lg shadow-red-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
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
                <p className="text-xs text-black break-all text-center">
                  {paymentLink}
                </p>
              </div>
            )}

            {erro && (
              <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                <FiAlertCircle size={13} /> {erro}
              </p>
            )}
          </div>

          {/* Segurança */}
          <p className="text-xs text-center text-gray-600">
            Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </div>
    </div>
  );
}
