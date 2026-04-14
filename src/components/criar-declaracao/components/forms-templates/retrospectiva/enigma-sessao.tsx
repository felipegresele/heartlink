// ============================================================
// SEÇÃO — EnigmaSection
// Cartões misteriosos que revelam o que o usuário ama na outra pessoa
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaHeart, FaLock, FaLockOpen } from "react-icons/fa";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

// Emojis decorativos para os cards
const CARD_EMOJIS = ["💕", "🌹", "✨", "💫", "🌸", "💎"];

export function EnigmaSection() {
  const {
    data,
    addEnigmaItem,
    updateEnigmaItem,
    removeEnigmaItem,
    toggleEnigmaRevelado,
  } = useRetrospective();

  const [novoItem, setNovoItem] = useState("");
  const [erro, setErro] = useState("");
  const [modoVisualizacao, setModoVisualizacao] = useState(false);

  const cheio = data.enigma.length >= LIMITS.enigma;

  function handleAdd() {
    if (!novoItem.trim()) { setErro("Escreva o que você ama nela/nele."); return; }
    const ok = addEnigmaItem(novoItem.trim());
    if (!ok) { setErro("Limite de 6 itens atingido."); return; }
    setNovoItem("");
    setErro("");
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <span className="text-2xl"><IoExtensionPuzzleSharp /></span>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">Enigma</h3>
          <p className="text-white/40 text-xs">O que você ama nessa pessoa — revelado aos poucos</p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.enigma.length} maximo={LIMITS.enigma} />
        </div>
      </div>

      {/* Formulário */}
      {!cheio && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: Sua forma de rir, sua coragem…"
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-red-400"
            />
            <button
              onClick={handleAdd}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <FaPlus size={14} />
            </button>
          </div>
          {erro && <p className="text-red-400 text-xs">{erro}</p>}
        </div>
      )}

      {/* Toggle modo visualização / edição */}
      {data.enigma.length > 0 && (
        <button
          onClick={() => setModoVisualizacao((v) => !v)}
          className={`w-full text-xs font-bold py-2 rounded-xl transition-all border ${
            modoVisualizacao
              ? "border-red-500 bg-red-500/10 text-red-400"
              : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
          }`}
        >
          {modoVisualizacao ? "✏️ Modo Edição" : "👀 Pré-visualizar como o destinatário verá"}
        </button>
      )}

      {/* Modo visualização — cards interativos */}
      {modoVisualizacao ? (
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {data.enigma.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="relative"
              >
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleEnigmaRevelado(item.id)}
                >
                  <AnimatePresence mode="wait">
                    {!item.revelado ? (
                      // Frente — oculto
                      <motion.div
                        key="frente"
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -90 }}
                        transition={{ duration: 0.3 }}
                        className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-red-500/30 bg-gradient-to-br from-red-900/40 to-purple-900/40"
                      >
                        <FaLock className="text-red-400" size={20} />
                        <p className="text-red-300 text-xs font-bold">Toque para revelar</p>
                        <p className="text-white/20 text-xs"># {idx + 1}</p>
                      </motion.div>
                    ) : (
                      // Verso — revelado
                      <motion.div
                        key="verso"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/20 bg-white/5 p-3 text-center"
                      >
                        <span className="text-xl">{CARD_EMOJIS[idx % CARD_EMOJIS.length]}</span>
                        <p className="text-white text-xs font-semibold leading-tight">{item.texto}</p>
                        <FaLockOpen className="text-white/20" size={10} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Modo edição — lista */
        <div className="space-y-2">
          <AnimatePresence>
            {data.enigma.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-3"
              >
                <span className="text-lg shrink-0">{CARD_EMOJIS[idx % CARD_EMOJIS.length]}</span>
                <input
                  type="text"
                  value={item.texto}
                  onChange={(e) => updateEnigmaItem(item.id, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-red-400"
                />
                <button
                  onClick={() => removeEnigmaItem(item.id)}
                  className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                >
                  <FaTrash size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {data.enigma.length === 0 && (
        <div className="text-center py-8 text-white/20">
          <FaHeart size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Adicione o que você ama nessa pessoa</p>
        </div>
      )}
    </div>
  );
}