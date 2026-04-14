// ============================================================
// SEÇÃO — TimelineSection
// Linha do tempo vertical com até 6 momentos importantes
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";
import { useRetrospective } from "./restrospective-context";
import { UploadImagemTimeline } from "../img-cloudnary/upload-imagem-timeline";

// ── Formulário de item ────────────────────────────────────────
interface ItemFormState {
  titulo: string;
  descricao: string;
  imagem: string;
}

const EMPTY_FORM: ItemFormState = { titulo: "", descricao: "", imagem: "" };

export function TimelineSection() {
  const { data, addTimelineItem, updateTimelineItem, removeTimelineItem } =
    useRetrospective();

  const [form, setForm] = useState<ItemFormState>(EMPTY_FORM);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ItemFormState>(EMPTY_FORM);
  const [erro, setErro] = useState("");

  const cheio = data.timeline.length >= LIMITS.timeline;

  // --- Adicionar ---
  function handleAdd() {
    if (!form.titulo.trim()) { setErro("O título é obrigatório."); return; }
    if (!form.imagem) { setErro("Adicione uma imagem."); return; }
    const ok = addTimelineItem(form);
    if (!ok) { setErro("Limite de 6 momentos atingido."); return; }
    setForm(EMPTY_FORM);
    setErro("");
  }

  // --- Editar ---
  function iniciarEdicao(id: string) {
    const item = data.timeline.find((t) => t.id === id)!;
    setEditandoId(id);
    setEditForm({ titulo: item.titulo, descricao: item.descricao, imagem: item.imagem });
  }

  function salvarEdicao() {
    if (!editandoId) return;
    updateTimelineItem(editandoId, editForm);
    setEditandoId(null);
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">🕐</span>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">Linha do Tempo</h3>
          <p className="text-white/40 text-xs">Os momentos mais especiais de vocês</p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.timeline.length} maximo={LIMITS.timeline} />
        </div>
      </div>

      {/* Formulário de adição */}
      {!cheio && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
        >
          <UploadImagemTimeline
            value={form.imagem}
            onChange={(v) => setForm((f) => ({ ...f, imagem: v }))}
            className="h-36 w-full"
            label="Foto do momento"
          />
          <input
            type="text"
            placeholder="Título (ex: Nossa primeira viagem)"
            value={form.titulo}
            onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-pink-400"
          />
          <textarea
            placeholder="Descrição do momento…"
            value={form.descricao}
            onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-pink-400 resize-none"
          />
          {erro && <p className="text-red-400 text-xs">{erro}</p>}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
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

      {/* Lista de itens — linha do tempo */}
      <div className="relative">
        {data.timeline.length > 0 && (
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-transparent" />
        )}

        <AnimatePresence>
          {data.timeline.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.05 }}
              className="relative flex gap-4 mb-6 pl-12"
            >
              {/* Bolinha da timeline */}
              <div className="absolute left-3 top-3 w-4 h-4 rounded-full bg-pink-500 border-2 border-gray-900 shadow-lg shadow-pink-500/50" />

              {editandoId === item.id ? (
                /* Modo edição */
                <div className="flex-1 bg-white/5 border border-pink-400/40 rounded-2xl p-3 space-y-2">
                  <UploadImagemTimeline
                    value={editForm.imagem}
                    onChange={(v) => setEditForm((f) => ({ ...f, imagem: v }))}
                    className="h-28 w-full"
                  />
                  <input
                    type="text"
                    value={editForm.titulo}
                    onChange={(e) => setEditForm((f) => ({ ...f, titulo: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm outline-none focus:border-pink-400"
                  />
                  <textarea
                    value={editForm.descricao}
                    onChange={(e) => setEditForm((f) => ({ ...f, descricao: e.target.value }))}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm outline-none focus:border-pink-400 resize-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={salvarEdicao} className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                      <FaCheck size={10} /> Salvar
                    </button>
                    <button onClick={() => setEditandoId(null)} className="flex items-center gap-1 bg-white/5 text-white/50 text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      <FaTimes size={10} /> Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* Modo visualização */
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  {item.imagem && (
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <p className="text-white font-semibold text-sm">{item.titulo}</p>
                    {item.descricao && (
                      <p className="text-white/50 text-xs mt-1">{item.descricao}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => iniciarEdicao(item.id)} className="text-white/40 hover:text-blue-400 transition-colors">
                        <FaPencilAlt size={12} />
                      </button>
                      <button onClick={() => removeTimelineItem(item.id)} className="text-white/40 hover:text-red-400 transition-colors">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}