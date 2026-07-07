import { FiCalendar, FiImage } from "react-icons/fi";
import { FaRandom } from "react-icons/fa";
import { IoExtensionPuzzleSharp, IoStar } from "react-icons/io5";
import { FaTimeline } from "react-icons/fa6";
import videoLinhaTempo from "../img/retrospectiva-sessao/video-linha-tempo.mp4";
import videoGaleria from "../img/retrospectiva-sessao/video-galeria.mp4";
import videoRoleta from "../img/retrospectiva-sessao/video-roleta.mp4";
import videoEnigma from "../img/retrospectiva-sessao/video-enigma.mp4";
import videoIntroducao from "../img/retrospectiva-sessao/video-introducao.mp4";
import type { SectionType } from "../schema/retrospectiva";

interface SecaoConfig {
  id: SectionType | "time";
  badge: string;
  badgeIcon: React.ReactNode;
  titulo: string;
  descricao: string;
  cor: string;
  videoUrl?: string;
  preview: React.ReactNode;
}

export const SECOES: SecaoConfig[] = [
  {
    id: "timeline",
    badge: "Linha do Tempo",
    badgeIcon: <FiCalendar size={11} />,
    titulo: "Linha do Tempo",
    descricao:
      "Reviva sua jornada com uma linha do tempo animada e elegante, destacando os marcos mais importantes da sua história.",
    cor: "#ec4899",
    videoUrl: videoLinhaTempo,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col px-3 pt-5 pb-2">
        <p className="text-white text-[13px] font-bold text-center">
          Nossa Jornada
        </p>
        <p className="text-white/40 text-[9px] text-center mb-3">
          Cada momento que nos trouxe até aqui
        </p>
        <div className="flex flex-col gap-2 overflow-hidden">
          {[
            {
              mes: "Maio 2022",
              texto: "Nossas almas se encontraram pela primeira vez",
              emoji: "📷",
            },
            {
              mes: "Jun 2022",
              texto: "Nosso primeiro encontro especial",
              emoji: "🌹",
            },
            {
              mes: "Dez 2022",
              texto: "Viagem inesquecível juntos",
              emoji: "✈️",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-2 flex gap-2 items-start"
            >
              <div className="w-9 h-11 bg-white/5 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                {item.emoji}
              </div>
              <div>
                <p className="text-pink-400 text-[9px] font-semibold mb-0.5">
                  {item.mes}
                </p>
                <p className="text-white/60 text-[8px] leading-snug">
                  {item.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "wheel",
    badge: "Roleta",
    badgeIcon: <FaRandom size={11} />,
    titulo: "Roleta",
    descricao:
      "Deixe o acaso decidir a próxima aventura do casal. Gire e descubram juntos o que fazer a seguir.",
    cor: "#a855f7",
    videoUrl: videoRoleta,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-white text-[13px] font-bold">Próxima Aventura</p>
        <p className="text-white/40 text-[9px]">Gire para descobrir</p>
        <div
          className="w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center relative overflow-hidden"
          style={{
            background:
              "conic-gradient(#ec4899 0deg 60deg, #a855f7 60deg 120deg, #6ee7b7 120deg 180deg, #fbbf24 180deg 240deg, #f87171 240deg 300deg, #60a5fa 300deg 360deg)",
          }}
        >
          <div className="w-6 h-6 rounded-full bg-[#0d0816] border-[3px] border-[#1a1a2e]" />
        </div>
        <p className="text-white/30 text-[9px]">Toque para girar</p>
      </div>
    ),
  },
  {
    id: "gallery",
    badge: "Galeria",
    badgeIcon: <FiImage size={11} />,
    titulo: "Galeria de Fotos",
    descricao:
      "Um mosaico cheio de memórias. Adicione fotos e legendas especiais para cada momento marcante da história de vocês.",
    cor: "#3b82f6",
    videoUrl: videoGaleria,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col px-3 pt-5 pb-3">
        <p className="text-white text-[13px] font-bold text-center mb-3">
          Nossas Memórias
        </p>
        <div className="grid grid-cols-3 gap-1 flex-1">
          {["📷", "🌹", "🎂", "🎵", "✈️", "🌅", "💌", "🎉", "🥂"].map(
            (e, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-lg flex items-center justify-center text-sm aspect-square"
              >
                {e}
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    id: "enigma",
    badge: "Jogo de Palavras",
    badgeIcon: <IoExtensionPuzzleSharp size={11} />,
    titulo: "Jogo de Palavras",
    descricao:
      "Cartões interativos que revelam as palavras que descrevem o amor de vocês. Uma experiência única e divertida.",
    cor: "#f59e0b",
    videoUrl: videoEnigma,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-white text-[12px] font-bold">Adivinhe a palavra</p>
        <div className="flex gap-1">
          {["A", "M", "O", "R", "❤️", "S"].map((l, i) => (
            <div
              key={i}
              className="w-[22px] h-[22px] bg-[#1a1a2e] rounded flex items-center justify-center text-amber-400 text-[10px] font-bold"
            >
              {l}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="w-[22px] h-[22px] bg-[#0d0d1a] border border-white/10 rounded"
              />
            ))}
        </div>
        <p className="text-white/30 text-[9px]">Toque nas letras ✨</p>
      </div>
    ),
  },
  {
    id: "rainStar",
    badge: "Memória Estrelada",
    badgeIcon: <IoStar size={11} />,
    titulo: "Memória Estrelada",
    descricao:
      "Explore uma constelação onde cada estrela revela uma lembrança especial da história de vocês.",
    cor: "#3B82F6",
    videoUrl: videoEnigma,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-white text-[12px] font-bold">Adivinhe a palavra</p>
        <div className="flex gap-1">
          {["A", "M", "O", "R", "❤️", "S"].map((l, i) => (
            <div
              key={i}
              className="w-[22px] h-[22px] bg-[#1a1a2e] rounded flex items-center justify-center text-amber-400 text-[10px] font-bold"
            >
              {l}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="w-[22px] h-[22px] bg-[#0d0d1a] border border-white/10 rounded"
              />
            ))}
        </div>
        <p className="text-white/30 text-[9px]">Toque nas letras ✨</p>
      </div>
    ),
  },
  {
    id: "time",
    badge: "Intro Animada",
    badgeIcon: <FaTimeline size={11} />,
    titulo: "Intro Animada do Casal",
    descricao:
      "Uma intro estilo Spotify Wrapped com o tempo de vocês, fotos caindo e efeitos de pixel. Aparece primeiro ao abrir a retrospectiva antes das outras sessões selecionadas.",
    cor: "#ec4899",
    videoUrl: videoIntroducao,
    preview: (
      <div className="w-full h-full bg-[#0d0816] flex flex-col items-center justify-center gap-2.5 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #a855f7 2px, #a855f7 3px)",
          }}
        />
        <div className="flex gap-1 mb-1">
          {["#ec4899", "#a855f7", "#8b5cf6"].map((c, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-sm"
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="text-white/40 text-[9px] font-mono">pixels →</p>
        <p className="text-white text-sm font-extrabold tracking-wide">
          Nome do Casal
        </p>
        <div className="flex gap-4 mt-1">
          <div className="text-center">
            <p className="text-pink-400 text-lg font-black">365d</p>
            <p className="text-white/30 text-[8px]">dias</p>
          </div>
          <div className="text-center">
            <p className="text-purple-400 text-lg font-black">8760h</p>
            <p className="text-white/30 text-[8px]">horas</p>
          </div>
        </div>
        <span className="absolute top-5 right-3 text-sm opacity-40">✨</span>
        <span className="absolute bottom-7 left-3 text-xs opacity-30">💫</span>
      </div>
    ),
  },
];