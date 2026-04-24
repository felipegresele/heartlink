import { useState } from "react";
import type { EscolherMusicaProps, Video } from "../../../../schema/music";

const YOUTUBE_API_KEY = "AIzaSyB2pnDIwOL2YRC9Ryu4m8d1aDkVNrmmByE";

export default function ContentEscolherMusica({
  onMusicSelect,
}: EscolherMusicaProps) {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [musicaSelecionadaId, setMusicaSelecionadaId] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const buscarMusicas = async () => {
    if (!query.trim()) return;

    setCarregando(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&videoCategoryId=10&maxResults=10&key=${YOUTUBE_API_KEY}`
      );

      const data = await res.json();

      const resultados: Video[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
      }));

      setVideos(resultados);
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 bg-gray-800 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Buscar música no YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarMusicas()}
        />
        <button
          onClick={buscarMusicas}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-medium"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {carregando && (
        <p className="text-gray-400 text-sm">Carregando músicas...</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              setMusicaSelecionadaId(video.id);
              onMusicSelect(video);
            }}
            className={`cursor-pointer flex gap-2 p-2 rounded-lg border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              musicaSelecionadaId === video.id
                ? "border-red-500 bg-red-500/10 shadow-md shadow-red-500/20"
                : "border-transparent hover:border-gray-600 hover:bg-gray-800/60"
            }`}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-14 object-cover rounded-md"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <div className="bg-black/60 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-2 leading-tight">
                {video.title}
              </p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                {video.channelTitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!carregando && videos.length === 0 && (
        <p className="text-gray-500 text-sm text-center">
          Busque por uma música para começar 🎵
        </p>
      )}
    </div>
  );
}