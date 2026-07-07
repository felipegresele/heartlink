export default function SectionPopularPlaylist({
  titulo,
  imagens,
}: {
  titulo: string;
  imagens: string[];
}) {
  return (
    <div className="px-5 mt-9">
      <h2 className="text-lg font-extrabold mb-3">Populares</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          {
            titulo: "Memória 1",
            artista: { titulo },
            duracao: "2:47",
            tocando: true,
          },
          {
            titulo: "Memória 2",
            artista: { titulo },
            duracao: "3:15",
            tocando: false,
          },
          {
            titulo: "Memória 3",
            artista: { titulo },
            duracao: "4:01",
            tocando: false,
          },
          {
            titulo: "Memória 4",
            artista: { titulo },
            duracao: "2:58",
            tocando: false,
          },
        ].map((musica, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 rounded-xl p-2.5 ${
              musica.tocando
                ? "bg-[#1ED760]/10 border border-[#1ED760]/30"
                : "bg-[#1a1a1a] border border-white/10"
            }`}
          >
            <div className="relative w-11 h-11 rounded-md overflow-hidden shrink-0 bg-white/10">
              <img
                src={imagens[i] || imagens[0]}
                alt={musica.titulo}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-bold truncate ${
                  musica.tocando ? "text-[#1ED760]" : "text-white"
                }`}
              >
                {musica.titulo}
              </p>
              <p className="text-[11px] text-white/50 truncate">{titulo}</p>
            </div>

            {musica.tocando ? (
              <div className="flex items-end gap-[2px] h-3.5 shrink-0">
                <span
                  className="w-[2px] bg-[#1ED760] rounded-full animate-[eq_0.8s_ease-in-out_infinite]"
                  style={{ height: "40%", animationDelay: "0s" }}
                />
                <span
                  className="w-[2px] bg-[#1ED760] rounded-full animate-[eq_0.8s_ease-in-out_infinite]"
                  style={{ height: "100%", animationDelay: "0.15s" }}
                />
                <span
                  className="w-[2px] bg-[#1ED760] rounded-full animate-[eq_0.8s_ease-in-out_infinite]"
                  style={{ height: "65%", animationDelay: "0.3s" }}
                />
              </div>
            ) : (
              <span className="text-[11px] text-white/40 shrink-0">
                {musica.duracao}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
