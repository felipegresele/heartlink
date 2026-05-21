import { useState, type JSX } from "react";
import videoLinhaTempo from "../../img/retrospectiva-sessao/video-linha-tempo.mp4";
import videoGaleria from "../../img/retrospectiva-sessao/video-galeria.mp4";
import videoRoleta from "../../img/retrospectiva-sessao/video-roleta.mp4"
import videoEnigma from "../../img/retrospectiva-sessao/video-enigma.mp4";
import videoIntroducao from "../../img/retrospectiva-sessao/video-introducao.mp4";
import videoUltimaSessao from "../../img/retrospectiva-sessao/video-ultima-tela.mp4";
import { Link } from "react-router-dom";

interface Section {
  id: string;
  label: string;
  title: string;
  description: string;
  video: string;
  icon: JSX.Element;
}

const CameraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="14" rx="3" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8 6l1.5-3h5L16 6" />
  </svg>
);

const TimelineIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="6" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="18" cy="12" r="2" fill="currentColor" />
    <line x1="6" y1="8" x2="6" y2="10" />
    <line x1="12" y1="8" x2="12" y2="10" />
    <line x1="18" y1="8" x2="18" y2="10" />
  </svg>
);

const RouletteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="3" x2="12" y2="12" />
    <line x1="12" y1="12" x2="18" y2="16" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const EnigmaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" strokeLinecap="round" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const IntroIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
  </svg>
);

const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
  </svg>
);

const sections: Section[] = [
  {
    id: "introducao",
    label: "Introdução Animada",
    title: "Introdução Animada",
    description: "O começo de tudo. Uma abertura cinematográfica que mergulha você com a pessoa presenteada em uma experiência inesquecível, preparando o coração para o que vem a seguir.",
    video: videoIntroducao,
    icon: <IntroIcon />,
  },
  {
    id: "galeria",
    label: "Galeria de Imagens",
    title: "Galeria de Imagens",
    description: "Transforme suas fotos favoritas em uma galeria de arte digital. Conte a história de seus momentos de uma forma visualmente deslumbrante.",
    video: videoGaleria,
    icon: <CameraIcon />,
  },
  {
    id: "linha-tempo",
    label: "Linha do Tempo",
    title: "Linha do Tempo",
    description: "Cada data marcada, cada capítulo vivido. Reviva a jornada do casal em uma linha do tempo interativa cheia de memórias e emoções.",
    video: videoLinhaTempo,
    icon: <TimelineIcon />,
  },
  {
    id: "roleta",
    label: "Roleta",
    title: "Roleta dos Momentos",
    description: "Uma surpresa a cada giro! A roleta sorteia memórias especiais do casal de forma lúdica e divertida, tornando cada revelação única.",
    video: videoRoleta,
    icon: <RouletteIcon />,
  },
  {
    id: "enigma",
    label: "Enigma",
    title: "Enigma do Amor",
    description: "Quem conhece melhor o outro? Desafios e perguntas que revelam o quanto dois corações estão conectados. Um jogo cheio de cumplicidade.",
    video: videoEnigma,
    icon: <EnigmaIcon />,
  },
  {
    id: "ultima-sessao",
    label: "Última Tela",
    title: "Última Tela",
    description: "O grand finale. Uma tela de encerramento emocionante que resume tudo o que foi vivido e deixa uma mensagem eterna de amor.",
    video: videoUltimaSessao,
    icon: <StarIcon />,
  },
];

const Heart = ({ size = 32, opacity = 0.7, style }: { size?: number; opacity?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ position: "absolute", opacity, pointerEvents: "none", ...style }}>
    <path d="M16 27S3 19.5 3 11a7 7 0 0 1 13-3.5A7 7 0 0 1 29 11c0 8.5-13 16-13 16z" fill="#C41E31" />
  </svg>
);

