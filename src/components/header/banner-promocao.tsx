import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <div style={{
      backgroundColor: "#e687cd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "14px",
      padding: "10px 20px",
      fontFamily: "'Nunito', sans-serif",
      width: "100%",
      boxSizing: "border-box",
      flexWrap: "wrap",
    }}>
      {/* Badge 50% OFF */}
      <div style={{
        backgroundColor: "white",
        color: "#e687cd",
        fontSize: "11px",
        fontWeight: 800,
        padding: "4px 10px",
        borderRadius: "20px",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        flexShrink: 0,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#e687cd" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7h.01M17 17h.01M7.5 17.5l9-11M7 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm10 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" stroke="#e687cd" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        50% OFF
      </div>

      {/* Texto */}
      <div style={{
        color: "white",
        fontSize: "13px",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: "7px",
      }}>
        Apenas hoje — Todos os planos com{" "}
        <strong>50% OFF</strong> de desconto, aproveite!
      </div>

      {/* CTA */}
      <Link
        to="/criar"
        style={{
          color: "white",
          fontSize: "13px",
          fontWeight: 800,
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          flexShrink: 0,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        Criar agora ›
      </Link>
    </div>
  );
}