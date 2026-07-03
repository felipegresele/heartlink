import React from "react";

const ITEMS = [
  { text: "4.9 avaliação média" },
  { text: "Atendimento humano" },
  { text: "Pronto em poucos minutos" },
  { text: "Pagamento 100% seguro" },
  { text: "+3 mil telas de presente criadas" },
  { text: "Feito com carinho pela Heart Code" },
];

function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.55)",
        flex: "0 0 auto",
      }}
    />
  );
}

function TrackContent() {
  return (
    <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
      {ITEMS.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 28px",
                flex: "0 0 auto",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.01em",
                }}
              >
                {item.text}
              </span>
            </div>
            <Dot />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function HeartCodeTrustBar() {
  return (
    <div
      style={{
        width: "100%",
        background: "#e687cd",
        borderRadius: 999,
        marginTop: 20,
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 14px rgba(230, 135, 205, 0.35)",
      }}
    >
      <style>{`
        @keyframes hc-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hc-marquee-track {
          animation: hc-marquee 22s linear infinite;
        }
        .hc-marquee-wrapper:hover .hc-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .hc-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* fade edges */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 48,
          background: "linear-gradient(to right, #e687cd, rgba(230,135,205,0))",
          zIndex: 2,
        }}
      />
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 48,
          background: "linear-gradient(to left, #e687cd, rgba(230,135,205,0))",
          zIndex: 2,
        }}
      />

      <div className="hc-marquee-wrapper" style={{ overflow: "hidden" }}>
        <div className="hc-marquee-track" style={{ display: "flex", width: "max-content" }}>
          <TrackContent />
          <TrackContent />
        </div>
      </div>
    </div>
  );
}