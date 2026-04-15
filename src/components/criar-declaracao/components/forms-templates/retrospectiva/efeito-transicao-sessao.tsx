import { useEffect, useState } from "react";

type Props = {
  senderName: string;
  totalDias: number;
  totalHoras: number;
  fotos: string[];
};

export default function SpotifySingleScreen({
  senderName,
  totalDias,
  totalHoras,
  fotos,
}: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2000), // frase inicial
      setTimeout(() => setStep(2), 4000), // dias + histórias
      setTimeout(() => setStep(3), 7000), // fotos caindo
      setTimeout(() => setStep(4), 10000), // horas grande
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
      
      {/* STEP 0 - FRASE INICIAL */}
      {step === 0 && (
        <div className="text-center animate-fade">
          <h1 className="text-3xl font-bold">{senderName}</h1>
          <p className="text-lg mt-2 opacity-70">
            os momentos que mais marcaram esse casal
          </p>
        </div>
      )}

      {/* STEP 1 - DIAS */}
      {step === 1 && (
        <div className="text-center animate-fade">
          <h1 className="text-5xl font-bold">{totalDias} dias</h1>
          <p className="text-lg mt-2 opacity-70">
            de histórias e memórias
          </p>
        </div>
      )}

      {/* STEP 2 - FOTOS CAINDO */}
      {step === 2 && (
        <div className="absolute w-full h-full overflow-hidden">
          {fotos.map((foto, i) => (
            <img
              key={i}
              src={foto}
              className="absolute w-40 rounded-xl shadow-2xl opacity-60 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* STEP 3 - HORAS GRANDE */}
      {step === 3 && (
        <div className="text-center animate-fade">
          <h1 className="text-[80px] font-extrabold">
            {totalHoras}h
          </h1>
        </div>
      )}
    </div>
  );
}