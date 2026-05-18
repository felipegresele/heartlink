import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export function Faqs() {
    return (
        <div className="bg-[#FAFAFA] text-black flex justify-center items-center px-6 py-16">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <span className="text-xl font-semibold">F.A.Q</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-[#e687cd]">
                        Perguntas Frequentes
                    </h1>
                    <p className="text-black mt-4">
                        Aqui estão algumas perguntas frequentes para ajudar você a entender
                        melhor a{" "}
                        <span className="font-semibold text-[#e687cd]">
                            Heart<span className="text-[#e687cd]">Code</span>
                        </span>. Caso tenha alguma dúvida, entre em contato conosco.
                    </p>
                    <Link
                        to="/duvidas"
                        className="inline-block mt-6 text-black text-xl hover:text-[#e687cd] transition-colors font-bold"
                    >
                        Dúvidas? Entre em contato por aqui
                    </Link>
                </div>

                <div>
                    <ListaDePerguntas />
                </div>
            </div>
        </div>
    );
}

const perguntas = [
    {
        value: "O que é a HeartCode?",
        description: "A HeartCode é uma plataforma que permite criar páginas personalizadas para surpreender pessoas especiais. Você pode adicionar fotos, uma mensagem e também o tempo da união.",
    },
    {
        value: "Como posso criar uma página personalizada na HeartCode?",
        description: "Clique no botão de 'Criar minha página', escolha seu tema, preencha com as informações desejadas e escolha o plano mais adequado. O processo é rápido e intuitivo.",
    },
    {
        value: "O que está incluído na minha página personalizada?",
        description: "Sua página personalizada contará com tudo o que você preencher no formulário, variando de acordo com o plano escolhido.",
    },
    {
        value: "Como recebo minha página personalizada após o pagamento?",
        description: "Após a confirmação do pagamento, você receberá um link via email com o QR code do seu presente pronto para compartilhar e acessar sua página.",
    },
    {
        value: "A página personalizada tem validade?",
        description: "Sim. No plano básico, a página estará disponível por 1 ano. No plano avançado, ela será vitalícia.",
    },
    {
        value: "Quanto tempo leva para receber o QR Code por email?",
        description: "Pagamentos com Cartão de Crédito & PIX são processados imediatamente.",
    },
    {
        value: "Quais são as formas de pagamento aceitas?",
        description: "Atualmente aceitamos PIX, Cartão de Crédito",
    },
    {
        value: "Preciso ter conhecimento técnico para criar o site?",
        description: "Não! A plataforma foi desenvolvida pensando em todos os usuários. Com uma interface intuitiva e amigável, você consegue personalizar seu site facilmente, sem necessidade de conhecimentos em programação ou design.",
    },
    {
        value: "Como posso entrar em contato com o suporte ao cliente?",
        description: "Você pode entrar em contato com o suporte ao cliente pelo nosso Instagram: @heartcodegift",
    },
];

function ListaDePerguntas() {
    const [aberto, setAberto] = useState<string | null>(null);

    const toggle = (value: string) => {
        setAberto((prev) => (prev === value ? null : value));
    };

    return (
        <div className="flex flex-col gap-3">
            {perguntas.map((item) => (
                <div
                    key={item.value}
                    className="bg-white border border-[#e687cd] rounded-xl overflow-hidden"
                >
                    <button
                        onClick={() => toggle(item.value)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:text-[#e687cd] transition-colors"
                    >
                        <span>{item.value}</span>
                        <FiChevronDown
                            size={16}
                            className={`text-[#e687cd] shrink-0 ml-2 transition-transform duration-200 ${
                                aberto === item.value ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {aberto === item.value && (
                        <div className="px-4 pb-3 text-sm text-gray-500 leading-relaxed">
                            {item.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}