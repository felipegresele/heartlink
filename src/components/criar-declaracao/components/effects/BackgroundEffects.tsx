export type EffectType = "none" | "coracoes" | "estrelas" | "nuvens" | "gradiente" | "grid";

interface Props {
  effect: EffectType;
}

export default function BackgroundEffects({ effect }: Props) {
  if (effect === "none") return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* EFEITO: CORAÇÕES CAINDO */}
      {effect === "coracoes" && (
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-500/30 animate-float-down"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* EFEITO: GRADIENTE ANIMADO */}
      {effect === "gradiente" && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20 animate-gradient-slow bg-[length:400%_400%]" />
      )}

      {/* EFEITO: ESTRELAS PISCANDO */}
      {effect === "estrelas" && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse opacity-30"
              style={{
                width: '2px',
                height: '2px',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* EFEITO: GRID FUTURISTA */}
      {effect === "grid" && (
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
      )}
    </div>
  );
}