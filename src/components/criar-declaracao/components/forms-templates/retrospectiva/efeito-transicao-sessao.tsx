// ============================================================
// COMPONENTE — SpotifySingleScreen (Spotify Wrapped Intro)
// Intro animada estilo Spotify Wrapped com efeito de pixels
// ============================================================
import { useEffect, useRef, useState, useCallback } from "react";

// ── Tipos ─────────────────────────────────────────────────────
type Props = {
  senderName: string;
  totalDias: number;
  totalHoras: number;
  fotos: string[];
  onFinish?: () => void;
};

// ── Constantes do efeito de pixel ────────────────────────────
const PIXEL_SIZE = 12;
const PIXEL_COLORS = [
  "#ec4899", // pink-500
  "#a855f7", // purple-500
  "#8b5cf6", // violet-500
  "#f472b6", // pink-400
  "#c084fc", // purple-400
  "#ffffff",
];

// ── Utilitário: posições aleatórias estáveis por foto ────────
function stableRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ── Canvas de Pixels ─────────────────────────────────────────
interface PixelCanvasProps {
  phase: "enter" | "exit" | "idle";
  onEnterDone?: () => void;
  onExitDone?: () => void;
}

function PixelCanvas({ phase, onEnterDone, onExitDone }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pixelsRef = useRef<
    { x: number; y: number; color: string; delay: number; progress: number }[]
  >([]);
  const startTimeRef = useRef<number>(0);
  const phaseRef = useRef(phase);
  const callbackFiredRef = useRef(false);

  const buildPixels = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cols = Math.ceil(canvas.width / PIXEL_SIZE);
    const rows = Math.ceil(canvas.height / PIXEL_SIZE);
    const total = cols * rows;
    pixelsRef.current = Array.from({ length: total }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: col * PIXEL_SIZE,
        y: row * PIXEL_SIZE,
        color: PIXEL_COLORS[Math.floor(stableRandom(i * 7) * PIXEL_COLORS.length)],
        delay: stableRandom(i * 13) * 0.7, // 0-0.7s delay spread
        progress: 0,
      };
    });
  }, []);

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (startTimeRef.current === 0) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds
      const totalDuration = 1.2; // total animation time in seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDone = true;

      for (const px of pixelsRef.current) {
        // Normalize progress accounting for delay
        const t = Math.min(
          Math.max((elapsed - px.delay) / (totalDuration - px.delay), 0),
          1
        );

        const isEntering = phaseRef.current === "enter";

        // easeOutQuart
        const eased = isEntering ? 1 - Math.pow(1 - t, 4) : Math.pow(t, 4);

        // For enter: alpha goes 0 → 1, size expands
        // For exit:  alpha goes 1 → 0, size shrinks
        const alpha = isEntering ? eased : 1 - eased;
        const size = PIXEL_SIZE * (isEntering ? eased : 1 - eased);

        if (t < 1) allDone = false;

        if (alpha > 0.01 && size > 0.5) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = px.color;
          const offset = (PIXEL_SIZE - size) / 2;
          ctx.fillRect(px.x + offset, px.y + offset, size, size);
        }
      }

      ctx.globalAlpha = 1;

      if (!allDone) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        // Animation complete
        if (!callbackFiredRef.current) {
          callbackFiredRef.current = true;
          if (phaseRef.current === "enter") onEnterDone?.();
          if (phaseRef.current === "exit") onExitDone?.();
        }
      }
    },
    [onEnterDone, onExitDone]
  );

  useEffect(() => {
    phaseRef.current = phase;
    callbackFiredRef.current = false;

    if (phase === "idle") {
      cancelAnimationFrame(animRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    buildPixels();
    startTimeRef.current = 0;
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [phase, buildPixels, draw]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}

// ── Componente principal ──────────────────────────────────────
export default function SpotifySingleScreen({
  senderName,
  totalDias,
  totalHoras,
  fotos,
  onFinish,
}: Props) {
  // step: 0 | 1 | 2 | 3 | "exiting" | "done"
  const [step, setStep] = useState<number | "exiting" | "done">(0);
  const [pixelPhase, setPixelPhase] = useState<"enter" | "exit" | "idle">("enter");
  const [contentVisible, setContentVisible] = useState(false);

  // Step durations in ms
  const STEP_DURATIONS = [2000, 2000, 3000, 3000];

  // Called when pixel enter animation finishes → show content
  const handleEnterDone = useCallback(() => {
    setPixelPhase("idle");
    setContentVisible(true);
  }, []);

  // Called when pixel exit animation finishes → call onFinish
  const handleExitDone = useCallback(() => {
    setStep("done");
    onFinish?.();
  }, [onFinish]);

  // Sequence controller
  useEffect(() => {
    if (typeof step !== "number") return;

    const duration = STEP_DURATIONS[step] ?? 2000;

    const timer = setTimeout(() => {
      const nextStep = step + 1;

      if (nextStep > 3) {
        // All steps done — trigger exit pixel animation
        setContentVisible(false);
        setStep("exiting");
        setPixelPhase("exit");
      } else {
        // Transition to next step with pixel enter animation
        setContentVisible(false);
        setPixelPhase("enter");
        // Small delay to let fade out, then switch step after pixels start
        setTimeout(() => {
          setStep(nextStep);
        }, 200);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Safety timeout: garante que onFinish é sempre chamado mesmo se a animação
  // de saída travar ou não completar (ex: canvas invisível, foco perdido)
  useEffect(() => {
    if (step !== "exiting") return;
    const safetyTimer = setTimeout(() => {
      onFinish?.();
    }, 2500); // espera 2.5s extra após início do exit
    return () => clearTimeout(safetyTimer);
  }, [step, onFinish]);

  if (step === "done") return null;

  return (
    <>
      {/* Pixel Canvas overlay */}
      <PixelCanvas
        phase={pixelPhase}
        onEnterDone={handleEnterDone}
        onExitDone={handleExitDone}
      />

      {/* Fullscreen container */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "#000",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {/* STEP 0 — Nome do casal + frase */}
        {step === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              💝 sua retrospectiva
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #f9a8d4, #ffffff, #d8b4fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {senderName}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 3vw, 1.35rem)",
                marginTop: "1.25rem",
                color: "rgba(255,255,255,0.6)",
                fontWeight: 400,
                maxWidth: 480,
                lineHeight: 1.5,
              }}
            >
              os momentos que mais marcaram esse casal
            </p>
          </div>
        )}

        {/* STEP 1 — Dias + histórias e memórias */}
        {step === 1 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.75rem",
                fontWeight: 600,
              }}
            >
              juntos por
            </p>
            <h1
              style={{
                fontSize: "clamp(4rem, 16vw, 10rem)",
                fontWeight: 900,
                lineHeight: 1,
                background: "linear-gradient(135deg, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {totalDias}
            </h1>
            <p
              style={{
                fontSize: "clamp(1.25rem, 4vw, 2rem)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                marginTop: "0.25rem",
                letterSpacing: "0.05em",
              }}
            >
              dias
            </p>
            <p
              style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
                marginTop: "1rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              histórias e memórias
            </p>
          </div>
        )}

        {/* STEP 2 — Fotos caindo */}
        {step === 2 && (
          <>
            {/* Overlay escuro */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.72)",
                zIndex: 1,
              }}
            />

            {/* Fotos */}
            {fotos.length > 0 ? (
              fotos.map((foto, i) => (
                <img
                  key={i}
                  src={foto}
                  alt=""
                  style={{
                    position: "absolute",
                    top: "-12rem",
                    left: `${(stableRandom(i * 17) * 80) + 5}%`,
                    width: "clamp(120px, 18vw, 180px)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    opacity: contentVisible ? 0.85 : 0,
                    animation: contentVisible ? `pixelFall ${2.5 + stableRandom(i * 3) * 1.5}s ease-in forwards` : "none",
                    animationDelay: `${stableRandom(i * 11) * 0.8}s`,
                    zIndex: 0,
                    objectFit: "cover",
                    aspectRatio: "1/1",
                  }}
                />
              ))
            ) : (
              // Fallback quando não há fotos
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  opacity: contentVisible ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "4rem" }}>📸</span>
                  <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "1rem", fontSize: "1.1rem" }}>
                    memórias guardadas no coração
                  </p>
                </div>
              </div>
            )}

            {/* Texto centralizado sobre as fotos */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "scale(1)" : "scale(0.9)",
                transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                ✨ cada foto conta uma história
              </p>
            </div>
          </>
        )}

        {/* STEP 3 — Horas grande */}
        {step === 3 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "scale(1)" : "scale(0.8)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              vocês passaram
            </p>
            <h1
              style={{
                fontSize: "clamp(5rem, 22vw, 13rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {totalHoras}
              <span
                style={{
                  fontSize: "clamp(2rem, 8vw, 5rem)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.6)",
                  WebkitTextFillColor: "rgba(255,255,255,0.6)",
                }}
              >
                h
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
                marginTop: "1rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              juntos até agora
            </p>
          </div>
        )}

        {/* Gradiente decorativo de fundo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              step === 0
                ? "radial-gradient(ellipse at center, rgba(236,72,153,0.08) 0%, transparent 70%)"
                : step === 1
                ? "radial-gradient(ellipse at center, rgba(168,85,247,0.1) 0%, transparent 70%)"
                : step === 3
                ? "radial-gradient(ellipse at bottom, rgba(244,114,182,0.12) 0%, transparent 60%)"
                : "transparent",
            pointerEvents: "none",
            zIndex: 0,
            transition: "background 1s ease",
          }}
        />
      </div>

      {/* Keyframes para animação de queda das fotos */}
      <style>{`
        @keyframes pixelFall {
          0%   { top: -14rem; opacity: 0; transform: rotate(${Math.random() * 10 - 5}deg); }
          10%  { opacity: 0.85; }
          90%  { opacity: 0.7; }
          100% { top: 110vh; opacity: 0; }
        }
      `}</style>
    </>
  );
}