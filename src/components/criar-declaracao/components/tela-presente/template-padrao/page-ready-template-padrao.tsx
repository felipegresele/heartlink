import { useEffect, useState } from "react";
import imgLogo from "../../../../../img/logo-heartcode.webp"
import MusicPlayerFooter from "../../music/exibir-musica";
import ModalPresente from "../modal-ver-presente";

export default function PageReady({
  titulo,
  mensagem,
  imagens = [],
  dataConhecimento,
  musicaId,
  musicaTitulo,
  usuarioNome,
}: {
  titulo: string;
  mensagem: string;
  imagens: string[];
  dataConhecimento: string;
  musicaId?: string;
  musicaTitulo?: string;
  usuarioNome: string
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

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center text-white pb-24 px-4">
      {mostrarModal && (
      <ModalPresente
        usuarioNome={usuarioNome}
        corBotao="#c92921"
        onClose={() => setMostrarModal(false)}
      />
    )}
      <img src={imgLogo}/>

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
                    className={`w-2 h-2 rounded-full ${i === indiceAtual ? "bg-white" : "bg-gray-500"}`}
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

      {musica && <MusicPlayerFooter musica={musica} />}
    </div>
  );
}
