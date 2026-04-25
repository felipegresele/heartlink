import { HiSparkles } from "react-icons/hi2";
import type { LovePage } from "../../schema/schemas";
import { EditTemplateForm } from "./form-editar-template";
import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { ModalPagamentoPendente } from "./modal-pagamento.-pendente";
import { useState } from "react";

interface TemplateCardProps {
  page: LovePage;
  onUpdate: (pageId: string, data: Partial<LovePage>) => Promise<void>;
  onDelete?: (pageId: string) => void;
  updating: boolean;
}

const STATUS_STYLE: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-600 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-500 border-amber-200",
  DEFAULT: "bg-gray-100 text-gray-400 border-gray-200",
};

const STATUS_LABEL: Record<string, string> = {
  PAID: "✅ Ativo",
  PENDING: "⏳ Pendente",
};

export function TemplateCard({
  page,
  onUpdate,
  onDelete,
  updating,
}: TemplateCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const statusStyle = STATUS_STYLE[page.status] ?? STATUS_STYLE.DEFAULT;
  const statusLabel = STATUS_LABEL[page.status] ?? page.status;
  const previewUrl = `/p/${page.slug}`;

  const handleSave = async (pageId: string, changed: Partial<LovePage>) => {
    await onUpdate(pageId, changed);
    setIsEditing(false);
  };

  return (
    <div
      className={`
        bg-white border rounded-2xl p-5 flex flex-col gap-4
        transition-all duration-300
        ${
          isEditing
            ? "border-[#e687cd]/40 shadow-lg shadow-pink-100"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      {/* Header do card */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-800 font-semibold text-sm truncate">
              Nome História: {page.receiverName ?? "—"}
            </h3>
          </div>
          <p className="text-gray-500 text-xs truncate">
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
        {page.theme && <Chip>🎨 {page.theme}</Chip>}
        {page.musicTitle && <Chip>🎵 {page.musicTitle}</Chip>}
        {page.retrospectiva && <Chip>✨ Retrospectiva</Chip>}
        {page.photos && page.photos.length > 0 && (
          <Chip>
            📸 {page.photos.length} foto{page.photos.length > 1 ? "s" : ""}
          </Chip>
        )}
      </div>

      <div className="h-px bg-gray-100" />

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
                       bg-gray-100 hover:bg-gray-200 border border-gray-300
                       rounded-xl text-gray-500 hover:text-gray-700 text-xs font-medium
                       transition-colors cursor-pointer"
          >
            <FiEdit2 size={13} />
            Editar
          </button>

          {page.status === "PENDING" ? (
            <button
              onClick={() => setOpenModal(true)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
               bg-amber-50 hover:bg-amber-100 border border-amber-200
               rounded-xl text-amber-500 hover:text-amber-600 text-xs font-medium
               transition-colors cursor-pointer"
            >
              💳 Pagar agora
            </button>
          ) : (
            <a>
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
               bg-pink-50 hover:bg-pink-100 border border-pink-200
               rounded-xl text-[#e687cd] hover:text-pink-400 text-xs font-medium
               transition-colors"
            >
              <FiExternalLink size={13} />
              Ver página
            </a>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(page.id)}
              className="p-2 bg-gray-100 hover:bg-red-50 border border-gray-200
                         hover:border-red-200 rounded-xl text-gray-300
                         hover:text-red-400 transition-colors"
              title="Excluir template"
            >
              <FiTrash2 size={13} />
            </button>
          )}
        </div>
      )}
      {openModal && (
        <ModalPagamentoPendente
          page={page}
          onFechar={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full"
    >
      {children}
    </span>
  );
}