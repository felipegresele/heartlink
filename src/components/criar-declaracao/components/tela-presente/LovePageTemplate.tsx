import { useEffect, useState } from "react";

export default function LovePagePresente({
  titulo,
  mensagem,
  imagens,
  dataConhecimento,
}: {
  titulo: string;
  mensagem: string;
  imagens: string[];
  dataConhecimento: string;
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

  // carrossel automático
  useEffect(() => {
    if (!imagens || imagens.length === 0) return;

    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [imagens]);

  // contador tempo
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

      segundos = segundos % 60;
      minutos = minutos % 60;
      horas = horas % 24;
      dias = dias % 365;

      const meses = Math.floor(dias / 30);
      dias = dias % 30;

      setTempo({
        anos,
        meses,
        dias,
        horas,
        minutos,
        segundos,
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dataConhecimento]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-red-500 tracking-wide bg-black p-2">
          LovePages
        </h1>
      </div>

      <div className="p-6 rounded-md text-center max-w-md">

        {imagens?.length > 0 && (
          <div className="bg-white p-4 pb-6 rounded-md shadow-lg w-80 mx-auto mb-6">
            <img
              src={imagens[indiceAtual]}
              className="w-full h-72 object-cover rounded"
            />

            <p className="text-gray-800 font-semibold text-lg mt-3">{titulo}</p>
          </div>
        )}

        <p className="mb-6 whitespace-pre-wrap">{mensagem}</p>

        {dataConhecimento && (
          <>
            <h3 className="mb-3">Compartilhando momentos há</h3>

            <div className="grid grid-cols-3 gap-3">
              {Object.entries(tempo).map(([label, value]) => (
                <div
                  key={label}
                  className="bg-black rounded-md p-3 flex flex-col items-center"
                >
                  <span className="text-2xl font-bold">
                    {String(value).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-400 mt-4 text-sm">
              Desde {new Date(dataConhecimento).toLocaleDateString("pt-BR")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
