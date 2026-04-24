import { useState } from "react";
import imgLogo from "../../img/logo.png";
import { IoIosRadioButtonOn, IoMdClose } from "react-icons/io";
import { Accordion, Button } from "@mantine/core";

export function ModalContatoAjuda({
  abrirModal,
  onClose,
}: {
  abrirModal: boolean;
  onClose: () => void;
}) {
  if (!abrirModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo escuro */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-zinc-900 text-white w-[90%] max-w-md rounded-2xl p-4 shadow-xl">
        <div className="flex gap-3 justify-between">
          <div className="flex items-center">
            <img src={imgLogo} className="w-10 h-10" />
            <div className="flex flex-col p-2">
              <h1 className="font-bold text-md">Precisa de ajuda?</h1>
              <p className="flex gap-1 items-center">
                <IoIosRadioButtonOn className="text-green-500" /> Online agora
              </p>
            </div>
          </div>

          <IoMdClose onClick={onClose} className="cursor-pointer text-xl" />
        </div>

        <h1 className="mt-3">Perguntas Frequentes</h1>
        <ListaDePerguntas />

        <div className="mt-5 p-2 text-center ">
          <p>ou entre em contato conosco</p>
          <Button className="cursor-pointer mt-3 bg-red-500 w-full text-white p-3 rounded-md">
            Enviar Mensagem
          </Button>
        </div>

        <p className="bg-red-500/15 h-13 p-2 rounded-md mt-3 text-sm text-center">
          Respondemos em <span className="font-bold">10 minutos</span> no
          Instagram: <span className="font-bold">@heartcodegift</span>
        </p>
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
    value: "Posso editar depois de feito?",
    description:
      "Sim! Você pode editar depois pelo painel de edição acessando Meus Templates. Mas precisa adicionar agora para poder fazer a edição depois",
  },
  {
    id: 4,
    value: "Funciona em qualquer celular?",
    description:
      "Funciona sim! A experiência é totalmente adaptada pra rodar bem em celular, tablet ou computador. Dá pra acessar e se emocionar de qualquer lugar.",
  },
];

function ListaDePerguntas() {
  const items = perguntas.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control className="flex p-3 font-medium text-white hover:text-red-400 transition-colors">
        {item.value}
      </Accordion.Control>
      <Accordion.Panel className="!pb-2 text-gray-300 text-sm p-2">
        {item.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion
      chevronPosition="right"
      transitionDuration={200}
      className="text-white"
      styles={{
        item: {
          borderBottom: "1px solid #37373b",
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
