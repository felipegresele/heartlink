import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaHeart, FaLock, FaLockOpen, FaRandom, FaRedo, FaTimes } from "react-icons/fa";

import imgLogo from "../../../../../img/logo-heartcode.webp";
import MusicPlayerFooter from "../../music/exibir-musica";
import ModalPresente from "../modal/modal-ver-presente";
import { WHEEL_COLORS, type RetrospectiveData, type SectionType } from "../../../../../schema/retrospectiva";
import { RetrospectiveBtn } from "../../forms-templates/retrospectiva/botao-retrospectiva";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { FiClock, FiImage } from "react-icons/fi";

// ── Label e emoji de cada seção ──────────────────────────────────────────────
const SECTION_META: Record<SectionType, { label: string; emoji: React.ReactNode }> = {
  timeline: { label: "Nossa Linha do Tempo", emoji: <FiClock /> },
  wheel:    { label: "Roleta de Aventuras",  emoji: <FaRandom /> },
  gallery:  { label: "Nossa Galeria",        emoji: <FiImage /> },
  enigma:   { label: "O que eu amo em você", emoji: <IoExtensionPuzzleSharp /> },
};

const CARD_EMOJIS = ["💕", "🌹", "✨", "💫", "🌸", "💎"];

// ════════════════════════════════════════════════════════════════════════════
// RETROSPECTIVA STORIES MODAL
// Exibe cada seção como um "story" com barra de progresso e botão próxima
// ════════════════════════════════════════════════════════════════════════════
function RetrospectiveModal({
  data,
  onClose,
}: {
  data: RetrospectiveData;
  onClose: () => void;
}) {
  const secoes = data.secoesSelecionadas;
  const [secaoAtual, setSecaoAtual] = useState(0);
  const total = secoes.length;

  const isUltima = secaoAtual === total - 1;

  function proximo() {
    if (isUltima) {
      onClose();
    } else {
      setSecaoAtual((prev) => prev + 1);
    }
  }

  function anterior() {
    if (secaoAtual > 0) setSecaoAtual((prev) => prev - 1);
  }

  const secao = secoes[secaoAtual];
  const meta = SECTION_META[secao];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-gray-950"
    >
      {/* ── Barra de progresso (stories) ── */}
      <div className="flex gap-1.5 px-4 pt-4 pb-2">
        {secoes.map((_, i) => (
          <div key={i} className="flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-pink-400 rounded-full"
              initial={{ width: i < secaoAtual ? "100%" : "0%" }}
              animate={{ width: i < secaoAtual ? "100%" : i === secaoAtual ? "100%" : "0%" }}
              transition={i === secaoAtual ? { duration: 0, delay: 0 } : {}}
            />
          </div>
        ))}
      </div>

      {/* ── Header da seção ── */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{meta.emoji}</span>
          <span className="text-white font-bold text-sm">{meta.label}</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors p-1"
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* ── Conteúdo da seção ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={secao}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {secao === "timeline" && <TimelineView items={data.timeline} />}
            {secao === "wheel"    && <WheelView items={data.wheel} />}
            {secao === "gallery"  && <GalleryView items={data.gallery} />}
            {secao === "enigma"   && <EnigmaView items={data.enigma} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navegação ── */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-white/10">
        <button
          onClick={anterior}
          disabled={secaoAtual === 0}
          className="text-white/40 disabled:opacity-20 hover:text-white transition-colors px-4 py-2 rounded-xl text-sm font-semibold"
        >
          ← Anterior
        </button>

        <span className="text-white/30 text-xs font-medium">
          {secaoAtual + 1} / {total}
        </span>

        <button
          onClick={proximo}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-pink-500/30 hover:opacity-90 transition-opacity"
        >
          {isUltima ? (
            <>Finalizar <FaHeart size={12} /></>
          ) : (
            <>Próxima <FaChevronRight size={12} /></>
          )}
        </button>
      </div>
    </motion.div>
  );
}


// ════════════════════════════════════════════════════════════════════════════
// SEÇÕES INTERNAS
// ════════════════════════════════════════════════════════════════════════════

function TimelineView({ items }: { items: RetrospectiveData["timeline"] }) {
  if (!items.length) return null;
  return (
    <div className="relative pt-4 pb-2">
      {/* Linha central */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-transparent" />

      {items.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex mb-10 items-center"
          >
            {/* Bolinha central */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 border-2 border-gray-950 shadow-lg shadow-pink-500/50 z-10" />

            {isLeft ? (
              <>
                {/* ESQUERDA: foto polaroid */}
                <div className="w-[calc(50%-20px)] flex justify-end pr-5">
                  {item.imagem && (
                    <div className="bg-white p-2 pb-6 shadow-xl rotate-[-3deg] hover:rotate-0 transition-transform duration-300 max-w-[120px]">
                      <img src={item.imagem} alt={item.titulo} className="w-full h-[90px] object-cover" />
                    </div>
                  )}
                </div>
                {/* DIREITA: info */}
                <div className="w-[calc(50%-20px)] pl-5">
                  <p className="text-pink-400 font-bold text-sm leading-tight">{item.titulo}</p>
                  {item.descricao && (
                    <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.descricao}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* ESQUERDA: info */}
                <div className="w-[calc(50%-20px)] pr-5 text-right">
                  <p className="text-pink-400 font-bold text-sm leading-tight">{item.titulo}</p>
                  {item.descricao && (
                    <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.descricao}</p>
                  )}
                </div>
                {/* DIREITA: foto polaroid */}
                <div className="w-[calc(50%-20px)] flex justify-start pl-5">
                  {item.imagem && (
                    <div className="bg-white p-2 pb-6 shadow-xl rotate-[3deg] hover:rotate-0 transition-transform duration-300 max-w-[120px]">
                      <img src={item.imagem} alt={item.titulo} className="w-full h-[90px] object-cover" />
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function WheelView({ items }: { items: RetrospectiveData["wheel"] }) {
  const [anguloAtual, setAnguloAtual] = useState(0);
  const [girando, setGirando] = useState(false);
  const [vencedor, setVencedor] = useState<string | null>(null);

  if (!items.length) return null;

  function girar() {
    if (items.length < 2 || girando) return;
    setGirando(true);
    setVencedor(null);
    const totalAngulo = anguloAtual + 5 * 360 + Math.random() * 360;
    setAnguloAtual(totalAngulo);
    setTimeout(() => {
      const final = totalAngulo % 360;
      const fatia = 360 / items.length;
      const idx = Math.floor(((360 - final) % 360) / fatia) % items.length;
      setVencedor(items[idx].texto);
      setGirando(false);
    }, 3600);
  }

  const cx = 150, cy = 150, r = 140;
  const fatia = (2 * Math.PI) / items.length;

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[22px] border-l-transparent border-r-transparent border-b-white drop-shadow-lg" />
        </div>
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          animate={{ rotate: anguloAtual }}
          transition={{ duration: 3.5, ease: [0.15, 0.9, 0.3, 1] }}
        >
          {items.map((item, i) => {
            const startAngle = i * fatia - Math.PI / 2;
            const endAngle = startAngle + fatia;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const largeArc = fatia > Math.PI ? 1 : 0;
            const midAngle = startAngle + fatia / 2;
            const tx = cx + r * 0.65 * Math.cos(midAngle);
            const ty = cy + r * 0.65 * Math.sin(midAngle);
            const d = `M${cx},${cy} L${x1},${y1} A${r},${r},0,${largeArc},1,${x2},${y2} Z`;
            return (
              <g key={item.id}>
                <path d={d} fill={WHEEL_COLORS[i % WHEEL_COLORS.length]} stroke="#030712" strokeWidth="2" />
                <text
                  x={tx} y={ty}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="white"
                  fontSize={items.length > 6 ? "9" : "11"}
                  fontWeight="bold"
                  transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${tx}, ${ty})`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {item.texto.length > 10 ? item.texto.slice(0, 10) + "…" : item.texto}
                </text>
              </g>
            );
          })}
          <circle cx="150" cy="150" r="18" fill="#030712" stroke="white" strokeWidth="3" />
          <circle cx="150" cy="150" r="8" fill="white" />
        </motion.svg>
      </div>

      <button
        onClick={girar}
        disabled={girando || items.length < 2}
        className={`flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-all ${
          girando
            ? "bg-white/10 text-white/40 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-pink-500/30"
        }`}
      >
        <motion.span
          animate={girando ? { rotate: 360 } : { rotate: 0 }}
          transition={girando ? { repeat: Infinity, duration: 0.8, ease: "linear" } : {}}
        >
          <FaRedo size={14} />
        </motion.span>
        {girando ? "Girando…" : "Girar a Roleta"}
      </button>

      <AnimatePresence>
        {vencedor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-white/50 text-xs mb-1">Sorteado!</p>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {vencedor} 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryView({ items }: { items: RetrospectiveData["gallery"] }) {
  const [modalItem, setModalItem] = useState<{ imagem: string; descricao?: string } | null>(null);
  if (!items.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.07 }}
            className="relative group rounded-xl overflow-hidden cursor-zoom-in border border-white/10"
            onClick={() => setModalItem({ imagem: item.imagem, descricao: item.descricao })}
          >
            <img
              src={item.imagem}
              alt={item.descricao}
              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.descricao && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs">{item.descricao}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="flex flex-col items-center gap-3 max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalItem.imagem}
                alt="Ampliado"
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              {modalItem.descricao && (
                <p className="text-white/80 text-sm text-center px-4 leading-relaxed">
                  {modalItem.descricao}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EnigmaView({ items }: { items: RetrospectiveData["enigma"] }) {
  const [revelados, setRevelados] = useState<Set<string>>(new Set());

  if (!items.length) return null;

  function toggle(id: string) {
    setRevelados((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {items.map((item, idx) => {
        const revelado = revelados.has(item.id);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggle(item.id)}
            className="cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {!revelado ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-pink-500/30 bg-gradient-to-br from-pink-900/40 to-purple-900/40"
                >
                  <FaLock className="text-pink-400" size={20} />
                  <p className="text-pink-300 text-xs font-bold">Toque para revelar</p>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-28 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/20 bg-white/5 p-3 text-center"
                >
                  <span className="text-xl">{CARD_EMOJIS[idx % CARD_EMOJIS.length]}</span>
                  <p className="text-white text-xs font-semibold leading-tight">{item.texto}</p>
                  <FaLockOpen className="text-white/20" size={10} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE READY — COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════════════════════
export default function PageReady({
  titulo,
  mensagem,
  imagens = [],
  dataConhecimento,
  musicaId,
  musicaTitulo,
  usuarioNome,
  retrospectiva,
}: {
  titulo: string;
  mensagem: string;
  imagens: string[];
  dataConhecimento: string;
  musicaId?: string;
  musicaTitulo?: string;
  usuarioNome: string;
  retrospectiva?: RetrospectiveData;
}) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempo, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [musica, setMusica] = useState<null | {
    id: string;
    title: string;
    channelTitle: string;
    thumbnail: string;
    duration: number;
  }>(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [mostrarRetrospectiva, setMostrarRetrospectiva] = useState(false);

  // Inicializa música
  useEffect(() => {
    if (musicaId && musicaTitulo) {
      setMusica({
        id: musicaId,
        title: musicaTitulo,
        channelTitle: "Youtube",
        thumbnail: `https://img.youtube.com/vi/${musicaId}/hqdefault.jpg`,
        duration: 0,
      });
    }
  }, [musicaId, musicaTitulo]);

  useEffect(() => {
    if (imagens.length === 0) return;
    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [imagens]);

  // Contador de tempo
  useEffect(() => {
    if (!dataConhecimento) return;
    const intervalo = setInterval(() => {
      const agora = new Date();
      const inicio = new Date(dataConhecimento);

      let diff = agora.getTime() - inicio.getTime();
      let segundos = Math.floor(diff / 1000);
      let minutos = Math.floor(segundos / 60);
      let horas = Math.floor(minutos / 60);
      let dias = Math.floor(horas / 24);
      let anos = Math.floor(dias / 365);

      segundos %= 60;
      minutos %= 60;
      horas %= 24;
      dias %= 365;
      const meses = Math.floor(dias / 30);
      dias %= 30;

      setTempo({ anos, meses, dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dataConhecimento]);

  const temRetrospectiva =
    retrospectiva && retrospectiva.secoesSelecionadas.length > 0;

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center text-white pb-24 px-4">
      {mostrarModal && (
        <ModalPresente
          usuarioNome={usuarioNome}
          corTextos="#c92921"
          onClose={() => setMostrarModal(false)}
        />
      )}

      {/* Modal de retrospectiva (stories) */}
      <AnimatePresence>
        {mostrarRetrospectiva && temRetrospectiva && (
          <RetrospectiveModal
            data={retrospectiva!}
            onClose={() => setMostrarRetrospectiva(false)}
          />
        )}
      </AnimatePresence>

      <img src={imgLogo} className="h-30"/>

      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl flex flex-col items-center shadow-xl">
        <div className="bg-white w-[320px] flex flex-col items-center justify-center px-3 pt-3 pb-6 shadow-lg">
          {imagens.length > 0 && (
            <div className="w-full max-w-md mb-4 relative">
              <img
                src={imagens[indiceAtual]}
                alt="Presente"
                className="w-full h-72 object-cover rounded-md shadow-lg"
              />
              <div className="flex justify-center mt-2 gap-2">
                {imagens.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === indiceAtual ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <p className="text-xl font-semibold text-black mb-4 text-center mt-2">
            {titulo}
          </p>
        </div>

        <p className="mb-6 mt-6 whitespace-pre-wrap text-gray-200 text-center">
          {mensagem}
        </p>

        {dataConhecimento && (
          <div className="w-full text-center">
            <h3 className="mb-3 text-lg text-gray-200">
              Compartilhando momentos há
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.entries(tempo).map(([label, value]) => (
                <div
                  key={label}
                  className="bg-black/60 rounded-md p-3 flex flex-col items-center border border-white/10"
                >
                  <span className="text-2xl font-bold">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Desde {new Date(dataConhecimento).toLocaleDateString("pt-BR")}
            </p>
          </div>
        )}
      </div>

      {/* Botão de retrospectiva — só aparece se houver seções configuradas */}
      {temRetrospectiva && (
        <RetrospectiveBtn isVisible={() => setMostrarRetrospectiva(true)} />
      )}

      {musica && <MusicPlayerFooter musica={musica} />}
    </div>
  );
}