"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Avaliacao {
  id: number;
  nome: string;
  nota: number;
  descricao: string;
}

const avaliacoes: Avaliacao[] = [
  { id: 1, nome: "Lucas Martins", nota: 5, descricao: "Simplesmente perfeito!" },
  { id: 2, nome: "Ana Souza", nota: 5, descricao: "Experiência emocionante." },
  { id: 3, nome: "Carlos Ribeiro", nota: 5, descricao: "Muito criativo." },
  { id: 4, nome: "Marina Lima", nota: 5, descricao: "Interface linda." },
  { id: 5, nome: "João Pereira", nota: 5, descricao: "Produto nível gringo." },
  { id: 6, nome: "Fernanda Kato", nota: 5, descricao: "Muito intuitivo." },
  { id: 7, nome: "Bruno Teixeira", nota: 5, descricao: "Ideia genial." },
  { id: 8, nome: "Camila Duarte", nota: 5, descricao: "Qualidade absurda." },
];

export function AvaliacoesDeslizando() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % avaliacoes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const item = avaliacoes[current];

  return (
    <div className="w-full h-[80px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 6,
            ease: "linear",
          }}
          className="absolute top-0 flex items-center"
        >
          <div className="w-72 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3 shadow-lg">
            
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                {item.nome[0]}
              </div>

              <span className="text-white text-xs font-semibold">
                {item.nome}
              </span>

              <span className="ml-auto text-yellow-400 text-xs">
                {"★".repeat(item.nota)}
              </span>
            </div>

            <p className="text-white/80 text-xs">
              {item.descricao}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}