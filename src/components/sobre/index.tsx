export function Sobre() {
  return (
    <main className="bg-black text-white min-h-screen font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-28 pb-24 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-[120px]" />
        </div>
        <span className="inline-block text-red-500 text-sm font-bold tracking-widest uppercase mb-4">
          Nossa história
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight max-w-4xl mx-auto">
          Presentes que contam{" "}
          <span className="text-red-600">a sua história</span>
        </h1>
        <p className="mt-6 text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          A HeartCode nasceu de uma ideia simples: que um presente de verdade
          não precisa ser físico — precisa ser algo que emociona de verdade.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-black tracking-tighter mb-12 text-center">
          Como tudo começou
        </h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />
          {[
            {
              ano: "2025",
              titulo: "A ideia",
              texto:
                "Percebemos que faltava algo no mercado de presentes digitais. As opções eram genéricas, sem personalidade. Os presentes físicos nem sempre traduziam o que a gente sente por alguém.",
            },
            {
              ano: "Construção",
              titulo: "Nasce a HeartCode",
              texto:
                "Criamos uma plataforma onde qualquer pessoa monta, em minutos, uma página romântica personalizada — com galeria de fotos, retrospectiva animada, músicas, QR Code e muito mais.",
            },
            {
              ano: "Hoje",
              titulo: "Histórias reais",
              texto:
                "Cada página criada é uma história real — aniversários de namoro, pedidos de casamento, homenagens entre casais — contada de um jeito único e inesquecível.",
            },
          ].map((item, i) => (
            <div key={i} className="relative pl-14 mb-12 last:mb-0">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-xs font-black text-white shrink-0">
                ♥
              </div>
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
                {item.ano}
              </span>
              <h3 className="text-xl font-black mt-1 mb-2">{item.titulo}</h3>
              <p className="text-gray-400 leading-relaxed">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Por que HeartCode */}
      <section className="bg-white/[0.03] border-y border-white/10 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black tracking-tighter text-center mb-14">
            Por que a HeartCode?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "⚡",
                titulo: "Pronto em minutos",
                texto:
                  "Você escolhe as seções, adiciona fotos, músicas e textos. Sem complicação e sem conhecimento técnico.",
              },
              {
                emoji: "☁️",
                titulo: "Para sempre no ar",
                texto:
                  "A página fica hospedada na nuvem com acesso permanente, de qualquer dispositivo e a qualquer hora.",
              },
              {
                emoji: "📱",
                titulo: "QR Code exclusivo",
                texto:
                  "Cada página gera um QR Code personalizado enviado por e-mail para você surpreender de um jeito único.",
              },
              {
                emoji: "🔄",
                titulo: "Atualizações grátis",
                texto:
                  "Novas seções e funcionalidades são adicionadas com frequência — e você recebe tudo sem custo extra.",
              },
              {
                emoji: "💖",
                titulo: "Sessão Retrospectiva",
                texto:
                  "Reviva cada momento especial da história de vocês em uma experiência única e emocionante. Com uma galeria de fotos do casal, uma linha do tempo cheia de memórias, roleta divertida para decidir o próximo encontro, jogos interativos e muito mais, essa seção foi criada para tocar o coração e surpreender quem você ama.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-600/40 hover:bg-white/[0.07] transition-all duration-300"
              >
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="text-lg font-black mt-3 mb-2">{card.titulo}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que nos guia */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-black tracking-tighter text-center mb-14">
          O que nos guia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              titulo: "Conexão verdadeira",
              texto:
                "Cada funcionalidade existe para transformar um gesto simples em algo que emociona de verdade. A tecnologia aproxima, não afasta.",
            },
            {
              titulo: "Experiência impecável",
              texto:
                "Do momento da criação até a hora em que a pessoa abre o presente — tudo é pensado para surpreender. Detalhes fazem toda a diferença.",
            },
            {
              titulo: "Suporte de verdade",
              texto:
                "Cada cliente é único. Nosso atendimento é rápido, atencioso e humano em todas as etapas, da criação à entrega.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <h3 className="text-xl font-black">{item.titulo}</h3>
              <p className="text-gray-400 leading-relaxed">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-red-600/10 rounded-full blur-[100px]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
          Crie um presente que emociona
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          São poucos minutos para transformar suas memórias em algo
          inesquecível.
        </p>
        <a
          href="/criar"
          className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105"
        >
          Criar minha página ❤️
        </a>
      </section>
    </main>
  );
}
