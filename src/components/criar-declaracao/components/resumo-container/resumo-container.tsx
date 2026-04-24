import { motion } from "framer-motion";
import { FiCloud, FiCamera } from "react-icons/fi";
import { FaPalette, FaMusic } from "react-icons/fa";

interface RecursoCard {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
  visual: React.ReactNode;
  destaque?: boolean;
}

function PhoneMock({
  children,
  rotacao = 0,
  cor = "#0d0d1a",
}: {
  children: React.ReactNode;
  rotacao?: number;
  cor?: string;
}) {
  return (
    <div
      style={{
        width: 160,
        height: 300,
        background: cor,
        border: "4px solid #1a1a2e",
        boxShadow: "0 0 0 1px #2a2a4a, 0 20px 50px rgba(0,0,0,0.5)",
        borderRadius: 24,
        overflow: "hidden",
        transform: `rotate(${rotacao}deg)`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 40,
          height: 6,
          background: "#1a1a2e",
          borderRadius: 99,
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );
}

function VisualNuvem() {
  return (
    <div className="flex items-end justify-center h-full pt-4 pb-2">
      <div className="relative">
        <div className="flex justify-center mb-[-8px]">
          <div
            className="w-28 h-12 rounded-full"
            style={{ background: "linear-gradient(180deg, #1e1e2e 0%, #2a1a2e 100%)" }}
          />
        </div>
        <PhoneMock rotacao={-5} cor="#0d0d1a">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 pt-6 px-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="#ef4444" className="w-5 h-5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <p className="text-white text-[9px] font-bold text-center">Online para sempre</p>
            <div className="w-full bg-white/5 rounded-lg p-2">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <p className="text-green-400 text-[7px] font-semibold">Ativo agora</p>
              </div>
              <p className="text-white/40 text-[6px] leading-relaxed">
                Acessível de qualquer lugar do mundo, a qualquer momento.
              </p>
            </div>
            <div className="flex gap-1 mt-1">
              {["#ef4444", "#f97316", "#ec4899"].map((c, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
        </PhoneMock>
      </div>
    </div>
  );
}

function VisualPersonalizavel() {
  return (
    <div className="flex items-end justify-center h-full pt-4 pb-2">
      <PhoneMock rotacao={4} cor="#0d0816">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 pt-7 px-3">
          <p className="text-white text-[9px] font-bold text-center">Personalize tudo</p>
          <div className="grid grid-cols-3 gap-1 w-full mt-1">
            {["#ef4444", "#f97316", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"].map((c, i) => (
              <div
                key={i}
                className="rounded-md aspect-square"
                style={{ background: c, opacity: i === 0 ? 1 : 0.7 }}
              />
            ))}
          </div>
          <div className="w-full bg-white/5 rounded-lg p-1.5 mt-1">
            <p className="text-white/30 text-[6px] mb-1">FONTE</p>
            <p className="text-red-400 text-[9px] font-bold">Alex Brush ✦</p>
          </div>
          <div className="w-full bg-white/5 rounded-lg p-1.5">
            <p className="text-white/30 text-[6px] mb-0.5">MÚSICA</p>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="#ef4444" className="w-2 h-2">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-[6px]">Nossa música ♪</p>
            </div>
          </div>
        </div>
      </PhoneMock>
    </div>
  );
}

function VisualRetrospectiva() {
  return (
    <div className="flex items-end justify-center h-full pt-2 pb-2 relative">
      <div className="relative" style={{ width: 200, height: 280 }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, transform: "rotate(-8deg)" }}>
          <PhoneMock cor="#111827">
            <div className="w-full h-full flex flex-col items-center justify-center pt-7 px-3 gap-2">
              <p className="text-white/40 text-[7px] text-center">Alguém especial merece um presente...</p>
              <div className="w-full bg-red-500/20 rounded-lg p-2">
                <p className="text-red-400 text-[8px] font-bold">heartcode.com</p>
              </div>
            </div>
          </PhoneMock>
        </div>
        <div style={{ position: "absolute", right: 0, bottom: 0, transform: "rotate(5deg)", zIndex: 2 }}>
          <PhoneMock cor="#0d0d1a">
            <div className="w-full h-full flex flex-col pt-7 px-3 gap-1.5">
              <p className="text-white/50 text-[6px] text-center font-semibold tracking-widest">WRAPPED DO CASAL</p>
              <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 mx-auto flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="#ef4444" className="w-5 h-5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
                </svg>
              </div>
              <p className="text-white text-[9px] font-bold text-center">Momento Especial</p>
              <p className="text-red-400 text-[7px] text-center">Ana & Carlos</p>
              <div className="bg-white/5 rounded-lg px-2 py-1.5 mt-1">
                <p className="text-white/30 text-[5px] font-semibold tracking-widest">DIAS JUNTOS</p>
                <p className="text-white text-[16px] font-black leading-none">847</p>
              </div>
              <div className="bg-white/5 rounded-lg px-2 py-1.5">
                <p className="text-white/30 text-[5px] font-semibold tracking-widest">HORAS JUNTOS</p>
                <p className="text-white text-[16px] font-black leading-none">20.328</p>
              </div>
            </div>
          </PhoneMock>
        </div>
      </div>
    </div>
  );
}

function VisualMomentos() {
  const emojis = ["📷", "🌹", "🎂", "🎵", "✈️", "🌅", "💌", "🎉", "🥂"];
  return (
    <div className="flex items-end justify-center h-full pt-4 pb-2">
      <PhoneMock rotacao={-3} cor="#0d0816">
        <div className="w-full h-full flex flex-col pt-7 px-3 pb-3">
          <p className="text-white text-[9px] font-bold text-center mb-2">Nossas Memórias</p>
          <div className="grid grid-cols-3 gap-1 flex-1">
            {emojis.map((e, i) => (
              <div key={i} className="bg-white/5 rounded-lg flex items-center justify-center text-sm aspect-square">
                {e}
              </div>
            ))}
          </div>
        </div>
      </PhoneMock>
    </div>
  );
}

const RECURSOS: RecursoCard[] = [
  {
    icon: <FiCloud className="w-5 h-5" />,
    titulo: "Para sempre no ar",
    descricao: "Seu presente vai para a nuvem imediatamente. Para sempre online, acessível de qualquer lugar do mundo.",
    visual: <VisualNuvem />,
  },
  {
    icon: <FaPalette className="w-5 h-5" />,
    titulo: "100% personalizável",
    descricao: "Escolha fotos, músicas, mensagens e jogos interativos. Cada detalhe pensado para emocionar!",
    visual: <VisualPersonalizavel />,
  },
  {
    icon: <FaMusic className="w-5 h-5" />,
    titulo: "Com uma retrospectiva única",
    descricao: "Uma retrospectiva animada para relembrar os melhores momentos dessa história especial.",
    visual: <VisualRetrospectiva />,
    destaque: true,
  },
  {
    icon: <FiCamera className="w-5 h-5" />,
    titulo: "Relembre seus melhores momentos",
    descricao: "O presente digital que faz quem você ama sentir o quanto é especial.",
    visual: <VisualMomentos />,
  },
];

function RecursoCardItem({ recurso, index }: { recurso: RecursoCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl p-5 flex flex-col gap-4 overflow-hidden"
      style={{
        background: recurso.destaque
          ? "rgba(239,68,68,0.06)"
          : "rgba(255,255,255,0.04)",
        border: recurso.destaque
          ? "1.5px solid rgba(239,68,68,0.25)"
          : "1.5px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(239,68,68,0.1)",
          color: "#ef4444",
        }}
      >
        {recurso.icon}
      </div>

      <div>
        <h3 className="font-bold text-white text-base mb-1">{recurso.titulo}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{recurso.descricao}</p>
      </div>

      <div className="flex-1 flex items-end min-h-[220px]">
        {recurso.visual}
      </div>
    </motion.div>
  );
}

export function RecursosCardContainer() {
  return (
    <section className="w-full py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444",
            }}
          >
            ✦ RECURSOS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Crie um presente{" "}
            <span className="text-red-500">memorável</span>{" "}
            e único
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Nossa plataforma oferece tudo para criar uma experiência digital personalizada que vai
            emocionar quem você ama.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RECURSOS.slice(0, 3).map((r, i) => (
            <RecursoCardItem key={i} recurso={r} index={i} />
          ))}
        </div>

        <div className="mt-5">
          <RecursoCardItem recurso={RECURSOS[3]} index={3} />
        </div>
      </div>
    </section>
  );
}