// ============================================================
// form-editar-template.tsx
// Formulário completo de edição de uma LovePage existente.
//
// Seções:
//   1. Campos textuais (nome, mensagem, data)
//   2. Música — busca no YouTube igual ao fluxo de criação
//   3. Fotos — upload via Cloudinary (se a página tinha fotos)
//   4. Retrospectiva — editor completo usando as seções existentes
//      (só aparece se a página tinha retrospectiva)
// ============================================================

import { useState, type FormEvent } from "react";
import { FiSave, FiX, FiMusic, FiSearch, FiImage, FiCheck } from "react-icons/fi";
import type { LovePage } from "../../schema/schemas";
import type { Video } from "../../schema/music";
import type { RetrospectiveData, SectionType } from "../../schema/retrospectiva";
import { mapBackendRetrospectiva } from "../../schema/retrospectiva";
import {
  RetrospectiveProvider,
  useRetrospective,
} from "../criar-declaracao/components/forms-templates/retrospectiva/restrospective-context";
import { TimelineSection } from "../criar-declaracao/components/forms-templates/retrospectiva/timeline-section";
import { GallerySection } from "../criar-declaracao/components/forms-templates/retrospectiva/galeria-sessao";
import { WheelSection } from "../criar-declaracao/components/forms-templates/retrospectiva/roleta";
import { EnigmaSection } from "../criar-declaracao/components/forms-templates/retrospectiva/enigma-sessao";

// ── Constantes ────────────────────────────────────────────────
const YOUTUBE_API_KEY = "AIzaSyB2pnDIwOL2YRC9Ryu4m8d1aDkVNrmmByE";
const CLOUD_NAME = "dsqzqfga2";
const UPLOAD_PRESET = "heartlink";
const FOLDER = "heartlink/profile";
const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp"];

// ── Tipos ─────────────────────────────────────────────────────
interface EditTemplateFormProps {
  page: LovePage;
  onSave: (pageId: string, changed: Partial<LovePage>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTE: Busca de Música no YouTube
// ─────────────────────────────────────────────────────────────
interface MusicSectionProps {
  musicaAtual: { id: string; title: string } | null;
  onSelect: (video: Video) => void;
}

function MusicSection({ musicaAtual, onSelect }: MusicSectionProps) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<Video[]>([]);
  const [selecionado, setSelecionado] = useState<Video | null>(
    musicaAtual ? { id: musicaAtual.id, title: musicaAtual.title, thumbnail: "", channelTitle: "" } : null
  );
  const [carregando, setCarregando] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);

