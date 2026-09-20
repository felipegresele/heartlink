import { Star, MessageSquareQuote } from "lucide-react";
import type { JSX } from "react";
import casal1 from "../../img/carrosel-avaliacoes/casal1.jpg"
import casal2 from "../../img/carrosel-avaliacoes/casal2.jpg"
import casal3 from "../../img/carrosel-avaliacoes/casal3.jpg"
import casal4 from "../../img/carrosel-avaliacoes/casal4.jpg"
import casal5 from "../../img/carrosel-avaliacoes/casal5.jpg"
import casal6 from "../../img/carrosel-avaliacoes/casal6.jpg"

interface Testimonial {
  name: string;
  time: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  img: string | null; // depois: URL da foto do cliente
}

const testimonials: Testimonial[] = [
  {
    name: "Lucas e Carol",
    time: "3 meses atrás",
    rating: 5,  
    text: "Montei uma página surpresa para a Carol, com nossas fotos de viagem e uma mensagem sincera. Ela adorou! Com certeza vou usar de novo.",
    img: casal1,
  },
  {
    name: "Camila e Felipe",
    time: "4 meses atrás",
    rating: 5,
    text: "A interface é simples e criar uma página com nossas fotos e músicas favoritas foi super especial!",
    img: casal2,
  },
  {
    name: "Marcos",
    time: "5 dias atrás",
    rating: 5,
    text: "Criei em cinco minutos e ficou incrível. Minha namorada amou! Perfeito pra quem precisa de um presente de última hora.",
    img: casal3,
  },
  {
    name: "Bia e Lucas",
    time: "1 mês atrás",
    rating: 5,
    text: "Recebi como surpresa e não aguentei de tanta emoção! Ver nossa história contada desse jeito, com nossas fotos e músicas... simplesmente perfeito!",
    img: casal4,
  },
  {
    name: "João e Mari",
    time: "1 mês atrás",
    rating: 4,
    text: "Na moral, melhor presente que já dei! Fiz de surpresa e quando ela viu todas as nossas fotos na retrospectiva animada, começou a chorar. Valeu demais!",
    img: casal5,
  },
  {
    name: "Diego e Ju",
    time: "3 dias atrás",
    rating: 5,
    text: "Simples, rápido e o resultado ficou incrível! Consegui montar tudo em menos de 30min e o pagamento por pix foi aprovado na hora. Recomendo!",
    img: casal6,
  },
];

interface AvatarProps {
  name: string;
  img: string | null;
}

function Avatar({ name, img }: AvatarProps): JSX.Element {
  const initials: string = name
    .split(" ")
    .filter((w: string) => w.toLowerCase() !== "e")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  if (img) {
    return (
      <img
        src={img}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400 text-sm font-semibold text-white">
      {initials}
    </div>
  );
}

interface StarsProps {
  rating: Testimonial["rating"];
}

function Stars({ rating }: StarsProps): JSX.Element {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-pink-400 text-pink-400" : "fill-pink-100 text-pink-100"
          }
        />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  item: Testimonial;
}

function TestimonialCard({ item }: TestimonialCardProps): JSX.Element {
  return (
    <div className="flex w-[300px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <div>
        <Stars rating={item.rating} />
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
          “{item.text}”
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
        <Avatar name={item.name} img={item.img} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-400">{item.time}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials(): JSX.Element {
  // duplicamos a lista para o loop ficar contínuo (sem "salto" no final)
  const loop: Testimonial[] = [...testimonials, ...testimonials];

  return (
    <section className="bg-pink-50/40 px-6 py-20">
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: slide-left 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 px-4 py-1.5 text-xs font-medium text-pink-500">
          <MessageSquareQuote size={14} />
          Depoimentos de clientes
        </span>

        <h2 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
          O que nossos <span className="text-pink-400">clientes</span> dizem
        </h2>

        <p className="mt-4 max-w-xl text-gray-500">
          Histórias reais de pessoas que criaram presentes digitais para
          surpreender alguém especial.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden">
        {/* sombras nas bordas para o efeito de "aparecendo e desaparecendo" */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-pink-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-pink-50 to-transparent" />

        <div className="flex w-max gap-5 marquee-track">
          {loop.map((item: Testimonial, i: number) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}