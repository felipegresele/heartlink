import { Accordion } from "@mantine/core";
import { FiAlertCircle } from "react-icons/fi";

export function FaqsRetrospectiva() {
    return (
        <div className="bg-black text-white min-h-screen flex justify-center items-center px-6 py-16">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Coluna esquerda */}
                <div>
                    <span className="flex max-w-50 gap-2 justify-center items-center bg-red-500 text-xl font-semibold rounded-md p-2">
                        <FiAlertCircle /> IMPORTANTE
                    </span>

                    <p className="text-sm text-gray-300 mt-4">
                        Entenda sobre
                    </p>
                    <h1 className="text-white font-bold text-2xl mt-4">
                        Porque adicionar a Sessão Retrospectiva?
                    </h1>
                    <h3 className="md:text-3xl mt-4">
                        Perguntas Frequentes
                    </h3>
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
        id: 1,
        value: "Quanto custa a Retrospectiva?",
        description:
            "Nada a mais! A Retrospectiva já vem inclusa no seu plano. Você tem acesso a 5 seções animadas e interativas que transformam seu presente em uma experiência emocionante — com linha do tempo, galeria de fotos, jogos e muito mais.",
    },
    {
        id: 2,
        value: "Leva muito tempo pra fazer?",
        description:
            "Nem um pouco! Em poucos minutos você escolhe o que quer incluir. E o melhor: dá pra ver uma prévia de como tudo vai ficar antes de finalizar.",
    },
    {
        id: 3,
        value: "Porque eu deveria fazer?",
        description:
            "É o que separa um presente comum de algo realmente marcante. A maioria das pessoas diz que a retrospectiva animada é o momento mais emocionante — como se fosse a história de vocês em formato de filme.",
    },
    {
        id: 4,
        value: "Posso editar depois de feito?",
        description:
            "Sim! Você pode editar depois pelo painel de edição acessando Meus Templates. Mas precisa adicionar agora para poder fazer a edição depois",
    },
    {
        id: 5,
        value: "Funciona em qualquer celular?",
        description:
            "Funciona sim! A experiência é totalmente adaptada pra rodar bem em celular, tablet ou computador. Dá pra acessar e se emocionar de qualquer lugar.",
    },
    {
        id: 6,
        value: "Posso personalizar do meu jeito?",
        description:
            "Pode sim! Você escolhe fotos, textos, momentos especiais e tudo que quiser destacar. A Retrospectiva fica com a cara da história de vocês — única e totalmente personalizada.",
    },
];

function ListaDePerguntas() {
    const items = perguntas.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control className="flex p-3 font-medium text-white hover:text-red-400 transition-colors cursor-pointer">
                {item.value}
            </Accordion.Control>
            <Accordion.Panel className="!pb-2 text-gray-300 text-sm ">
                {item.description}
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Accordion
            chevronPosition="right"
            transitionDuration={200}
            className="bg-black text-white"
            styles={{
                item: {
                    borderBottom: "1px solid #27272a",
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