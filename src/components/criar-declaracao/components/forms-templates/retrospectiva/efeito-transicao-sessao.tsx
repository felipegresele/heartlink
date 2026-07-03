// ============================================================
// COMPONENTE — SpotifySingleScreen (Spotify Wrapped Intro)
// Intro animada estilo Spotify Wrapped com efeito de barras (equalizer)
// ============================================================
import { useEffect, useRef, useState, useCallback } from "react";

// ── Tipos ─────────────────────────────────────────────────────
type Props = {
  senderName: string;
  totalDias: number;
  totalHoras: number;
  fotos: string[];
  brandName?: string;
  onFinish?: () => void;
};

// ── Utilitário: posições aleatórias estáveis por índice ───────
function stableRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ── Utilitários de cor (interpolação borda → centro) ──────────
interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function mixColor(edgeRgb: Rgb, centerRgb: Rgb, intensity: number): string {
  const r = Math.round(edgeRgb.r + (centerRgb.r - edgeRgb.r) * intensity);
  const g = Math.round(edgeRgb.g + (centerRgb.g - edgeRgb.g) * intensity);
  const b = Math.round(edgeRgb.b + (centerRgb.b - edgeRgb.b) * intensity);
  return `rgb(${r}, ${g}, ${b})`;
}

function colorForColumn(
  i: number,
  total: number,
  edgeColor: string,
  centerColor: string
): string {
  const edgeRgb = hexToRgb(edgeColor);
  const centerRgb = hexToRgb(centerColor);
  const center = (total - 1) / 2;
  const dist = Math.abs(i - center) / center;
  const intensity = 1 - Math.pow(dist, 1.4);
  return mixColor(edgeRgb, centerRgb, intensity);
}

// ── Constantes do efeito de barras ─────────────────────────────
const BAR_WIDTH = 14;
const BAR_EDGE_COLOR = "#280000";
const BAR_CENTER_COLOR = "#ff2020";
const ENTER_DURATION = 0.9; // segundos
const EXIT_DURATION = 0.7; // segundos

// ── Canvas de Barras (substitui o antigo PixelCanvas) ──────────
interface BarsCanvasProps {
  phase: "enter" | "exit" | "idle";
  onEnterDone?: () => void;
  onExitDone?: () => void;
}

interface Bar {
  x: number;
  width: number;
  delay: number;
  color: string;
}

