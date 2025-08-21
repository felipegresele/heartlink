import React, { useState } from "react";
import { Md10Mp, MdHd } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";


// ---------------------- COMPONENTE PRINCIPAL ----------------------
export function TemplateNetflix() {
    const [titulo, setTitulo] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [imagemPrincipal, setImagemPrincipal] = useState<string>("");
    const [episodios, setEpisodios] = useState<string[]>(Array(8).fill(""));
    const [dataConhecimento, setDataConhecimento] = useState<string>("");

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900 text-white min-h-screen">
            {/* Formulário */}
            <div className="flex-1 space-y-4">
                <FormTitulo titulo={titulo} setTitulo={setTitulo} />
                <FormMensagem mensagem={mensagem} setMensagem={setMensagem} />
                <FormImagemPrincipal
                    imagemPrincipal={imagemPrincipal}
                    setImagemPrincipal={setImagemPrincipal}
                />
                <FormDataConhecimento
                    data={dataConhecimento}
                    setData={setDataConhecimento}
                />
                <FormEpisodios episodios={episodios} setEpisodios={setEpisodios} />

            </div>

            {/* Preview */}
            <div className="flex-1">
                <PreviewNetflix
                    titulo={titulo}
                    mensagem={mensagem}
                    imagemPrincipal={imagemPrincipal}
                    episodios={episodios}
                    dataConhecimento={dataConhecimento}
                />
            </div>
        </div>
    );
}

// ---------------------- COMPONENTES DO FORMULÁRIO ----------------------
interface FormTituloProps {
    titulo: string;
    setTitulo: (value: string) => void;
}
function FormTitulo({ titulo, setTitulo }: FormTituloProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Título da página</h2>
            <input
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 rounded-md text-white bg-gray-800"
            />
        </div>
    );
}

interface FormMensagemProps {
    mensagem: string;
    setMensagem: (value: string) => void;
}
function FormMensagem({ mensagem, setMensagem }: FormMensagemProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Descrição</h2>
            <textarea
                placeholder="Digite a descrição"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full p-2 rounded-md h-24 text-white bg-gray-800 resize-none"
            />
        </div>
    );
}

interface FormImagemProps {
    imagemPrincipal: string;
    setImagemPrincipal: (value: string) => void;
}
function FormImagemPrincipal({ imagemPrincipal, setImagemPrincipal }: FormImagemProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImagemPrincipal(URL.createObjectURL(file));
    };
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Imagem Principal</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 rounded-md text-black bg-gray-200 cursor-pointer"
            />
        </div>
    );
}

interface FormEpisodiosProps {
    episodios: string[];
    setEpisodios: (value: string[]) => void;
}
function FormEpisodios({ episodios, setEpisodios }: FormEpisodiosProps) {
    const handleChange = (index: number, file: File | null) => {
        if (!file) return;
        const newEpisodios = [...episodios];
        newEpisodios[index] = URL.createObjectURL(file);
        setEpisodios(newEpisodios);
    };

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Episódios (8 fotos)</h2>
            <div className="grid grid-cols-2 gap-2">
                {episodios.map((img, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-32 h-20 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                            {img ? <img src={img} className="w-full h-full object-cover" /> : <span className="text-gray-400">Quadrado {i + 1}</span>}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange(i, e.target.files?.[0] || null)}
                            className="text-sm cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------------------- Campo Data ----------------------
interface FormDataProps {
    data: string;
    setData: (value: string) => void;
}
function FormDataConhecimento({ data, setData }: FormDataProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Desde quando se conhecem</h2>
            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full p-2 rounded-md text-black bg-gray-200"
            />
        </div>
    );
}

// ---------------------- Preview Netflix ----------------------
interface PreviewNetflixProps {
    titulo: string;
    mensagem: string;
    imagemPrincipal: string;
    episodios: string[];
    dataConhecimento: string;
}

function PreviewNetflix({ titulo, mensagem, imagemPrincipal, episodios, dataConhecimento }: PreviewNetflixProps) {
    // Função para calcular o tempo sem biblioteca
    const calcularTempo = (data: string) => {
        if (!data) return "";
        const inicio = new Date(data);
        const hoje = new Date();
        let anos = hoje.getFullYear() - inicio.getFullYear();
        let meses = hoje.getMonth() - inicio.getMonth();
        let dias = hoje.getDate() - inicio.getDate();

        if (dias < 0) {
            meses -= 1;
            dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        }
        if (meses < 0) {
            anos -= 1;
            meses += 12;
        }

        return `${anos} anos, ${meses} meses, ${dias} dias`;
    };

    return (
        <div className="bg-gray-800 rounded-md overflow-hidden text-white">
            {/* Imagem principal com sombra na parte inferior */}
            <div className="relative w-full h-120 bg-gray-700">
                {imagemPrincipal && (
                    <img
                        src={imagemPrincipal}
                        className="w-full h-full object-cover"
                    />
                )}
                {/* Sombra degradê na parte inferior */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-2xl font-bold">{titulo || "Seu título aqui"}</h1>
                    {dataConhecimento && (
                        <p className="mt-2 text-green-500 font-bold">
                            Em estreia desde {new Date(dataConhecimento).toLocaleDateString()}
                        </p>
                    )}
                    <h1 className="flex gap-1 font-bold">
                        <Md10Mp color="red" size={22} />Em alta no momento
                    </h1>
                    {/* Mensagem com largura máxima */}
                    <p className="mt-1 max-w-md">{mensagem || "Sua descrição aqui"}</p>


                </div>
            </div>

            {/* Episódios */}
            <h1 className="p-3 font-bold flex gap-1 mt-3 ml-2"><CiBoxList size={20} className="mt-1" /> Melhores Epídosios</h1>
            <div className="p-4 grid grid-cols-2 gap-2 mb-20">
                
                {episodios.map((img, i) => (
                    <div
                        key={i}
                        className="w-80 h-50 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center relative ml-4"
                    >
                        {img ? <img src={img} className="w-full h-full object-cover" /> : <span className="text-gray-400">{i + 1}</span>}
                        {/* Ícone HD no canto inferior direito */}
                        <div className="absolute bottom-2 right-2">
                            <MdHd
                                size={24}
                                color="gray"
                                className="border border-white rounded-sm p-[2px]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
