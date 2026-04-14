// ============================================================
// SEÇÃO — GallerySection
// Galeria de fotos: abre na primeira foto em destaque,
// scroll horizontal entre fotos com texto embaixo
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaTimes, FaPencilAlt, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";
import { UploadImagemGallery } from "../img-cloudnary/upload-imagem-gallery";
import { FiImage } from "react-icons/fi";

export function GallerySection() {
  const { data, addGalleryItem, updateGalleryItem, removeGalleryItem } =
    useRetrospective();

  const [form, setForm] = useState({ imagem: "", descricao: "" });
  const [adicionando, setAdicionando] = useState(false);
  const [erro, setErro] = useState("");

  // Foto em destaque (viewer)
  const [fotoAtiva, setFotoAtiva] = useState<number>(0);

  // Edição inline de descrição
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editDescricao, setEditDescricao] = useState("");

  const cheio = data.gallery.length >= LIMITS.gallery;

  function handleAdd() {
    if (!form.imagem) { setErro("Selecione uma imagem."); return; }
    const ok = addGalleryItem(form);
    if (!ok) { setErro("Limite de 6 fotos atingido."); return; }
    // Abrir na foto recém-adicionada
    setFotoAtiva(data.gallery.length); // antes de rerender o novo index é length
    setForm({ imagem: "", descricao: "" });
    setAdicionando(false);
    setErro("");
  }

  function irParaFoto(idx: number) {
    setFotoAtiva(Math.max(0, Math.min(idx, data.gallery.length - 1)));
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

  const fotoAtivaItem = data.gallery[fotoAtiva] ?? null;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <span className="text-2xl"><FiImage /></span>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">Galeria de Fotos</h3>
          <p className="text-white/40 text-xs">Momentos capturados para sempre</p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.gallery.length} maximo={LIMITS.gallery} />
        </div>
      </div>

      {/* Botão adicionar */}
      {!cheio && !adicionando && (
        <button
          onClick={() => setAdicionando(true)}
          className="flex items-center gap-2 w-full justify-center border border-dashed border-white/20 hover:border-red-400 text-white/40 hover:text-red-400 rounded-2xl py-4 transition-all text-sm"
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
            <UploadImagemGallery
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-red-400"
            />
            {erro && <p className="text-red-400 text-xs">{erro}</p>}
            <div className="flex gap-2">
              <button onClick={handleAdd} className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
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

      {/* ── Viewer principal ── */}
      {data.gallery.length > 0 && (
        <div className="space-y-3">
          {/* Foto em destaque */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30">
            <AnimatePresence mode="wait">
              <motion.img
                key={fotoAtivaItem?.id}
                src={fotoAtivaItem?.imagem}
                alt={fotoAtivaItem?.descricao || "Foto"}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="w-full h-56 object-cover"
              />
            </AnimatePresence>

            {/* Setas de navegação */}
            {data.gallery.length > 1 && (
              <>
                <button
                  onClick={() => irParaFoto(fotoAtiva - 1)}
                  disabled={fotoAtiva === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-20 text-white p-2 rounded-full transition-all"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={() => irParaFoto(fotoAtiva + 1)}
                  disabled={fotoAtiva === data.gallery.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-20 text-white p-2 rounded-full transition-all"
                >
                  <FaChevronRight size={12} />
                </button>
              </>
            )}

            {/* Indicador de posição */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {data.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => irParaFoto(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === fotoAtiva ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Botão remover */}
            <button
              onClick={() => {
                if (fotoAtivaItem) {
                  removeGalleryItem(fotoAtivaItem.id);
                  irParaFoto(Math.max(0, fotoAtiva - 1));
                }
              }}
              className="absolute top-2 right-2 bg-black/60 text-white/70 hover:text-red-400 p-1.5 rounded-lg transition-colors"
            >
              <FaTrash size={10} />
            </button>
          </div>

          {/* Legenda da foto ativa */}
          {fotoAtivaItem && (
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
              {editandoId === fotoAtivaItem.id ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editDescricao}
                    onChange={(e) => setEditDescricao(e.target.value)}
                    className="flex-1 bg-white/10 text-white text-sm rounded px-2 py-1 outline-none"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && salvarDescricao()}
                  />
                  <button onClick={salvarDescricao} className="text-green-400 hover:text-green-300">
                    <FaCheck size={12} />
                  </button>
                  <button onClick={() => setEditandoId(null)} className="text-white/40 hover:text-white">
                    <FaTimes size={12} />
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => iniciarEdicaoDescricao(fotoAtivaItem.id, fotoAtivaItem.descricao)}
                >
                  <p className="text-white/60 text-sm flex-1 group-hover:text-white transition-colors">
                    {fotoAtivaItem.descricao || (
                      <span className="italic opacity-40">Clique para adicionar legenda…</span>
                    )}
                  </p>
                  <FaPencilAlt size={10} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                </div>
              )}
            </div>
          )}

          {/* ── Miniaturas com scroll horizontal ── */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {data.gallery.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => irParaFoto(idx)}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 relative rounded-xl overflow-hidden border-2 transition-all ${
                  idx === fotoAtiva
                    ? "border-pink-500 shadow-lg shadow-pink-500/30"
                    : "border-white/10 opacity-60 hover:opacity-90"
                }`}
                style={{ width: 64, height: 64 }}
              >
                <img
                  src={item.imagem}
                  alt={item.descricao || `Foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
