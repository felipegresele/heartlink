import { useState } from "react";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { IoStar } from "react-icons/io5";
import { LimiteBadge } from "./limit-bagde";
import { FaPlus, FaTrash } from "react-icons/fa6";
import type { StarMemory } from "./star-memory-preview";
import StarMemoryPreview from "./star-memory-preview";

export default function RainStarSection() {
  const {
    data,
    addStarItem,
    updateStarItem,
    removeStarItem,
    toggleStarRevelado,
  } = useRetrospective();

  const [novoItem, setNovoItem] = useState("");
  const [erro, setErro] = useState("");

  const cheio = data?.rainStar.length >= LIMITS.rainStar;

  function handleAdd() {
    if (!novoItem.trim()) {
      setErro("Escreva algo para surpreender ela/ela.");
      return;
    }
    const ok = addStarItem(novoItem.trim());
    if (!ok) {
      setErro("Limite de 4 itens atingidos");
      return;
    }
    setNovoItem("");
    setErro("");
  }

  const stars:StarMemory[] = (data?.rainStar ?? []).map((item) => ({
    id: item.id,
    message: item.message,
    unlocked: item.unlocked,
  }))

  return (
    <div className="space-y-6 bg-[#FAFAFA]">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-black">
          <IoStar />
        </span>
        <div>
          <h3 className="text-black font-bold text-lg leading-tight">
            Memoria Estrelada
          </h3>
          <p className="text-gray-500 text-xs">
            Cada estrela guarda uma lembrança especial da história de vocês
          </p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.rainStar.length} maximo={LIMITS.rainStar} />
        </div>
      </div>

      <StarMemoryPreview stars={stars} />

      {/* Botão adicionar */}
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

      {/* Lista de gerenciamento (editar / revelar / remover) */}
      {data?.rainStar?.length > 0 && (
        <ul className="space-y-2">
          {data.rainStar.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2"
            >
              <input
                type="text"
                value={item.message}
                onChange={(e) => updateStarItem(item.id, e.target.value)}
                className="flex-1 bg-transparent text-black text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => toggleStarRevelado(item.id)}
                className="text-xs text-gray-500 hover:text-[#e687cd]"
              >
                {item.unlocked ? "Ocultar" : "Revelar"}
              </button>
              <button
                type="button"
                onClick={() => removeStarItem(item.id)}
                className="text-red-400 hover:text-red-500"
                aria-label="Remover item"
              >
                <FaTrash size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

