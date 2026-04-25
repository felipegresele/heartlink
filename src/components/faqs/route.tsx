import { Accordion } from "@mantine/core";
import { Link } from "react-router-dom";

export function Faqs() {
    return (
        <div className="bg-[#FAFAFA] text-black min-h-screen flex justify-center items-center px-6 py-16">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Coluna esquerda */}
                <div>
                    <span className="text-xl font-semibold">
                        F.A.Q
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-[#e687cd]">
                        Perguntas Frequentes
                    </h1>
                    <p className="text-black mt-4">
                        Aqui estão algumas perguntas frequentes para ajudar você a entender
                        melhor a{" "}
                        <span className="font-semibold text-[#e687cd]">Heart<span className="text-[#e687cd]">Code</span></span>. Caso
                        tenha alguma dúvida, entre em contato conosco.
                    </p>

                    <Link
                        to="/duvidas"
                        className="inline-block mt-6 text-black text-xl hover:text-[#e687cd] transition-colors font-bold"
                    >
                        Dúvidas? Entre em contato por aqui
                    </Link>
                </div>

                {/* Coluna direita - Accordion */}
                <div>
                    <ListaDePerguntas />
                </div>
            </div>
        </div>
    );
}

const perguntas = [
    {
        id: 1,
        value: "O que é a HeartCode?",
        description:
            "A HeartCode é uma plataforma que permite criar páginas personalizadas para pessoas especiais. Você pode adicionar fotos, uma mensagem e também o tempo da união.",
    },
    {
        id: 2,
        value: "Como posso criar uma página personalizada na HeartCode?",
        description:
            "Você pode acessar nosso formulário, preencher com as informações desejadas e escolher o plano mais adequado. O processo é rápido e intuitivo.",
    },
    {
        id: 3,
        value: "O que está incluído na minha página personalizada?",
        description:
            "Sua página personalizada contará com tudo o que você preencher no formulário, variando de acordo com o plano escolhido.",
    },
    {
        id: 4,
        value: "Como recebo minha página personalizada após o pagamento?",
        description:
            "Após a confirmação do pagamento, você receberá um QR code e um link via email para compartilhar e acessar sua página.",
    },
    {
        id: 5,
        value: "A página personalizada tem validade?",
        description:
            "Sim. No plano básico, a página estará disponível por 1 ano. No plano avançado, ela será vitalícia.",
    },
    {
        id: 6,
        value: "Quanto tempo leva para receber o QR Code por email?",
        description:
            "Pagamentos com Cartão de Crédito & PIX são processados imediatamente. Pagamentos por boleto podem levar até 2 dias úteis.",
    },
    {
        id: 7,
        value: "Quais são as formas de pagamento aceitas?",
        description: "Atualmente aceitamos PIX, Cartão de Crédito",
    },
    {
        id: 8,
        value: "Preciso ter conhecimento técnico para criar o site?",
        description: "Não! A plataforma foi desenvolvida pensando em todos os usuários. Com uma interface intuitiva e amigável, você consegue personalizar seu site facilmente, sem necessidade de conhecimentos em programação ou design.",
    },
    {
        id: 9,
        value: "Como posso entrar em contato com o suporte ao cliente?",
        description:
            "Você pode entrar em contato com o suporte ao cliente pelo nosso Instagram: @heartcodegift",
    },
];

function ListaDePerguntas() {
    const items = perguntas.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control className="flex p-3 font-medium text-black hover:text-pink-400 transition-colors text-justify">
                {item.value}
            </Accordion.Control>
            <Accordion.Panel className="!pb-2 text-gray-500 text-sm text-justify leading-relaxed max-w-prose p-2">
    {item.description}
</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Accordion
            chevronPosition="right"
            transitionDuration={200}
            className="bg-white border-2 border-[#e687cd] text-white rounded-xl "
            styles={{
                item: {
                    borderBottom: "1px solid #f4e9e9",
                    marginBottom: "0.25rem",
                },
                chevron: {
                    color: "#ef4444",
                },
            }}
        >
            {items}
        </Accordion>
    );
}