  const buscar = async () => {
    if (!query.trim()) return;
    setCarregando(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=6&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      const items: Video[] = data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
      })) ?? [];
      setResultados(items);
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
    } finally {
      setCarregando(false);
    }
  };

  const handleSelect = (video: Video) => {
    setSelecionado(video);
    onSelect(video);
    setResultados([]);
    setBuscaAberta(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
          <FiMusic size={12} />
          Música de fundo
        </label>
        <button
          type="button"
          onClick={() => setBuscaAberta((v) => !v)}
          className="text-xs text-pink-400 hover:text-pink-300 underline transition-colors"
        >
          {buscaAberta ? "Fechar busca" : "Trocar música"}
        </button>
      </div>

      {/* Música atual */}
      {selecionado && !buscaAberta && (
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          {selecionado.thumbnail && (
            <img
              src={selecionado.thumbnail}
              alt={selecionado.title}
              className="w-10 h-10 rounded-lg object-cover shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{selecionado.title}</p>
            {selecionado.channelTitle && (
              <p className="text-white/40 text-xs truncate">{selecionado.channelTitle}</p>
            )}
          </div>
          <FiCheck className="text-emerald-400 shrink-0" size={16} />
        </div>
      )}

      {/* Busca aberta */}
      {buscaAberta && (
        <div className="space-y-3 bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscar()}
              placeholder="Buscar música no YouTube..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                         text-white text-sm placeholder-white/20
                         focus:outline-none focus:border-pink-500/60 transition-colors"
            />
            <button
              type="button"
              onClick={buscar}
              disabled={carregando}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-50
                         px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors"
            >
              <FiSearch size={14} />
              {carregando ? "Buscando..." : "Buscar"}
            </button>
          </div>

          {/* Player do vídeo selecionado */}
          {selecionado && resultados.length > 0 && (
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selecionado.id}?autoplay=0`}
                allow="encrypted-media"
                allowFullScreen
              />
            </div>
          )}

          {/* Grid de resultados */}
          {resultados.length > 0 && (
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {resultados.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelect(video)}
                  className={`text-left rounded-xl overflow-hidden border-2 transition-all ${
                    selecionado?.id === video.id
                      ? "border-red-500"
                      : "border-transparent hover:border-white/20"
                  }`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full object-cover"
                  />
                  <div className="p-2 bg-white/5">
                    <p className="text-xs font-medium text-white line-clamp-2">{video.title}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{video.channelTitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTE: Fotos via Cloudinary
// ─────────────────────────────────────────────────────────────
interface FotosSectionProps {
  fotos: string[];
  onChange: (fotos: string[]) => void;
}

function FotosSection({ fotos, onChange }: FotosSectionProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (fotos.length >= 3) {
      alert("Máximo de 3 imagens!");
      return;
    }

    setUploading(true);
    const novas: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!TIPOS_ACEITOS.includes(file.type)) {
        alert("Formato não permitido! Use JPG, PNG ou WebP.");
        continue;
      }
      if (fotos.length + novas.length >= 3) break;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", FOLDER);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data.secure_url) novas.push(data.secure_url);
      } catch (err) {
        console.error("Erro no upload:", err);
      }
    }

    onChange([...fotos, ...novas]);
    setUploading(false);
    // Limpa o input para permitir reenviar o mesmo arquivo
    e.target.value = "";
  };

  const remover = (index: number) => {
    onChange(fotos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
        <FiImage size={12} />
        Fotos ({fotos.length}/3)
      </label>

      {/* Thumbnails com remoção */}
      {fotos.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {fotos.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Foto ${i + 1}`}
                className="w-20 h-20 object-cover rounded-xl border border-white/10"
              />
              <button
                type="button"
                onClick={() => remover(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 hover:bg-red-500
                           text-white rounded-full text-xs flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload */}
      {fotos.length < 3 && (
        <label
          className={`flex items-center justify-center gap-2 border-2 border-dashed border-white/15
                      hover:border-white/30 rounded-xl py-4 cursor-pointer transition-colors
                      ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
            className="sr-only"
          />
          <FiImage className="text-white/30" size={16} />
          <span className="text-white/40 text-sm">
            {uploading ? "Enviando..." : "Adicionar foto"}
          </span>
        </label>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTE: Editor de Retrospectiva (usa o contexto)
// ─────────────────────────────────────────────────────────────
const SECAO_LABELS: Record<string, string> = {
  timeline: "📅 Linha do Tempo",
  wheel: "🎡 Roleta",
  gallery: "🖼️ Galeria",
  enigma: "🧩 Enigma",
};

function RetrospectivaEditor() {
  const { data } = useRetrospective();
  const [secaoAtiva, setSecaoAtiva] = useState<SectionType | null>(
    data.secoesSelecionadas[0] ?? null
  );

  if (data.secoesSelecionadas.length === 0) {
    return (
      <p className="text-white/30 text-sm text-center py-4">
        Esta retrospectiva não possui seções configuradas.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabs das seções */}
      <div className="flex flex-wrap gap-2">
        {data.secoesSelecionadas.map((secao) => (
          <button
            key={secao}
            type="button"
            onClick={() => setSecaoAtiva(secao)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              secaoAtiva === secao
                ? "bg-pink-600/30 border-pink-500/40 text-pink-300"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white/70"
            }`}
          >
            {SECAO_LABELS[secao] ?? secao}
          </button>
        ))}
      </div>

      {/* Conteúdo da seção ativa */}
      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
        {secaoAtiva === "timeline" && <TimelineSection />}
        {secaoAtiva === "wheel" && <WheelSection />}
        {secaoAtiva === "gallery" && <GallerySection />}
        {secaoAtiva === "enigma" && <EnigmaSection />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE INTERNO: o formulário que tem acesso ao contexto
// ─────────────────────────────────────────────────────────────
interface InnerFormProps extends EditTemplateFormProps {
  retroInitial: RetrospectiveData | null;
}

function InnerEditForm({ page, onSave, onCancel, saving, retroInitial }: InnerFormProps) {
  const { getData } = useRetrospective();

  // ── Estado campos textuais ───────────────────────────────
  const [receiverName, setReceiverName] = useState(page.receiverName ?? "");
  const [senderName, setSenderName]     = useState(page.senderName ?? "");
  const [message, setMessage]           = useState(page.message ?? "");
  const [relationshipStartDate, setDate] = useState(page.relationshipStartDate ?? "");

  // ── Estado música ─────────────────────────────────────────
  const [musicaSelecionada, setMusicaSelecionada] = useState<{
    musicId: string;
    musicTitle: string;
  } | null>(
    page.musicId ? { musicId: page.musicId, musicTitle: page.musicTitle ?? "" } : null
  );

  // ── Estado fotos ──────────────────────────────────────────
  const [fotos, setFotos] = useState<string[]>(page.photos ?? []);

  // ── Aba ativa do formulário ───────────────────────────────
  const [aba, setAba] = useState<"info" | "musica" | "fotos" | "retrospectiva">("info");

  const temFotos       = page.photos !== null;
  const temMusica      = page.musicId !== null;
  const temRetro       = retroInitial !== null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: Partial<LovePage> = {};

    if (receiverName !== (page.receiverName ?? "")) payload.receiverName = receiverName;
    if (senderName !== (page.senderName ?? ""))     payload.senderName = senderName;
    if (message !== (page.message ?? ""))           payload.message = message;
    if (relationshipStartDate !== (page.relationshipStartDate ?? ""))
      payload.relationshipStartDate = relationshipStartDate;

    if (musicaSelecionada) {
      if (musicaSelecionada.musicId !== page.musicId)
        payload.musicId = musicaSelecionada.musicId;
      if (musicaSelecionada.musicTitle !== page.musicTitle)
        payload.musicTitle = musicaSelecionada.musicTitle;
    }

    if (temFotos) payload.photos = fotos;

    if (temRetro) {
      const retroAtual = getData();
      // Converte RetrospectiveData → formato backend
      (payload as any).retrospectiva = {
        selectedSections: retroAtual.secoesSelecionadas,
        efeitoTime: retroAtual.efeitoTime,
        timeline: retroAtual.timeline,
        wheel: retroAtual.wheel,
        gallery: retroAtual.gallery,
        enigma: retroAtual.enigma,
      };
    }

    if (Object.keys(payload).length === 0) return;
    await onSave(page.id, payload);
  };

  // ── Abas disponíveis ──────────────────────────────────────
  const abas = [
    { id: "info" as const, label: "Info", sempre: true },
    { id: "musica" as const, label: "Música", sempre: temMusica },
    { id: "fotos" as const, label: "Fotos", sempre: temFotos },
    { id: "retrospectiva" as const, label: "Retrospectiva", sempre: temRetro },
  ].filter((a) => a.sempre);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Navegação por abas */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {abas.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setAba(id)}
            className={`flex-1 text-xs font-medium py-2 rounded-lg transition-all ${
              aba === id
                ? "bg-white/10 text-white shadow"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── ABA: Informações ── */}
      {aba === "info" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* receiverName */}
          {page.receiverName !== null && (
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">
                Nome de vocês💌
              </label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className={inputClass}
                placeholder="Nome de quem recebe"
              />
            </div>
          )}

          {/* relationshipStartDate */}
          {page.relationshipStartDate !== null && (
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">
                Data do relacionamento 📅
              </label>
              <input
                type="date"
                value={relationshipStartDate}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          {/* message */}
          {page.message !== null && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">
                Mensagem 💬
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Sua mensagem especial..."
              />
            </div>
          )}
        </div>
      )}

      {/* ── ABA: Música ── */}
      {aba === "musica" && temMusica && (
        <MusicSection
          musicaAtual={
            musicaSelecionada
              ? { id: musicaSelecionada.musicId, title: musicaSelecionada.musicTitle }
              : null
          }
          onSelect={(video) =>
            setMusicaSelecionada({ musicId: video.id, musicTitle: video.title })
          }
        />
      )}

      {/* ── ABA: Fotos ── */}
      {aba === "fotos" && temFotos && (
        <FotosSection fotos={fotos} onChange={setFotos} />
      )}

      {/* ── ABA: Retrospectiva ── */}
      {aba === "retrospectiva" && temRetro && <RetrospectivaEditor />}

      {/* ── Botões de ação ── */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                     bg-white/5 hover:bg-white/10 border border-white/10
                     rounded-xl text-white/70 text-sm font-medium
                     transition-colors disabled:opacity-50"
        >
          <FiX size={15} />
          Cancelar
        </button>

        <button
          type="submit"
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                     bg-gradient-to-r from-red-600 to-rose-600
                     hover:from-red-500 hover:to-rose-500
                     rounded-xl text-white text-sm font-semibold
                     transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Salvando…
            </>
          ) : (
            <>
              <FiSave size={15} />
              Salvar alterações
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE PÚBLICO: envolve o formulário no provider correto
// ─────────────────────────────────────────────────────────────
export function EditTemplateForm(props: EditTemplateFormProps) {
  const { page } = props;

  // Converte retrospectiva do backend → RetrospectiveData (formato do context)
  const retroInitial: RetrospectiveData | null = page.retrospectiva
    ? mapBackendRetrospectiva(page.retrospectiva as any)
    : null;

  return (
    <RetrospectiveProvider initialData={retroInitial ?? undefined}>
      <InnerEditForm {...props} retroInitial={retroInitial} />
    </RetrospectiveProvider>
  );
}

// ── Classe base de input ──────────────────────────────────────
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 " +
  "text-white text-sm placeholder-white/20 " +
  "focus:outline-none focus:border-pink-500/60 focus:bg-white/8 transition-colors";