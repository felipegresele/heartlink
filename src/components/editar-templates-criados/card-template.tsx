import { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import type { LovePage } from "../../schema/schemas";
import { EditTemplateForm } from "./form-editar-template";
import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";

interface TemplateCardProps {
  page: LovePage;
  onUpdate: (pageId: string, data: Partial<LovePage>) => Promise<void>;
  onDelete?: (pageId: string) => void;
  updating: boolean;
}

const STATUS_STYLE: Record<string, string> = {
  PAID:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  PENDING: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  DEFAULT: "bg-white/5 text-white/40 border-white/10",
};

const STATUS_LABEL: Record<string, string> = {
  PAID:    "✅ Ativo",
  PENDING: "⏳ Pendente",
};

export function TemplateCard({ page, onUpdate, onDelete, updating }: TemplateCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const statusStyle = STATUS_STYLE[page.status] ?? STATUS_STYLE.DEFAULT;
  const statusLabel = STATUS_LABEL[page.status] ?? page.status;
  const previewUrl   = `/p/${page.slug}`;

  const handleSave = async (pageId: string, changed: Partial<LovePage>) => {
    await onUpdate(pageId, changed);
    setIsEditing(false);
  };

  return (
    <div
      className={`
        bg-white/[0.03] border rounded-2xl p-5 flex flex-col gap-4
        transition-all duration-300
        ${isEditing
          ? "border-pink-500/30 shadow-lg shadow-pink-900/10"
          : "border-white/10 hover:border-white/20"}
      `}
    >
      {/* Header do card */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-semibold text-sm truncate">
              Nome História: {page.receiverName ?? "—"}
            </h3>
          </div>
          <p className="text-white/40 text-xs truncate">
            De: {page.senderName ?? "—"}
          </p>
        </div>

        <span
          className={`shrink-0 text-[11px] font-semibold px-2.5 py-1
                      rounded-full border ${statusStyle}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Info chips */}
      <div className="flex flex-wrap gap-2">
        {page.theme && (
          <Chip>🎨 {page.theme}</Chip>
        )}
        {page.musicTitle && (
          <Chip>🎵 {page.musicTitle}</Chip>
        )}
        {page.retrospectiva && (
          <Chip>✨ Retrospectiva</Chip>
        )}
        {page.photos && page.photos.length > 0 && (
          <Chip>📸 {page.photos.length} foto{page.photos.length > 1 ? "s" : ""}</Chip>
        )}
      </div>

      <div className="h-px bg-white/5" />

      {/* Formulário de edição (renderização condicional) */}
      {isEditing ? (
        <EditTemplateForm
          page={page}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          saving={updating}
        />
      ) : (
        /* Botões de ação */
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
                       bg-white/5 hover:bg-white/10 border border-white/10
                       rounded-xl text-white/70 hover:text-white text-xs font-medium
                       transition-colors"
          >
            <FiEdit2 size={13} />
            Editar
          </button>

          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
                       bg-pink-600/10 hover:bg-pink-600/20 border border-pink-500/20
                       rounded-xl text-pink-400 hover:text-pink-300 text-xs font-medium
                       transition-colors"
          >
            <FiExternalLink size={13} />
            Ver página
          </a>

          {onDelete && (
            <button
              onClick={() => onDelete(page.id)}
              className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/10
                         hover:border-red-500/20 rounded-xl text-white/30
                         hover:text-red-400 transition-colors"
              title="Excluir template"
            >
              <FiTrash2 size={13} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] text-white/50 bg-white/5 border border-white/10
                     px-2.5 py-0.5 rounded-full">
      {children}
    </span>
  );
}