// Skeleton animado para o loading de cards de template
export function TemplateCardSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse space-y-4">
      {/* Badge de status */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 bg-white/10 rounded-full" />
        <div className="h-5 w-12 bg-white/10 rounded-full" />
      </div>

      {/* Nome do destinatário */}
      <div className="h-6 w-3/4 bg-white/10 rounded-lg" />

      {/* Remetente */}
      <div className="h-4 w-1/2 bg-white/10 rounded-lg" />

      {/* Separador */}
      <div className="h-px bg-white/10" />

      {/* Info chips */}
      <div className="flex gap-2">
        <div className="h-6 w-24 bg-white/10 rounded-full" />
        <div className="h-6 w-20 bg-white/10 rounded-full" />
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-2">
        <div className="h-9 flex-1 bg-white/10 rounded-xl" />
        <div className="h-9 flex-1 bg-white/10 rounded-xl" />
      </div>
    </div>
  );
}

export function TemplatesSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <TemplateCardSkeleton key={i} />
      ))}
    </div>
  );
}