import { motion } from "framer-motion";

export type EffectType = "none" | "coracoes" | "estrelas" | "pontinhos" | "aurora" | "custom" | "gradiente";

interface Props {
  effect: EffectType;
  customEmojis?: string;
}

export default function BackgroundEffects({ effect, customEmojis }: Props) {
  if (effect === "none") return null;

  const renderParticles = (content: any[], count: number, isEmoji: boolean = true) => {
    return Array.from({ length: count }).map((_, i) => {
      const char = content[i % content.length];
      const randomX = Math.random() * 100;
      const duration = Math.random() * 6 + 6;
      const delay = Math.random() * 10;
      const size = Math.random() * (20 - 12) + 12;

      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "-10%", x: `${randomX}%` }}
          animate={{ opacity: [0, 0.4, 0.4, 0], y: "115%" }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay }}
          className="absolute select-none"
          style={{ 
            fontSize: isEmoji ? `${size}px` : undefined,
            left: 0,
            top: 0 
          }}
        >
          {char}
        </motion.div>
      );
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full">
      {/* 1. CORAÇÕES */}
      {effect === "coracoes" && renderParticles(["❤️", "💖"], 30)}

      {/* 2. ESTRELAS (Brancas) */}
      {effect === "estrelas" && Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full shadow-[0_0_3px_white]"
          style={{
            width: "2px",
            height: "2px",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
        />
      ))}

      {/* 3. PONTINHOS COLORIDOS (Substituindo o Grid) */}
      {effect === "pontinhos" && Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: Math.random() * 4 + 2, repeat: Infinity }}
        />
      ))}

      {/* 4. CUSTOM EMOJIS */}
      {effect === "custom" && renderParticles(
        customEmojis ? customEmojis.split(",") : ["✨", "🌸", "☁️"], 
        20
      )}

      {/* 5. AURORA */}
      {effect === "aurora" && (
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(45deg, #00d2ff, #92fe9d, #00d2ff)",
            backgroundSize: "400% 400%"
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}