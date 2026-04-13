// ============================================================
// SEÇÃO — GallerySection
// Galeria de fotos com grid responsivo e modal de ampliação
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaTimes, FaPencilAlt, FaCheck } from "react-icons/fa";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";
import { UploadImagem } from "./upload-imagem";

export function GallerySection() {
  const { data, addGalleryItem, updateGalleryItem, removeGalleryItem } =
    useRetrospective();

  const [form, setForm] = useState({ imagem: "", descricao: "" });
  const [adicionando, setAdicionando] = useState(false);
  const [erro, setErro] = useState("");
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editDescricao, setEditDescricao] = useState("");

  const cheio = data.gallery.length >= LIMITS.gallery;

  function handleAdd() {
    if (!form.imagem) { setErro("Selecione uma imagem."); return; }
    const ok = addGalleryItem(form);
    if (!ok) { setErro("Limite de 6 fotos atingido."); return; }
    setForm({ imagem: "", descricao: "" });
    setAdicionando(false);
    setErro("");
  }

  function iniciarEdicaoDescricao(id: string, desc: string) {
    setEditandoId(id);
    setEditDescricao(desc);
  }

  function salvarDescricao() {
    if (!editandoId) return;
    updateGalleryItem(editandoId, { descricao: editDescricao });
    setEditandoId(null);
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">📸</span>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">Galeria de Fotos</h3>
          <p className="text-white/40 text-xs">Momentos capturados para sempre</p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.gallery.length} maximo={LIMITS.gallery} />
        </div>
      </div>

      {!cheio && !adicionando && (
        <button
          onClick={() => setAdicionando(true)}
          className="flex items-center gap-2 w-full justify-center border border-dashed border-white/20 hover:border-pink-400 text-white/40 hover:text-pink-400 rounded-2xl py-4 transition-all text-sm"
        >
          <FaPlus size={12} /> Adicionar foto
        </button>
      )}

      {/* Formulário */}
      <AnimatePresence>
        {adicionando && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 overflow-hidden"
          >
            <UploadImagem
              value={form.imagem}
              onChange={(v) => setForm((f) => ({ ...f, imagem: v }))}
              className="h-40 w-full"
              label="Clique para escolher a foto"
            />
            <input
              type="text"
              placeholder="Legenda (opcional)"
              value={form.descricao}
              onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-pink-400"
            />
            {erro && <p className="text-red-400 text-xs">{erro}</p>}
            <div className="flex gap-2">
              <button onClick={handleAdd} className="flex items-center gap-1 bg-pink-500 hover:bg-pink-400 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                <FaCheck size={12} /> Adicionar
              </button>
              <button onClick={() => { setAdicionando(false); setErro(""); }} className="text-white/40 hover:text-white text-sm px-4 py-2 rounded-xl transition-colors">
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {cheio && (
        <p className="text-amber-400 text-xs text-center">
          Galeria completa! {LIMITS.gallery} fotos adicionadas ✨
        </p>
      )}

      {/* Grid de fotos */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {data.gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="relative group rounded-xl overflow-hidden border border-white/10"
            >
              {/* Imagem clicável */}
              <img
                src={item.imagem}
                alt={item.descricao || `Foto ${idx + 1}`}
                className="w-full h-32 object-cover cursor-zoom-in"
                onClick={() => setModalImg(item.imagem)}
              />

              {/* Legenda */}
              <div className="bg-black/60 p-2">
                {editandoId === item.id ? (
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={editDescricao}
                      onChange={(e) => setEditDescricao(e.target.value)}
                      className="flex-1 bg-white/10 text-white text-xs rounded px-2 py-1 outline-none"
                      autoFocus
                    />
                    <button onClick={salvarDescricao} className="text-green-400 hover:text-green-300">
                      <FaCheck size={10} />
                    </button>
                  </div>
                ) : (
                  <p
                    className="text-white/60 text-xs truncate cursor-pointer hover:text-white transition-colors"
                    onClick={() => iniciarEdicaoDescricao(item.id, item.descricao)}
                  >
                    {item.descricao || <span className="italic opacity-40">Adicionar legenda…</span>}
                  </p>
                )}
              </div>

              {/* Ações overlay */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => iniciarEdicaoDescricao(item.id, item.descricao)}
                  className="bg-black/60 text-white/70 hover:text-blue-400 p-1.5 rounded-lg"
                >
                  <FaPencilAlt size={10} />
                </button>
                <button
                  onClick={() => removeGalleryItem(item.id)}
                  className="bg-black/60 text-white/70 hover:text-red-400 p-1.5 rounded-lg"
                >
                  <FaTrash size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal de ampliação */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setModalImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={modalImg}
              alt="Ampliado"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setModalImg(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full"
            >
              <FaTimes size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}