function BarsCanvas({ phase, onEnterDone, onExitDone }: BarsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(-1);
  const phaseRef = useRef<"enter" | "exit" | "idle">(phase);
  const callbackFiredRef = useRef<boolean>(false);
  const barsRef = useRef<Bar[]>([]);
  const onEnterDoneRef = useRef<(() => void) | undefined>(onEnterDone);
  const onExitDoneRef = useRef<(() => void) | undefined>(onExitDone);
  const drawRef = useRef<((timestamp: number) => void) | null>(null);

  // Atualiza refs de callback sem recriar nada
  useEffect(() => {
    onEnterDoneRef.current = onEnterDone;
  }, [onEnterDone]);

  useEffect(() => {
    onExitDoneRef.current = onExitDone;
  }, [onExitDone]);

  // Resize do canvas — roda apenas uma vez
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

  // Loop de animação — atribuído direto na ref, nunca recriado via useCallback
  drawRef.current = (timestamp: number): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (startTimeRef.current < 0) startTimeRef.current = timestamp;

    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const isEntering = phaseRef.current === "enter";
    const totalDuration = isEntering ? ENTER_DURATION : EXIT_DURATION;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let allDone = true;

    for (const bar of barsRef.current) {
      const availableTime = totalDuration - bar.delay;
      const t =
        availableTime <= 0
          ? 1
          : Math.min(1, Math.max(0, (elapsed - bar.delay) / availableTime));

      if (t < 1) allDone = false;

      const eased = isEntering ? 1 - Math.pow(1 - t, 3) : Math.pow(t, 3);
      const height = isEntering
        ? canvas.height * eased
        : canvas.height * (1 - eased);

      if (height > 0.5) {
        ctx.fillStyle = bar.color;
        ctx.fillRect(bar.x, canvas.height - height, bar.width, height);
      }
    }

    if (!allDone) {
      // Wrapper evita passar drawRef.current diretamente (poderia mudar entre frames)
      animRef.current = requestAnimationFrame((ts) => drawRef.current?.(ts));
    } else {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;

      if (!callbackFiredRef.current) {
        callbackFiredRef.current = true;
        if (phaseRef.current === "enter") onEnterDoneRef.current?.();
        if (phaseRef.current === "exit") onExitDoneRef.current?.();
      }
    }
  };

  // Reage a mudanças de phase — único efeito que controla o ciclo
  useEffect(() => {
    phaseRef.current = phase;

    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
    }

    if (phase === "idle") {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const cols = Math.ceil(canvas.width / BAR_WIDTH);

    barsRef.current = Array.from<unknown, Bar>(
      { length: cols },
      (_, i) => ({
        x: i * BAR_WIDTH,
        width: BAR_WIDTH,
        // atraso escalonado esquerda → direita, com um pouco de ruído orgânico
        delay: (i / cols) * 0.4 + stableRandom(i * 5) * 0.15,
        color: colorForColumn(i, cols, BAR_EDGE_COLOR, BAR_CENTER_COLOR),
      })
    );

    startTimeRef.current = -1;
    callbackFiredRef.current = false;

    animRef.current = requestAnimationFrame((ts) => drawRef.current?.(ts));

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    };
  }, [phase]);

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
  brandName = "HEARTZZU",
  onFinish,
}: Props) {
  // step 0 = marca · 1 = nome · 2 = dias · 3 = fotos · 4 = horas
  const [step, setStep] = useState<number | "exiting" | "done">(0);
  const [barsPhase, setBarsPhase] = useState<"enter" | "exit" | "idle">("idle");
  const [contentVisible, setContentVisible] = useState(false);

  // ── Flag que autoriza o timer do step a rodar ─────────────────
  // O timer só começa DEPOIS que onEnterDone for chamado,
  // evitando que um novo ciclo de barras seja disparado antes
  // do step atual ter terminado de aparecer.
  const [stepReady, setStepReady] = useState(false);

  const STEP_DURATIONS = [1800, 2000, 2000, 3000, 3000];
  const TOTAL_STEPS = 4; // steps 0 (marca), 1, 2, 3, 4

  // Dispara o efeito de entrada apenas uma vez ao montar
  useEffect(() => {
    setBarsPhase("enter");
  }, []);

  // Barras entraram → mostra conteúdo E marca step como pronto
  const handleEnterDone = useCallback(() => {
    setBarsPhase("idle");
    setContentVisible(true);
    setStepReady(true); // ← libera o timer do step
  }, []);

  // Barras saíram → chama onFinish
  const handleExitDone = useCallback(() => {
    setStep("done");
    onFinish?.();
  }, [onFinish]);

  // Timer de duração do step — só executa quando stepReady === true
  useEffect(() => {
    if (typeof step !== "number") return;
    if (!stepReady) return; // ← aguarda barras terminarem de entrar

    const duration = STEP_DURATIONS[step] ?? 2000;

    const timer = setTimeout(() => {
      // Reseta o flag antes de iniciar a próxima transição
      setStepReady(false);
      setContentVisible(false);

      const nextStep = step + 1;

      if (nextStep > TOTAL_STEPS) {
        // Todos os steps exibidos — inicia animação de saída
        setStep("exiting");
        setBarsPhase("exit");
      } else {
        // Avança para o próximo step e dispara barras de entrada
        // O step muda ANTES das barras, para que o conteúdo correto
        // seja renderizado quando onEnterDone for chamado.
        setStep(nextStep);
        // Pequeno delay para garantir que o React renderizou o novo step
        // antes de iniciar a animação de entrada.
        setTimeout(() => {
          setBarsPhase("enter");
        }, 50);
      }
    }, duration);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepReady]);

  // Safety timeout: garante que onFinish é sempre chamado mesmo se a animação
  // de saída travar ou não completar
  useEffect(() => {
    if (step !== "exiting") return;
    const safetyTimer = setTimeout(() => {
      onFinish?.();
    }, 2500);
    return () => clearTimeout(safetyTimer);
  }, [step, onFinish]);

  if (step === "done") return null;

  return (
    <>
      <BarsCanvas
        phase={barsPhase}
        onEnterDone={handleEnterDone}
        onExitDone={handleExitDone}
      />

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
        {/* STEP 0 — Marca */}
        {step === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 10vw, 5rem)",
                letterSpacing: "2px",
                color: "#ff1f1f",
                textShadow:
                  "0 0 12px rgba(255, 20, 20, 0.85), 0 0 32px rgba(255, 0, 0, 0.55), 0 0 64px rgba(255, 0, 0, 0.35)",
                transform: "skewX(-6deg)",
              }}
            >
              {brandName}
            </span>
          </div>
        )}

        {/* STEP 1 — Nome do casal + frase */}
        {step === 1 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible
                ? "translateY(0) scale(1)"
                : "translateY(24px) scale(0.95)",
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
              Sua retrospectiva
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
              Os momentos que mais marcaram
            </p>
          </div>
        )}

        {/* STEP 2 — Dias */}
        {step === 2 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible
                ? "translateY(0) scale(1)"
                : "translateY(24px) scale(0.95)",
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
              Histórias e Memórias
            </p>
          </div>
        )}

        {/* STEP 3 — Fotos caindo */}
        {step === 3 && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.72)",
                zIndex: 1,
              }}
            />

            {fotos.length > 0 ? (
              fotos.map((foto, i) => (
                <img
                  key={i}
                  src={foto}
                  alt=""
                  style={{
                    position: "absolute",
                    top: "-12rem",
                    left: `${stableRandom(i * 17) * 80 + 5}%`,
                    width: "clamp(120px, 18vw, 180px)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    opacity: contentVisible ? 0.85 : 0,
                    animation: contentVisible
                      ? `pixelFall ${2.5 + stableRandom(i * 3) * 1.5}s ease-in forwards`
                      : "none",
                    animationDelay: `${stableRandom(i * 11) * 0.8}s`,
                    zIndex: 0,
                    objectFit: "cover",
                    aspectRatio: "1/1",
                  }}
                />
              ))
            ) : (
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
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      marginTop: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    memórias guardadas no coração
                  </p>
                </div>
              </div>
            )}

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
                Cada foto conta uma história
              </p>
            </div>
          </>
        )}

        {/* STEP 4 — Horas grande */}
        {step === 4 && (
          <div
            style={{
              textAlign: "center",
              padding: "0 2rem",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "scale(1)" : "scale(0.8)",
              transition:
                "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
                ? "radial-gradient(ellipse at center, rgba(255,32,32,0.10) 0%, transparent 70%)"
                : step === 1
                ? "radial-gradient(ellipse at center, rgba(236,72,153,0.08) 0%, transparent 70%)"
                : step === 2
                ? "radial-gradient(ellipse at center, rgba(168,85,247,0.1) 0%, transparent 70%)"
                : step === 4
                ? "radial-gradient(ellipse at bottom, rgba(244,114,182,0.12) 0%, transparent 60%)"
                : "transparent",
            pointerEvents: "none",
            zIndex: 0,
            transition: "background 1s ease",
          }}
        />
      </div>

      <style>{`
        @keyframes pixelFall {
          0%   { top: -14rem; opacity: 0; transform: rotate(-3deg); }
          10%  { opacity: 0.85; }
          90%  { opacity: 0.7; }
          100% { top: 110vh; opacity: 0; }
        }
      `}</style>
    </>
  );
}