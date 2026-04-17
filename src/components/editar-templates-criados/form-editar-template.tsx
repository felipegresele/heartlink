import { FiSave, FiX } from "react-icons/fi";
import type { LovePage } from "../../schema/schemas";
import { useState, type FormEvent } from "react";

// Mapeamento de chaves técnicas → labels amigáveis
const FIELD_LABELS: Record<string, string> = {
  receiverName: "Nome da História",
  senderName: "Seu nome 🖊️",
  message: "Mensagem",
  relationshipStartDate: "Data do relacionamento 📅",
  musicId: "ID da música",
  musicTitle: "Título da música 🎵",
  theme: "Tema visual 🎨",
};

// Campos que NÃO devem aparecer no formulário de edição
const NON_EDITABLE_KEYS = new Set([
  "id",
  "slug",
  "status",
  "createdAt",
  "planType",
  "photos",        // edição de fotos tem fluxo próprio (upload)
  "retrospectiva", // complexo demais para formulário inline
]);

type EditableField = keyof typeof FIELD_LABELS;

interface EditTemplateFormProps {
  page: LovePage;
  onSave: (pageId: string, changed: Partial<LovePage>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export function EditTemplateForm({ page, onSave, onCancel, saving }: EditTemplateFormProps) {
  /**
   * LÓGICA DE FILTRO — Regra de Ouro do projeto:
   * Itera sobre as chaves do objeto da página. Se valor === null ou undefined,
   * ou se a chave está na lista de não-editáveis, o campo NÃO é renderizado.
   */
  const editableEntries = (
    Object.entries(page) as [string, unknown][]
  ).filter(
    ([key, value]) =>
      !NON_EDITABLE_KEYS.has(key) &&
      value !== null &&
      value !== undefined &&
      key in FIELD_LABELS
  ) as [EditableField, string][];

  // Estado do formulário inicializado com os valores atuais (não-nulos)
  const [formValues, setFormValues] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        editableEntries.map(([key, value]) => [key, String(value)])
      )
  );

  const [dirty, setDirty] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!dirty) return;

    // Monta payload com apenas os campos que mudaram
    const changed: Partial<LovePage> = {};
    for (const [key, value] of Object.entries(formValues)) {
      const originalValue = String(page[key as keyof LovePage] ?? "");
      if (value !== originalValue) {
        (changed as Record<string, string>)[key] = value;
      }
    }

    if (Object.keys(changed).length === 0) return;
    await onSave(page.id, changed);
  };

  const isTextarea = (key: string) => key === "message";
  const isDateInput = (key: string) => key === "relationshipStartDate";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {editableEntries.map(([key]) => {
          const label = FIELD_LABELS[key];
          const value = formValues[key] ?? "";

          return (
            <div
              key={key}
              className={isTextarea(key) ? "sm:col-span-2" : ""}
            >
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5">
                {label}
              </label>

              {isTextarea(key) ? (
                <textarea
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                             text-white text-sm placeholder-white/20 resize-none
                             focus:outline-none focus:border-pink-500/60 focus:bg-white/8
                             transition-colors"
                  placeholder={label}
                />
              ) : isDateInput(key) ? (
                <input
                  type="date"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                             text-white text-sm
                             focus:outline-none focus:border-pink-500/60 focus:bg-white/8
                             transition-colors"
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                             text-white text-sm placeholder-white/20
                             focus:outline-none focus:border-pink-500/60 focus:bg-white/8
                             transition-colors"
                  placeholder={label}
                />
              )}
            </div>
          );
        })}
      </div>

      {editableEntries.length === 0 && (
        <p className="text-white/40 text-sm text-center py-4">
          Nenhum campo editável encontrado nesta página.
        </p>
      )}

      {/* Aviso sobre fotos/retrospectiva quando existem mas não aparecem no form */}
      {(page.photos !== null || page.retrospectiva !== null) && (
        <p className="text-white/30 text-xs bg-white/5 rounded-xl px-4 py-3 border border-white/5">
          💡 <strong className="text-white/50">Fotos</strong> e{" "}
          <strong className="text-white/50">Retrospectiva</strong> são editadas
          em seções dedicadas da criação do template.
        </p>
      )}

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
          disabled={saving || !dirty}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                     bg-gradient-to-r from-red-600 to-red-600
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