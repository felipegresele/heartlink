import { useState } from "react";
import type { EscolherMusicaProps, Video } from "../../../../schema/music";

const YOUTUBE_API_KEY = "AIzaSyB2pnDIwOL2YRC9Ryu4m8d1aDkVNrmmByE";

export default function ContentEscolherMusica({onMusicSelect}: EscolherMusicaProps) {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoSelecionado, setVideoSelecionado] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const buscarMusicas = async () => {
    if (!query.trim()) return;

    setCarregando(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=6&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();

      console.log(data)

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
    <div className="space-y-4">
      {/* Campo de busca */}
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-800 rounded-md text-white"
          placeholder="Buscar música no YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarMusicas()}
        />
        <button
          onClick={buscarMusicas}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Player do vídeo selecionado */}
      {videoSelecionado && (
        <div className="w-full aspect-video rounded-md overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoSelecionado}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* Lista de resultados */}
      <div className="grid grid-cols-2 gap-3">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              setVideoSelecionado(video.id)
              onMusicSelect(video)
            }}
            className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
              videoSelecionado === video.id
                ? "border-red-500"
                : "border-transparent hover:border-gray-500"
            }`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full object-cover"
            />
            <div className="p-2 bg-gray-800">
              <p className="text-sm font-medium line-clamp-2">{video.title}</p>
              <p className="text-xs text-gray-400 mt-1">{video.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}