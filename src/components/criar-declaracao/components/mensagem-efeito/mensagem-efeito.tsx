import { useEffect, useState } from "react";
import imgLogo from "../../../../img/logo.png";

export function MensagemComEfeitoEscritaRetrospectiva() {
  const texto =
    "Uau seu presente está ficando lindo! Mas ainda dá para transformar em algo inesquecível com a Sessão Retrospectiva.";

  const [textoExibido, setTextoExibido] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTextoExibido(texto.slice(0, i + 1));
      i++;

      if (i === texto.length) clearInterval(interval);
    }, 25); // velocidade da digitação

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-3">
      
      {/* Avatar */}
      <img src={imgLogo} className="w-10 h-10 rounded-full" />

      {/* Balão */}
      <div className="bg-red-500/20 text-white p-3 rounded-2xl rounded-bl-sm shadow-md relative">
        
        {/* Textinho */}
        <h3 className="text-sm leading-relaxed">
          {textoExibido}
          <span className="animate-pulse">|</span>
        </h3>

      </div>
    </div>
  );
}