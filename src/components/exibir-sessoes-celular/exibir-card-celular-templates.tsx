import { useState } from "react";
import { Link } from "react-router-dom";
import videoUltimaSessao from "../../img/video-tela-inicial/video-template-padrao.mp4";
import videoSpotify from "../../img/video-tela-inicial/video-template-spotify.mp4";

const Heart = ({
  size = 32,
  opacity = 0.7,
  style,
}: {
  size?: number;
  opacity?: number;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    style={{ position: "absolute", opacity, pointerEvents: "none", ...style }}
  >
    <path
      d="M16 27S3 19.5 3 11a7 7 0 0 1 13-3.5A7 7 0 0 1 29 11c0 8.5-13 16-13 16z"
      fill="#e687cd"
    />
  </svg>
);

type TemaOpcao = "padrao" | "spotify";

const TEMAS: Record<
  TemaOpcao,
  {
    label: string;
    video: string;
    accentColor: string;
    titulo: React.ReactNode;
    desc: string;
    features: string[];
  }
> = {
  padrao: {
    label: "Padrão",
    video: videoUltimaSessao,
    accentColor: "#e687cd",
    titulo: (
      <>
        Uma declaração <span>inesquecível</span>
      </>
    ),
    desc: "Crie uma página personalizada com fotos, mensagem especial e um contador em tempo real. Simples de criar, impossível de esquecer.",
    features: [
      "Contador em tempo real",
      "Até 4 fotos do casal",
      "Mensagem personalizada",
      "Seção Retrospectiva",
      "QR Code exclusivo",
      "URL personalizada",
    ],
  },
  spotify: {
    label: "Spotify",
    video: videoSpotify,
    accentColor: "#1ED760",
    titulo: (
      <>
        Sua história em <span>modo playlist</span>
      </>
    ),
    desc: "Um tema inspirado no Spotify, com player de música, capa personalizada e retrospectiva do casal — tudo do jeito que vocês já estão acostumados a curtir.",
    features: [
      "Player de música integrado",
      "Até 4 fotos do casal",
      "Mensagem personalizada",
      "Seção Retrospectiva",
      "QR Code exclusivo",
      "URL personalizada",
    ],
  },
};

export default function SecaoTempadrao() {
  const [temaAtivo, setTemaAtivo] = useState<TemaOpcao>("padrao");
  const tema = TEMAS[temaAtivo];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'DM Sans', sans-serif",
        background: "#FAFAFA",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .padrao-wrap {
          border-radius: 28px;
          border: 1px solid rgba(230, 135, 205, 0.25);
          background: white;
          padding: 56px 48px;
          display: flex;
          align-items: center;
          gap: 56px;
          max-width: 920px;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(230,135,205,0.08);
        }
        .padrao-wrap::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(230,135,205,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .padrao-wrap::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(230,135,205,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .padrao-phone-area {
          position: relative;
          flex: 0 0 240px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .padrao-phone-bg {
          position: absolute;
          width: 130px; height: 278px;
          background: #fdf2fb;
          border: 1px solid rgba(230,135,205,0.2);
          border-radius: 22px;
          top: 50%; left: 50%;
        }
        .padrao-phone-bg.left  { transform: translate(-85%, -50%) rotate(-8deg); opacity: 0.5; }
        .padrao-phone-bg.right { transform: translate(-15%, -50%) rotate(8deg); opacity: 0.5; }

        .padrao-phone-frame {
          position: relative;
          width: 200px; height: 350px;
          background: #fdf2fb;
          border-radius: 28px;
          border: 2px solid rgba(230,135,205,0.5);
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 0 0 1px rgba(230,135,205,0.1), 0 20px 50px rgba(230,135,205,0.15);
        }
        .padrao-phone-frame video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .padrao-info-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .padrao-tabs {
          display: inline-flex;
          gap: 6px;
          background: #fdf2fb;
          border: 1px solid rgba(230,135,205,0.3);
          border-radius: 14px;
          padding: 5px;
          width: fit-content;
        }
        .padrao-tab-btn {
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: 10px;
          cursor: pointer;
          color: #9A8A8D;
          transition: background 0.2s, color 0.2s;
        }
        .padrao-tab-btn.active {
          background: var(--accent-color);
          color: #fff;
        }

        .padrao-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 900;
          color: #1a1a1a;
          line-height: 1.1;
        }
        .padrao-title span {
          color: var(--accent-color);
        }

        .padrao-desc {
          font-size: 15px;
          color: #9A8A8D;
          line-height: 1.7;
          max-width: 400px;
        }

        .padrao-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .padrao-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #555;
          font-weight: 500;
        }
        .padrao-feature-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent-color);
          flex-shrink: 0;
        }

        .padrao-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent-color);
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 28px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          width: fit-content;
          transition: background 0.2s, transform 0.1s;
          text-decoration: none;
          letter-spacing: 0.01em;
        }
        .padrao-cta-btn:hover  { opacity: 0.9; transform: scale(1.02); }
        .padrao-cta-btn:active { transform: scale(0.97); }
        .padrao-cta-arrow {
          width: 22px; height: 22px;
          background: rgba(255,255,255,0.2);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
        }

        @media (max-width: 700px) {
          .padrao-wrap {
            flex-direction: column;
            padding: 32px 24px;
            gap: 32px;
          }
          .padrao-phone-area { flex: unset; width: 100%; height: 340px; }
          .padrao-title { font-size: 28px; }
        }
      `}</style>

      {/* Título da seção */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: "#1a1a1a", fontFamily: "'Playfair Display', serif" }}>
          Conheça os <span style={{ color: "#e687cd" }}>Temas</span>
        </h1>
        <p style={{ color: "#9A8A8D", fontSize: "16px", marginTop: "10px" }}>
          Simples, elegante e cheio de amor. Escolha o estilo perfeito para a sua declaração.
        </p>
      </div>

      <div
        className="padrao-wrap"
        style={{ ["--accent-color" as string]: tema.accentColor }}
      >

        {/* ===== LEFT: PHONE MOCKUP ===== */}
        <div className="padrao-phone-area">
          <Heart size={34} style={{ top: 16, left: 2, transform: "rotate(-15deg)" }} opacity={0.5} />
          <Heart size={42} style={{ top: 0, right: 14, transform: "rotate(10deg)" }} opacity={0.4} />
          <Heart size={26} style={{ bottom: 58, left: -2, transform: "rotate(-20deg)" }} opacity={0.35} />
          <Heart size={30} style={{ bottom: 20, right: 4, transform: "rotate(12deg)" }} opacity={0.45} />

          <div className="padrao-phone-bg left" />
          <div className="padrao-phone-bg right" />

          <div className="padrao-phone-frame">
            <video key={tema.video} src={tema.video} autoPlay loop muted playsInline />
          </div>
        </div>

        {/* ===== RIGHT: INFO ===== */}
        <div className="padrao-info-area">

          <div className="padrao-tabs">
            {(Object.keys(TEMAS) as TemaOpcao[]).map((chave) => (
              <button
                key={chave}
                type="button"
                onClick={() => setTemaAtivo(chave)}
                className={`padrao-tab-btn ${temaAtivo === chave ? "active" : ""}`}
              >
                {TEMAS[chave].label}
              </button>
            ))}
          </div>

          <h2 className="padrao-title">{tema.titulo}</h2>

          <p className="padrao-desc">{tema.desc}</p>

          <div className="padrao-features">
            {tema.features.map((f) => (
              <div key={f} className="padrao-feature-item">
                <div className="padrao-feature-dot" />
                {f}
              </div>
            ))}
          </div>

          <Link to="/criar" className="padrao-cta-btn">
            Criar meu presente
          </Link>
        </div>
      </div>
    </div>
  );
}