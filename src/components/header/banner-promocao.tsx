import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <>
      <style>{`
        .promo-banner {
          background-color: #e687cd;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 10px 20px;
          font-family: 'Nunito', sans-serif;
          width: 100%;
          box-sizing: border-box;
        }

        .promo-badge {
          background-color: white;
          color: #e687cd;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .promo-text {
          color: white;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .promo-cta {
          color: white;
          font-size: 13px;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }

        .promo-cta:hover {
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .promo-banner {
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px 16px;
          }

          .promo-text {
            white-space: normal;
            text-align: center;
            font-size: 12px;
            line-height: 1.5;
          }

          .promo-cta {
            font-size: 12px;
            margin-top: 2px;
          }
        }
      `}</style>

      <div className="promo-banner">
        {/* Badge */}
        <div className="promo-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#e687cd" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 7h.01M17 17h.01M7.5 17.5l9-11M7 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" stroke="#e687cd" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          50% OFF
        </div>

        {/* Texto + CTA na mesma linha no mobile */}
        <div className="promo-text">
          Apenas hoje — Todos os planos com <strong>50% OFF</strong> de desconto, aproveite!
        </div>

        <Link to="/criar" className="promo-cta">
          Criar agora ›
        </Link>
      </div>
    </>
  );
}