// src/components/criar-declaracao/components/forms-templates/pix-pagamento.tsx
//
// Tela de pagamento PIX — exibe QR Code gerado pelo backend e faz polling
// até detectar o pagamento (status "approved").
//
// Uso:
//   <PixPagamento
//     pageId={pageId}
//     selectedPlan={selectedPlan}
//     totalAmount={total}
//     qrCodeFrame={molduraSelecionada}
//     onPago={() => navigate("/sucesso")}
//     onVoltar={() => setAbaAtiva("cartao")}
//   />

import { useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";

// ─── tipos ───────────────────────────────────────────────────────────────────

interface PixPagamentoProps {
  pageId: string;
  selectedPlan: string;
  totalAmount: number;
  qrCodeFrame: string;
  /** Chamado quando o backend confirma pagamento aprovado */
  onPago?: () => void;
  /** Volta para a aba de cartão */
  onVoltar?: () => void;
}

interface PixResponse {
  paymentId: number;
  qrCode: string;       // string "copia e cola"
  qrCodeBase64: string; // imagem PNG em base64
  status: string;
}

const API_BASE = "https://lovepage-backend.onrender.com/api/payment";
const POLL_INTERVAL_MS = 3000;

// ─── componente ──────────────────────────────────────────────────────────────

export function PixPagamento({
  pageId,
  selectedPlan,
  totalAmount,
  qrCodeFrame,
  onPago,
  onVoltar,
}: PixPagamentoProps) {
  const [step, setStep] = useState<"loading" | "qrcode" | "paid" | "error">("loading");
  const [pix, setPix] = useState<PixResponse | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── 1. Gera o PIX ao montar ─────────────────────────────────────────────
  useEffect(() => {
    gerarPix();
    return () => clearPolling();
  }, []);

  async function gerarPix() {
    setStep("loading");
    setErrorMsg("");

    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    try {
      const res = await fetch(`${API_BASE}/pix/create`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

         },
        body: JSON.stringify({
          pageId,
          planType: selectedPlan,
          qrCodeFrame,
          totalAmount,
        }),
      });

      if (!res.ok) throw new Error(`Erro ${res.status}`);

      const data: PixResponse = await res.json();
      setPix(data);
      setStep("qrcode");
      iniciarPolling(data.paymentId);
    } catch (e: any) {
      setErrorMsg("Não foi possível gerar o PIX. Tente novamente.");
      setStep("error");
    }
  }

  // ── 2. Polling de status ────────────────────────────────────────────────
  function iniciarPolling(paymentId: number) {
    clearPolling();
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/pix/status/${paymentId}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.status === "approved") {
          clearPolling();
          setStep("paid");
          onPago?.();
        }
      } catch {
        // ignora erros de rede no polling
      }
    }, POLL_INTERVAL_MS);
  }

  function clearPolling() {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }

  // ── 3. Copiar código PIX ────────────────────────────────────────────────
  async function copiar() {
    if (!pix) return;
    await navigator.clipboard.writeText(pix.qrCode);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  // ─── renders por estado ──────────────────────────────────────────────────

  if (step === "loading") return <Loading />;
  if (step === "error") return <Erro msg={errorMsg} onRetry={gerarPix} onVoltar={onVoltar} />;
  if (step === "paid") return <Pago />;

  // ── estado: qrcode ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-5 py-2">

      {/* Título */}
      <div className="text-center">
        <h3 className="text-base font-bold text-black">Pague com PIX</h3>
        <p className="text-xs text-gray-500 mt-1">
          Escaneie o QR Code ou copie o código abaixo
        </p>
      </div>

      {/* Valor */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 text-center">
        <p className="text-xs text-gray-500 mb-0.5">Total a pagar</p>
        <p className="text-2xl font-black text-black">
          R$ {totalAmount.toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* QR Code */}
      {pix?.qrCodeBase64 && (
        <div className="border-4 border-[#e687cd] rounded-2xl p-3 bg-white shadow-md">
          <img
            src={`data:image/png;base64,${pix.qrCodeBase64}`}
            alt="QR Code PIX"
            className="w-48 h-48 object-contain"
          />
        </div>
      )}

      {/* Indicador aguardando */}
      <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
        <FiClock size={13} className="animate-pulse" />
        Aguardando pagamento...
      </div>

      {/* Código copia e cola */}
      <div className="w-full">
        <p className="text-xs text-gray-500 mb-1.5 font-medium">Código PIX (copia e cola)</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2.5 text-[11px] text-gray-700 break-all font-mono overflow-hidden max-h-14 leading-relaxed">
            {pix?.qrCode}
          </div>
          <button
            onClick={copiar}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              copiado
                ? "bg-green-500 text-white"
                : "bg-[#e687cd] text-white hover:bg-pink-400"
            }`}
          >
            {copiado ? (
              <>
                <FiCheckCircle size={13} />
                Copiado!
              </>
            ) : (
              <>
                <FiCopy size={13} />
                Copiar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Instruções */}
      <ol className="w-full space-y-2 text-xs text-gray-600">
        {[
          "Abra o app do seu banco",
          "Escolha a opção pagar com PIX",
          "Escaneie o QR Code ou cole o código",
          "Confirme o pagamento",
        ].map((passo, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e687cd]/20 text-[#c060a8] font-bold flex items-center justify-center text-[10px]">
              {i + 1}
            </span>
            {passo}
          </li>
        ))}
      </ol>

      {/* Voltar */}
      {onVoltar && (
        <button
          onClick={onVoltar}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors mt-1"
        >
          <FiArrowLeft size={12} />
          Pagar com cartão ou boleto
        </button>
      )}

      <p className="text-[10px] text-gray-400 text-center">
        O QR Code expira em 30 minutos. Após o pagamento, o link será enviado
        automaticamente para seu email.
      </p>
    </div>
  );
}

// ─── sub-componentes ─────────────────────────────────────────────────────────

function Loading() {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <svg className="animate-spin w-8 h-8 text-[#e687cd]" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      <p className="text-sm text-gray-500">Gerando seu QR Code PIX...</p>
    </div>
  );
}

function Pago() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <FiCheckCircle size={32} className="text-green-500" />
      </div>
      <div>
        <h3 className="text-base font-bold text-black">Pagamento confirmado! 🎉</h3>
        <p className="text-xs text-gray-500 mt-1">
          O QR Code da sua página foi enviado para o seu email.
        </p>
      </div>
    </div>
  );
}

function Erro({ msg, onRetry, onVoltar }: { msg: string; onRetry: () => void; onVoltar?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <FiAlertCircle size={36} className="text-red-400" />
      <p className="text-sm text-gray-600">{msg}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-[#e687cd] text-white text-sm font-semibold hover:bg-pink-400 transition-all"
      >
        Tentar novamente
      </button>
      {onVoltar && (
        <button onClick={onVoltar} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Pagar com cartão ou boleto
        </button>
      )}
    </div>
  );
}