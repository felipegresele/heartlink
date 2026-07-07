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
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

interface SecaoConfig {
  id: SectionType | "time";
  badge: string;
  badgeIcon: React.ReactNode;
  titulo: string;
  descricao: string;
  cor: string;
  videoUrl?: string;
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
  },
  {
    id: "quiz",
    badge: "Quiz",
    badgeIcon: <HiMiniQuestionMarkCircle size={11} />,
    titulo: "Quanto Você Me Conhece?",
    descricao:
      "Será que essa pessoa consegue acertar todas as respostas?",
    cor: "#df0f39",
    videoUrl: videoEnigma,
  },
  {
    id: "rainStar",
    badge: "Memória Estrelada",
    badgeIcon: <IoStar size={11} />,
    titulo: "Mapa Estrelado",
    descricao:
      "Explore uma constelação onde cada estrela revela uma lembrança especial da história de vocês.",
    cor: "#3B82F6",
    videoUrl: videoEnigma,
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
  },
];