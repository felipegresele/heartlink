import { motion } from "framer-motion";
 
interface LimiteBadgeProps {
  atual: number;
  maximo: number;
}
 
export function LimiteBadge({ atual, maximo }: LimiteBadgeProps) {
  const cheio = atual >= maximo;
  return (
    <motion.span
      key={atual}
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
        cheio
          ? "bg-red-500/20 text-red-400 border border-red-500/40"
          : "bg-white/10 text-white/50"
      }`}
    >
      {atual}/{maximo}
    </motion.span>
  );
}
 