export default function ExibirCardCelularesTelaInicial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sections[activeIndex];

  const prev = () => setActiveIndex((i) => (i - 1 + sections.length) % sections.length);
  const next = () => setActiveIndex((i) => (i + 1) % sections.length);

  return (
    <div className="retro-outer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .retro-outer {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 110px;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          width: 100%;
        }

        .retro-section-wrap {
          border-radius: 28px;
          border: 1px solid rgba(232,37,58,0.18);
          padding: 56px 48px;
          display: flex;
          align-items: center;
          gap: 56px;
          max-width: 920px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .retro-section-wrap::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(232,37,58,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .retro-section-wrap::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(232,37,58,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .phone-area {
          position: relative;
          flex: 0 0 240px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phone-bg {
          position: absolute;
          width: 130px; height: 278px;
          background: #1F1519;
          border: 1px solid rgba(232,37,58,0.12);
          border-radius: 22px;
          top: 50%; left: 50%;
        }
        .phone-bg.left  { transform: translate(-85%, -50%) rotate(-8deg); opacity: 0.5; }
        .phone-bg.right { transform: translate(-15%, -50%) rotate(8deg); opacity: 0.5; }

        .phone-frame {
          position: relative;
          width: 200px; height: 350px;
          background: #0a0608;
          border-radius: 28px;
          border: 2px solid #e687cd;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 0 0 1px rgba(232,37,58,0.08), 0 20px 50px rgba(0,0,0,0.7);
        }
        .phone-frame video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .arrow-btn {
          position: absolute;
          z-index: 3;
          top: 50%;
          transform: translateY(-50%);
          width: 32px; height: 32px;
          background: #1F1519;
          border: 1px solid rgba(232,37,58,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #e687cd;
          font-size: 14px;
          transition: background 0.2s, border-color 0.2s;
          user-select: none;
        }
        .arrow-btn:hover { background: rgba(232,37,58,0.15); border-color: #d297dd; }
        .arrow-btn.left  { left: -8px; }
        .arrow-btn.right { right: -8px; }

        .info-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .icon-circle {
          width: 52px; height: 52px;
          background: rgba(232,37,58,0.12);
          border: 1.5px solid #e687cd;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #e687cd;
        }

        .info-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 900;
          color: #F5F0F1;
          line-height: 1.1;
        }
        .info-title span { color: #e687cd; }

        .info-desc {
          font-size: 15px;
          color: #9A8A8D;
          line-height: 1.7;
          max-width: 400px;
        }

        .tabs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tab-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #e687cd;
          background: transparent;
          color: #9A8A8D;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tab-btn:hover {
          border-color: #e687cd;
          color: #e687cd;
          background: rgba(232,37,58,0.08);
        }
        .tab-btn.active {
          border-color: #e687cd;
          background: #e687cd;
          color: #fff;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #e687cd;
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
          letter-spacing: 0.01em;
          text-decoration: none;
        }
        .cta-btn:hover  { background: rgb(212, 105, 199); transform: scale(1.02); }
        .cta-btn:active { transform: scale(0.97); }

        /* ── MOBILE ── */
        @media (max-width: 700px) {
          .retro-outer {
            padding: 16px 12px;
            align-items: flex-start;
          }

          .retro-section-wrap {
            flex-direction: column;
            padding: 28px 16px;
            gap: 28px;
          }

          .phone-area {
            flex: unset;
            width: 100%;
            height: 400px;
          }

          .phone-frame {
            width: 220px;
            height: 390px;
          }

          .phone-bg {
            width: 155px;
            height: 310px;
          }

          .arrow-btn {
            width: 38px;
            height: 38px;
            font-size: 18px;
          }
          .arrow-btn.left  { left: 0px; }
          .arrow-btn.right { right: 0px; }

          .info-title { font-size: 28px; }

          .info-area {
            align-items: center;
            text-align: center;
            width: 100%;
          }

          .info-desc {
            text-align: center;
            max-width: 100%;
          }

          .tabs-row { justify-content: center; }

          .cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="retro-section-wrap">
        {/* ===== LEFT: PHONE MOCKUP ===== */}
        <div className="phone-area">
          <Heart size={34} style={{ top: 16, left: 2, transform: "rotate(-15deg)" }} opacity={0.65} />
          <Heart size={42} style={{ top: 0, right: 14, transform: "rotate(10deg)" }} opacity={0.5} />
          <Heart size={26} style={{ bottom: 58, left: -2, transform: "rotate(-20deg)" }} opacity={0.45} />
          <Heart size={30} style={{ bottom: 20, right: 4, transform: "rotate(12deg)" }} opacity={0.55} />

          <div className="phone-bg left" />
          <div className="phone-bg right" />

          <div className="phone-frame">
            <video key={active.video} src={active.video} autoPlay loop muted playsInline />
          </div>

          <button className="arrow-btn left" onClick={prev}>‹</button>
          <button className="arrow-btn right" onClick={next}>›</button>
        </div>

        {/* ===== RIGHT: INFO ===== */}
        <div className="info-area">
          <div className="icon-circle">{active.icon}</div>

          <h2 className="info-title">
            {active.title.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i}>{word}</span>
              ) : (
                <span key={i} style={{ color: "#000000" }}>{word} </span>
              )
            )}
          </h2>

          <p className="info-desc">{active.description}</p>

          <div className="tabs-row">
            {sections.map((s, i) => (
              <button
                key={s.id}
                className={`tab-btn${i === activeIndex ? " active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <Link to="/criar" className="cta-btn">
            Criar meu presente
          </Link>
        </div>
      </div>
    </div>
  );
}