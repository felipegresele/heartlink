import { useNavigate } from "react-router-dom";
import { useMeusTemplates } from "../../api/use-meus-templates";
import { FiArrowLeft, FiPlus, FiAlertCircle } from "react-icons/fi";
import { TemplateCardSkeleton } from "./template-card";
import { TemplateCard } from "./card-template";

export function MeusTemplates() {
  const navigate = useNavigate();
  const { pages, loading, error, handleUpdate, updating } = useMeusTemplates();

  const storedUser = localStorage.getItem("user");
  const usuario = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Cabeçalho da página */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiArrowLeft size={18} />
          </button>

          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tight">Meu Perfil</h1>
            {usuario && (
              <p className="text-sm text-gray-500 mt-0.5">{usuario.email}</p>
            )}
          </div>

          <button
            onClick={() => navigate("/criar")}
            className="flex cursor-pointer items-center gap-2 bg-[#e687cd] hover:bg-pink-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-pink-200"
          >
            <FiPlus size={16} />
            Nova declaração
          </button>
        </div>

        {/* Título da seção */}
        <h2 className="text-lg font-bold mb-5 text-gray-600">
          Minhas declarações
        </h2>

        {/* Estado: carregando */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <TemplateCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Estado: erro */}
        {!loading && error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-red-400">
            <FiAlertCircle size={18} className="shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Estado: vazio */}
        {!loading && !error && pages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="text-5xl">💌</div>
            <p className="text-gray-500 text-sm">
              Você ainda não criou nenhuma declaração.
            </p>
            <button
              onClick={() => navigate("/criar")}
              className="mt-2 flex items-center cursor-pointer gap-2 bg-[#e687cd] hover:bg-pink-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <FiPlus size={15} />
              Criar primeira declaração
            </button>
          </div>
        )}

        {/* Estado: lista de cards */}
        {!loading && !error && pages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pages.map((page) => (
              <TemplateCard
                key={page.id}
                page={page}
                onUpdate={handleUpdate}
                updating={updating}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}