import React, { useState, useEffect } from "react";

// ---------------------- COMPONENTE PRINCIPAL ----------------------
export function CriadorDeclaracao() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [corTitulo, setCorTitulo] = useState("#ffffff");
  const [fonteTitulo, setFonteTitulo] = useState("Alex Brush, cursive"); 
  const [tamanhoTitulo, setTamanhoTitulo] = useState(24);
  const [tamanhoMensagem, setTamanhoMensagem] = useState(16);
  const [imagens, setImagens] = useState<string[]>([]);
  const [dataConhecimento, setDataConhecimento] = useState(""); // nova data

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-900 text-white min-h-screen">
      {/* Formulário */}
      <div className="flex-1">
        <FormTitulo
          titulo={titulo}
          setTitulo={setTitulo}
          corTitulo={corTitulo}
          setCorTitulo={setCorTitulo}
          fonteTitulo={fonteTitulo}
          setFonteTitulo={setFonteTitulo}
          tamanhoTitulo={tamanhoTitulo}
          setTamanhoTitulo={setTamanhoTitulo}
        />
        <FormMensagem
          mensagem={mensagem}
          setMensagem={setMensagem}
          tamanhoMensagem={tamanhoMensagem}
          setTamanhoMensagem={setTamanhoMensagem}
        />
        <FormImagens imagens={imagens} setImagens={setImagens} />
        <FormTempoConhecimento
          dataConhecimento={dataConhecimento}
          setDataConhecimento={setDataConhecimento}
        />
      </div>

      {/* Pré-visualização */}
      <div className="flex-1">
        <PreviewCarrossel
          titulo={titulo}
          mensagem={mensagem}
          corTitulo={corTitulo}
          fonteTitulo={fonteTitulo}
          tamanhoTitulo={tamanhoTitulo}
          tamanhoMensagem={tamanhoMensagem}
          imagens={imagens}
          dataConhecimento={dataConhecimento}
        />
      </div>
    </div>
  );
}

// ---------------------- COMPONENTE TÍTULO ----------------------
interface FormTituloProps {
  titulo: string;
  setTitulo: (value: string) => void;
  corTitulo: string;
  setCorTitulo: (value: string) => void;
  fonteTitulo: string;
  setFonteTitulo: (value: string) => void;
  tamanhoTitulo: number;
  setTamanhoTitulo: (value: number) => void;
}

function FormTitulo({ titulo, setTitulo, corTitulo, setCorTitulo, fonteTitulo, setFonteTitulo, tamanhoTitulo, setTamanhoTitulo }: FormTituloProps) {
  const fontes = [
    { name: "Alex Brush", value: "Alex Brush, cursive" },
    { name: "Dancing Script", value: "Dancing Script, cursive" },
    { name: "DM Serif Text", value: "DM Serif Text, serif" },
    { name: "Playfair Display", value: "Playfair Display, serif" },
    { name: "Lora", value: "Lora, serif" },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Título da página</h2>
      <input
        type="text"
        maxLength={30}
        placeholder="Digite o título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 mb-4 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="mb-4 flex items-center gap-2">
        <label className="mr-2">Cor do título:</label>
        <input
          type="color"
          value={corTitulo}
          onChange={(e) => setCorTitulo(e.target.value)}
          className="w-12 h-8 cursor-pointer"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label className="mr-2">Fonte do título:</label>
        <select
          value={fonteTitulo}
          onChange={(e) => setFonteTitulo(e.target.value)}
          className="p-2 rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {fontes.map((f, i) => (
            <option key={i} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label className="mr-2">Tamanho do título:</label>
        <input
          type="number"
          min={10}
          max={60}
          value={tamanhoTitulo}
          onChange={(e) => setTamanhoTitulo(Number(e.target.value))}
          className="w-20 p-1 rounded-md text-white"
        />
      </div>
    </div>
  );
}

// ---------------------- COMPONENTE MENSAGEM ----------------------
interface FormMensagemProps {
  mensagem: string;
  setMensagem: (value: string) => void;
  tamanhoMensagem: number;
  setTamanhoMensagem: (value: number) => void;
}

function FormMensagem({ mensagem, setMensagem, tamanhoMensagem, setTamanhoMensagem }: FormMensagemProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Declaração</h2>
      <textarea
        placeholder="Digite sua mensagem"
        maxLength={600}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        className="w-full p-2 rounded-md h-32 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />
      <div className="mt-2 flex items-center gap-2">
        <p className="text-gray-400 text-sm">{mensagem.length}/600 caracteres</p>
        <label className="ml-auto">Tamanho:</label>
        <input
          type="number"
          min={10}
          max={40}
          value={tamanhoMensagem}
          onChange={(e) => setTamanhoMensagem(Number(e.target.value))}
          className="w-16 p-1 rounded-md text-white"
        />
      </div>
    </div>
  );
}

