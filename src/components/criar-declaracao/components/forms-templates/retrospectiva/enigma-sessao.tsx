import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaHeart, FaLock, FaLockOpen } from "react-icons/fa";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

const CARD_EMOJIS = ["💕", "🌹", "✨", "💫", "🥰", "💎"];

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
    <div className="space-y-6 bg-[#FAFAFA]">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <span className="text-2xl text-black"><IoExtensionPuzzleSharp /></span>
        <div>
          <h3 className="text-black font-bold text-lg leading-tight">Enigma</h3>
          <p className="text-gray-500 text-xs">O que você ama nessa pessoa — revelado aos poucos</p>
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
              className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-black text-sm placeholder:text-gray-400 outline-none focus:border-[#e687cd]"
            />
            <button
              onClick={handleAdd}
              className="bg-[#e687cd] hover:bg-pink-400 text-white px-4 py-2 rounded-xl transition-colors"
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
              ? "border-[#e687cd] bg-[#e687cd]/10 text-[#e687cd]"
              : "border-gray-300 bg-gray-100 text-gray-500 hover:border-gray-400"
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
                      <motion.div
                        key="frente"
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -90 }}
                        transition={{ duration: 0.3 }}
                        className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-[#e687cd]/30 bg-[#e687cd]/10"
                      >
                        <FaLock className="text-[#e687cd]" size={20} />
                        <p className="text-[#e687cd] text-xs font-bold">Toque para revelar</p>
                        <p className="text-gray-400 text-xs"># {idx + 1}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="verso"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-300 bg-gray-100 p-3 text-center"
                      >
                        <span className="text-xl">{CARD_EMOJIS[idx % CARD_EMOJIS.length]}</span>
                        <p className="text-black text-xs font-semibold leading-tight">{item.texto}</p>
                        <FaLockOpen className="text-gray-400" size={10} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
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
                  className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-black text-sm outline-none focus:border-[#e687cd]"
                />
                <button
                  onClick={() => removeEnigmaItem(item.id)}
                  className="text-gray-400 hover:text-[#e687cd] transition-colors shrink-0"
                >
                  <FaTrash size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {data.enigma.length === 0 && (
        <div className="text-center py-8 text-gray-300">
          <FaHeart size={32} className="mx-auto mb-2 text-[#e687cd] opacity-30" />
          <p className="text-sm text-gray-500">Adicione o que você ama nessa pessoa</p>
        </div>
      )}
    </div>
  );
}