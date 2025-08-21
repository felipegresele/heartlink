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
    const [dataConhecimento, setDataConhecimento] = useState("");
    const [modoExibicao, setModoExibicao] = useState("padrao");
    const [modoImagem, setModoImagem] = useState("carrossel"); // NOVO

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900 text-white min-h-screen">
            {/* Formulário */}
            <div className="flex-1 space-y-4">
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
                <FormModoImagem modoImagem={modoImagem} setModoImagem={setModoImagem} />
                <FormTempoConhecimento
                    dataConhecimento={dataConhecimento}
                    setDataConhecimento={setDataConhecimento}
                />
                <FormModoExibicao
                    modoExibicao={modoExibicao}
                    setModoExibicao={setModoExibicao}
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
                    modoExibicao={modoExibicao}
                    modoImagem={modoImagem}
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

function FormTitulo({
    titulo,
    setTitulo,
    corTitulo,
    setCorTitulo,
    fonteTitulo,
    setFonteTitulo,
    tamanhoTitulo,
    setTamanhoTitulo,
}: FormTituloProps) {
    const fontes = [
        { name: "Alex Brush", value: "Alex Brush, cursive" },
        { name: "Dancing Script", value: "Dancing Script, cursive" },
        { name: "DM Serif Text", value: "DM Serif Text, serif" },
        { name: "Playfair Display", value: "Playfair Display, serif" },
        { name: "Lora", value: "Lora, serif" },
    ];

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Título da página</h2>
            <input
                type="text"
                maxLength={30}
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 rounded-md text-white bg-gray-800"
            />
            <div className="flex items-center gap-2">
                <label>Cor:</label>
                <input
                    type="color"
                    value={corTitulo}
                    onChange={(e) => setCorTitulo(e.target.value)}
                    className="w-10 h-8 cursor-pointer"
                />
            </div>
            <div className="flex items-center gap-2">
                <label>Fonte:</label>
                <select
                    value={fonteTitulo}
                    onChange={(e) => setFonteTitulo(e.target.value)}
                    className="p-1 rounded-md text-white bg-black"
                >
                    {fontes.map((f, i) => (
                        <option key={i} value={f.value}>
                            {f.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label>Tamanho:</label>
                <input
                    type="number"
                    min={10}
                    max={60}
                    value={tamanhoTitulo}
                    onChange={(e) => setTamanhoTitulo(Number(e.target.value))}
                    className="w-20 p-1 rounded-md text-white bg-gray-800"
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

function FormMensagem({
    mensagem,
    setMensagem,
    tamanhoMensagem,
    setTamanhoMensagem,
}: FormMensagemProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Declaração</h2>
            <textarea
                placeholder="Digite sua mensagem"
                maxLength={600}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full p-2 rounded-md h-24 text-white bg-gray-800 resize-none"
            />
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{mensagem.length}/600</span>
                <label className="ml-auto">Tamanho:</label>
                <input
                    type="number"
                    min={10}
                    max={40}
                    value={tamanhoMensagem}
                    onChange={(e) => setTamanhoMensagem(Number(e.target.value))}
                    className="w-16 p-1 rounded-md text-white bg-gray-800"
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
        setImagens(imagens.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Imagens</h2>
            {imagens.length < 5 && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAdicionarImagem}
                    className="mb-2 p-2 rounded-md text-black bg-gray-200 cursor-pointer"
                />
            )}
            <div className="flex flex-wrap gap-2">
                {imagens.map((img, i) => (
                    <div key={i} className="relative">
                        <img
                            src={img}
                            alt={`Imagem ${i + 1}`}
                            className="w-14 h-14 object-cover rounded-md"
                        />
                        <button
                            onClick={() => removerImagem(i)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------------------- COMPONENTE MODO IMAGEM ----------------------
interface FormModoImagemProps {
    modoImagem: string;
    setModoImagem: (value: string) => void;
}

function FormModoImagem({ modoImagem, setModoImagem }: FormModoImagemProps) {
    const opcoes = [
        { label: "Carrossel", value: "carrossel" },
        { label: "Grade", value: "grid" },
        { label: "Slideshow", value: "slideshow" },
    ];

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Modo de exibir imagens</h2>
            <div className="flex gap-4">
                {opcoes.map((op) => (
                    <label
                        key={op.value}
                        className={`cursor-pointer p-1 rounded-md border text-sm ${modoImagem === op.value
                            ? "border-red-500 bg-gray-800"
                            : "border-gray-600"
                            }`}
                    >
                        <input
                            type="radio"
                            name="modoImagem"
                            value={op.value}
                            checked={modoImagem === op.value}
                            onChange={(e) => setModoImagem(e.target.value)}
                            className="mr-2"
                        />
                        {op.label}
                    </label>
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

function FormTempoConhecimento({
    dataConhecimento,
    setDataConhecimento,
}: FormTempoConhecimentoProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Quando se conheceram?</h2>
            <input
                type="date"
                value={dataConhecimento}
                onChange={(e) => setDataConhecimento(e.target.value)}
                className="w-full p-2 rounded-md text-white bg-gray-800"
            />
        </div>
    );
}

// ---------------------- COMPONENTE MODO DE EXIBIÇÃO ----------------------
interface FormModoExibicaoProps {
    modoExibicao: string;
    setModoExibicao: (value: string) => void;
}

function FormModoExibicao({
    modoExibicao,
    setModoExibicao,
}: FormModoExibicaoProps) {
    const opcoes = [
        { label: "Padrão", value: "padrao" },
        { label: "Clássico", value: "classico" },
        { label: "Simples", value: "simples" },
    ];

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Modo de mostrar tempo</h2>
            <div className="flex gap-4">
                {opcoes.map((op) => (
                    <label
                        key={op.value}
                        className={`cursor-pointer p-1 rounded-md border text-sm ${modoExibicao === op.value
                            ? "border-red-500 bg-gray-800"
                            : "border-gray-600"
                            }`}
                    >
                        <input
                            type="radio"
                            name="modoExibicao"
                            value={op.value}
                            checked={modoExibicao === op.value}
                            onChange={(e) => setModoExibicao(e.target.value)}
                            className="mr-2"
                        />
                        {op.label}
                    </label>
                ))}
            </div>
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
    modoExibicao: string;
    modoImagem: string;
}

function PreviewCarrossel({
    titulo,
    mensagem,
    corTitulo,
    fonteTitulo,
    tamanhoTitulo,
    tamanhoMensagem,
    imagens,
    dataConhecimento,
    modoExibicao,
    modoImagem,
}: PreviewCarrosselProps) {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [tempoDetalhado, setTempoDetalhado] = useState({
        anos: 0,
        meses: 0,
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
    });

    // Auto carrossel
    useEffect(() => {
        if (modoImagem !== "carrossel" || imagens.length === 0) return;
        const timer = setInterval(() => {
            setIndiceAtual((prev) => (prev + 1) % imagens.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [imagens, modoImagem]);

    // Tempo
    useEffect(() => {
        if (!dataConhecimento) return;
        const intervalo = setInterval(() => {
            const agora = new Date();
            const inicio = new Date(dataConhecimento);

            let diffMs = agora.getTime() - inicio.getTime();
            let segundos = Math.floor(diffMs / 1000);
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

            setTempoDetalhado({ anos, meses, dias, horas, minutos, segundos });
        }, 1000);

        return () => clearInterval(intervalo);
    }, [dataConhecimento]);

    // Render imagens
    const renderImagens = () => {
        if (imagens.length === 0) return null;

        switch (modoImagem) {
            case "carrossel":
                return (
                    <div className="w-100 h-100 overflow-hidden rounded-md mb-4">
                        <img
                            src={imagens[indiceAtual]}
                            alt="Carrossel"
                            className="w-full h-full object-cover"
                        />
                        <div className="flex justify-center mt-2 gap-2">
                            {imagens.map((_, i) => (
                                <span
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === indiceAtual ? "bg-white" : "bg-gray-500"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                );

            case "grid":
                return (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {imagens.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Imagem ${i}`}
                                className="w-full h-32 object-cover rounded-md"
                            />
                        ))}
                    </div>
                );

            case "slideshow":
                return (
                    <div className="relative w-100 h-100 overflow-hidden rounded-md mb-4">
                        <img
                            src={imagens[indiceAtual]}
                            alt="Slideshow"
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() =>
                                setIndiceAtual((prev) => (prev - 1 + imagens.length) % imagens.length)
                            }
                            className="absolute top-1/2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        >
                            ⟨
                        </button>
                        <button
                            onClick={() => setIndiceAtual((prev) => (prev + 1) % imagens.length)}
                            className="absolute top-1/2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        >
                            ⟩
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    // Render tempo
    const renderTempo = () => {
        if (!dataConhecimento) return null;

        switch (modoExibicao) {
            case "padrao":
                return (
                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-semibold mb-2">
                            Compartilhando momentos há
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.entries(tempoDetalhado).map(([label, value], i) => (
                                <div
                                    key={i}
                                    className="bg-black rounded-md p-3 flex flex-col items-center"
                                >
                                    <span className="text-2xl font-bold">
                                        {String(value).padStart(2, "0")}
                                    </span>
                                    <span className="text-sm text-gray-400">{label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 mt-2 text-sm">
                            Desde {new Date(dataConhecimento).toLocaleDateString("pt-BR")}
                        </p>
                    </div>
                );

            case "classico":
                return (
                    <p className="text-gray-300 mt-4 text-sm">
                        {tempoDetalhado.anos} anos, {tempoDetalhado.meses} meses,{" "}
                        {tempoDetalhado.dias} dias, {tempoDetalhado.horas} horas,{" "}
                        {tempoDetalhado.minutos} minutos e {tempoDetalhado.segundos} segundos
                        juntos.
                    </p>
                );

            case "simples":
                return (
                    <p className="text-gray-300 mt-4 text-sm">
                        Estamos juntos há {tempoDetalhado.anos} anos e {tempoDetalhado.meses}{" "}
                        meses ❤️
                    </p>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <h1 className="font-bold text-center text-[20px] mb-5">Preview do seu site</h1>
            <div className="bg-gray-800 p-4 rounded-md text-center flex flex-col items-center">
                {renderImagens()}
                <h1
                    className="mb-4"
                    style={{
                        color: corTitulo,
                        fontFamily: fonteTitulo,
                        fontSize: `${tamanhoTitulo}px`,
                    }}
                >
                    {titulo || "Seu título aqui"}
                </h1>
                <p
                    className="whitespace-pre-line max-h-40 px-2"
                    style={{ fontSize: `${tamanhoMensagem}px` }}
                >
                    {mensagem || "Sua mensagem aqui"}
                </p>
                {renderTempo()}
            </div>
        </>

    );
}