// ---------------------- COMPONENTE IMAGENS ----------------------
interface FormImagensProps {
  imagens: string[];
  setImagens: (value: string[]) => void;
}

function FormImagens({ imagens, setImagens }: FormImagensProps) {
  const handleAdicionarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Selecione apenas imagens!");
      return;
    }
    if (imagens.length >= 5) {
      alert("Você só pode adicionar até 5 imagens!");
      return;
    }
    setImagens([...imagens, URL.createObjectURL(file)]);
  };

  const removerImagem = (index: number) => {
    const novas = imagens.filter((_, i) => i !== index);
    setImagens(novas);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Imagens</h2>
      {imagens.length < 5 && (
        <input
          type="file"
          accept="image/*"
          onChange={handleAdicionarImagem}
          className="mb-4 p-2 py-5 rounded-md text-black bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {imagens.map((img, i) => (
          <div key={i} className="relative">
            <img src={img} alt={`Imagem ${i + 1}`} className="w-16 h-16 object-cover rounded-md" />
            <button
              onClick={() => removerImagem(i)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------- COMPONENTE TEMPO DE CONHECIMENTO ----------------------
interface FormTempoConhecimentoProps {
  dataConhecimento: string;
  setDataConhecimento: (value: string) => void;
}

function FormTempoConhecimento({ dataConhecimento, setDataConhecimento }: FormTempoConhecimentoProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Quando se conheceram?</h2>
      <input
        type="date"
        value={dataConhecimento}
        onChange={(e) => setDataConhecimento(e.target.value)}
        className="w-full p-2 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

// ---------------------- COMPONENTE PREVIEW ----------------------
interface PreviewCarrosselProps {
  titulo: string;
  mensagem: string;
  corTitulo: string;
  fonteTitulo: string;
  tamanhoTitulo: number;
  tamanhoMensagem: number;
  imagens: string[];
  dataConhecimento: string;
}

function PreviewCarrossel({
  titulo,
  mensagem,
  corTitulo,
  fonteTitulo,
  tamanhoTitulo,
  tamanhoMensagem,
  imagens,
  dataConhecimento
}: PreviewCarrosselProps) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempo, setTempo] = useState("");

  useEffect(() => {
    if (imagens.length === 0) return;
    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [imagens]);

  // calcular tempo desde data de conhecimento
  useEffect(() => {
    if (!dataConhecimento) return;

    const intervalo = setInterval(() => {
      const agora = new Date();
      const inicio = new Date(dataConhecimento);
      const diffMs = agora.getTime() - inicio.getTime();

      const diffSegundos = Math.floor(diffMs / 1000);
      const diffMinutos = Math.floor(diffSegundos / 60);
      const diffHoras = Math.floor(diffMinutos / 60);
      const diffDias = Math.floor(diffHoras / 24);
      const diffAnos = Math.floor(diffDias / 365);

      setTempo(`${diffAnos} anos, ${diffDias} dias, ${diffHoras} horas, ${diffMinutos} minutos, ${diffSegundos} segundos`);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dataConhecimento]);

  return (
    <div className="bg-gray-800 p-4 rounded-md text-center flex flex-col items-center max-h-[80vh] overflow-hidden">
      {/* IMAGEM NO TOPO */}
      {imagens.length > 0 && (
        <div className="w-full max-h-60 overflow-hidden rounded-md mb-4">
          <img src={imagens[indiceAtual]} alt="Carrossel" className="w-full h-full object-cover" />
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

      {/* TÍTULO */}
      <h1
        style={{ color: corTitulo, fontFamily: fonteTitulo, fontSize: `${tamanhoTitulo}px` }}
        className="mb-2 break-words max-w-[90%]"
      >
        {titulo || "Título aparecerá aqui"}
      </h1>

      {/* MENSAGEM */}
      <p
        style={{ fontSize: `${tamanhoMensagem}px` }}
        className="text-gray-200 break-words max-w-[90%] overflow-auto"
      >
        {mensagem || "Sua declaração aparecerá aqui..."}
      </p>

      {/* TEMPO DE CONHECIMENTO */}
      {dataConhecimento && (
        <p className="text-yellow-300 mt-2 text-sm break-words max-w-[90%]">{tempo}</p>
      )}
    </div>
  );
}

