import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTrash,
  FaPencilAlt,
  FaCheck,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";
import { useRetrospective } from "./restrospective-context";
import { UploadImagemTimeline } from "../img-cloudnary/upload-imagem-timeline";
import { FiClock } from "react-icons/fi";

interface ItemFormState {
  titulo: string;
  descricao: string;
  imagem: string;
}

const EMPTY_FORM: ItemFormState = { titulo: "", descricao: "", imagem: "" };

// Alternates rotation for polaroid feel
const ROTATIONS = ["-3deg", "2.5deg", "-2deg", "3deg", "-1.5deg", "2deg"];

export function TimelineSection() {
  const { data, addTimelineItem, updateTimelineItem, removeTimelineItem } =
    useRetrospective();

  const [form, setForm] = useState<ItemFormState>(EMPTY_FORM);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ItemFormState>(EMPTY_FORM);
  const [erro, setErro] = useState("");

  const cheio = data.timeline.length >= LIMITS.timeline;

  function handleAdd() {
    if (!form.titulo.trim()) {
      setErro("O título é obrigatório.");
      return;
    }
    if (!form.imagem) {
      setErro("Adicione uma imagem.");
      return;
    }
    const ok = addTimelineItem(form);
    if (!ok) {
      setErro("Limite de 6 momentos atingido.");
      return;
    }
    setForm(EMPTY_FORM);
    setErro("");
  }

  function iniciarEdicao(id: string) {
    const item = data.timeline.find((t) => t.id === id)!;
    setEditandoId(id);
    setEditForm({
      titulo: item.titulo,
      descricao: item.descricao,
      imagem: item.imagem,
    });
  }

  function salvarEdicao() {
    if (!editandoId) return;
    updateTimelineItem(editandoId, editForm);
    setEditandoId(null);
  }

  // ── Polaroid card (view mode) ─────────────────────────────────────────────
  function PolaroidCardImgEsquerda({
    item,
    rotation,
  }: {
    item: (typeof data.timeline)[0];
    rotation: string;
  }) {
    return (
      <div
        className="bg-white text-black p-2 pb-7 shadow-2xl transition-transform duration-300 hover:rotate-0 hover:scale-105"
        style={{ transform: `rotate(${rotation})`, maxWidth: "140px" }}
      >
        {item.imagem && (
          <img
            src={item.imagem}
            alt={item.titulo}
            className="w-full object-cover mt-2"
            style={{ height: "120px" }}
          />
        )}
        {item.descricao && (
          <p
            className="text-black text-center mt-2 leading-tight"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            {item.descricao}
          </p>
        )}
      </div>
    );
  }

   function PolaroidCardImgDireita({
    item,
    rotation,
  }: {
    item: (typeof data.timeline)[0];
    rotation: string;
  }) {
    return (
      <div
        className="bg-white text-black p-2 pb-7 shadow-2xl transition-transform duration-300 hover:rotate-0 hover:scale-105 ml-15"
        style={{ transform: `rotate(${rotation})`, maxWidth: "140px" }}
      >
        {item.imagem && (
          <img
            src={item.imagem}
            alt={item.titulo}
            className="w-full object-cover mt-2"
            style={{ height: "120px"}}
          />
        )}
        {item.descricao && (
          <p
            className="text-black text-center mt-2 leading-tight"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            {item.descricao}
          </p>
        )}
      </div>
    );
  }

  // ── Text block (view mode) ────────────────────────────────────────────────
  function TextBlock({
    item,
    align,
  }: {
    item: (typeof data.timeline)[0];
    align: "left" | "right";
  }) {
    return (
      <div className={`flex flex-col gap-1 ${align === "right" ? "items-start text-left" : "items-end text-right"}`}>
        <div className={`flex items-center gap-1.5 ${align === "right" ? "flex-row" : "flex-row-reverse"}`}>
          <p
            className="font-bold"
            style={{ color: "#ff4d88", fontFamily: "'Playfair Display', serif", marginLeft: 30, fontSize: 20 }}
          >
            {item.titulo}
          </p>
        </div>
        {item.descricao && (
          <p className="text-black text-xs leading-snug max-w-[110px] text-[20px] ml-5">
            {item.descricao}
          </p>
        )}
        <div className={`flex gap-2 mt-1 ${align === "right" ? "justify-start" : "justify-end"}`}>
          <button
            onClick={() => iniciarEdicao(item.id)}
            className="text-black ml-4 hover:text-gray-400 transition-colors cursor-pointer"
          >
            <FaPencilAlt size={10} />
          </button>
          <button
            onClick={() => removeTimelineItem(item.id)}
            className="text-black ml-4 hover:text-red-400 transition-colors cursor-pointer"
          >
            <FaTrash size={10} />
          </button>
        </div>
      </div>
    );
  }

  // ── Edit card ─────────────────────────────────────────────────────────────
  function CardEdit() {
    return (
      <div className="bg-white/5 border border-pink-400/40 rounded-2xl p-3 space-y-2 w-full">
        <UploadImagemTimeline
          value={editForm.imagem}
          onChange={(v) => setEditForm((f) => ({ ...f, imagem: v }))}
          className="h-28 w-full"
        />
        <input
          type="text"
          value={editForm.titulo}
          onChange={(e) => setEditForm((f) => ({ ...f, titulo: e.target.value }))}
          className="w-full bg-gray-100 border border-gray-300 text-black rounded-xl px-3 py-1.5 text-sm outline-none focus:border-pink-400"
        />
        <textarea
          value={editForm.descricao}
          onChange={(e) => setEditForm((f) => ({ ...f, descricao: e.target.value }))}
          rows={2}
          className="w-full bg-gray-100 border border-gray-300 text-black rounded-xl px-3 py-1.5 text-sm outline-none focus:border-pink-400 resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={salvarEdicao}
            className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg hover:bg-green-500/30 cursor-pointer transition-colors"
          >
            <FaCheck size={10} /> Salvar
          </button>
          <button
            onClick={() => setEditandoId(null)}
            className="flex items-center gap-1 bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/30 cursor-pointer transition-colors"
          >
            <FaTimes size={10} /> Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl text-white">
          <FiClock />
        </span>
        <div>
          <h3
            className="text-black font-bold text-lg leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Linha do Tempo
          </h3>
          <p className="text-white/40 text-xs">
            Os momentos mais especiais de vocês
          </p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.timeline.length} maximo={LIMITS.timeline} />
        </div>
      </div>

      {/* Add form */}
      {!cheio && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
        >
          <UploadImagemTimeline
            value={form.imagem}
            onChange={(v) => setForm((f) => ({ ...f, imagem: v }))}
            className="h-36 w-full bg-gray-200"
            label="Foto do momento"
          />
          <input
            type="text"
            placeholder="Título (ex: Junho 2022)"
            value={form.titulo}
            onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
            className="w-full bg-gray-100 border border-gray-300 text-black rounded-xl px-4 py-2 text-black text-sm placeholder:text-black outline-none focus:border-pink-400"
          />
          <textarea
            placeholder="Descrição do momento…"
            value={form.descricao}
            onChange={(e) =>
              setForm((f) => ({ ...f, descricao: e.target.value }))
            }
            rows={2}
            className="w-full bg-gray-100 border border-gray-300 text-black rounded-xl px-4 py-2 text-black text-sm placeholder:text-black outline-none focus:border-pink-400 resize-none"
          />
          {erro && <p className="text-red-400 text-xs">{erro}</p>}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#e687cd] hover:opacity-90 text-white text-sm font-bold px-4 py-2 rounded-xl transition-opacity"
          >
            <FaPlus size={12} /> Adicionar momento
          </button>
        </motion.div>
      )}

      {cheio && (
        <p className="text-amber-400 text-xs text-center">
          Limite de {LIMITS.timeline} momentos atingido ✨
        </p>
      )}

      {/* Timeline list */}
      <div className="relative">
        {/* Central line */}
        {data.timeline.length > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500/60 to-transparent" />
        )}

        <AnimatePresence>
          {data.timeline.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const rotation = ROTATIONS[idx % ROTATIONS.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLeft ? -30 : 30 }}
                transition={{ delay: idx * 0.06 }}
                className="relative flex mb-10 items-center"
              >
                {/* Heart connector */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                >
                  <FaHeart
                    size={12}
                    className="text-pink-400 drop-shadow"
                  />
                </div>

                {isLeft ? (
                  <>
                    {/* LEFT: polaroid image */}
                    <div className="w-[calc(50%-20px)] flex justify-end pr-4">
                      {editandoId === item.id ? (
                        <CardEdit />
                      ) : (
                        <PolaroidCardImgEsquerda item={item} rotation={rotation} />
                      )}
                    </div>
                    {/* RIGHT: text */}
                    <div className="w-[calc(50%-20px)] pl-5">
                      {editandoId !== item.id && (
                        <TextBlock item={item} align="right" />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* LEFT: text */}
                    <div className="w-[calc(50%-20px)] pr-5 flex justify-end">
                      {editandoId !== item.id && (
                        <TextBlock item={item} align="left" />
                      )}
                    </div>
                    {/* RIGHT: polaroid image */}
                    <div className="w-[calc(50%-20px)] flex justify-start pl-4">
                      {editandoId === item.id ? (
                        <CardEdit />
                      ) : (
                        <PolaroidCardImgDireita item={item} rotation={rotation} />
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}