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
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white text-gray-800 w-[90%] max-w-md rounded-2xl p-4 shadow-xl">
        <div className="flex gap-3 justify-between">
          <div className="flex items-center">
            <img src={imgLogo} className="w-10 h-10" />
            <div className="flex flex-col p-2">
              <h1 className="font-bold text-md text-gray-800">Precisa de ajuda?</h1>
              <p className="flex gap-1 items-center text-gray-600">
                <IoIosRadioButtonOn className="text-green-500" /> Online agora
              </p>
            </div>
          </div>

          <IoMdClose onClick={onClose} className="cursor-pointer text-xl text-gray-500 hover:text-pink-400" />
        </div>

        <h1 className="mt-3 text-gray-800">Perguntas Frequentes</h1>
        <ListaDePerguntas />

        <div className="mt-5 p-2 text-center">
          <p className="text-gray-600">ou entre em contato conosco</p>
          <Button className="cursor-pointer mt-3 bg-pink-400 hover:bg-pink-500 w-full text-white p-3 rounded-md">
            Enviar Mensagem
          </Button>
        </div>

        <p className="bg-pink-400/15 h-13 p-2 rounded-md mt-3 text-sm text-center text-gray-700">
          Respondemos em <span className="font-bold text-gray-800">10 minutos</span> no
          Instagram: <span className="font-bold text-pink-400">@heartcodegift</span>
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
      <Accordion.Control className="flex p-3 font-medium text-gray-800 hover:text-pink-400 transition-colors">
        {item.value}
      </Accordion.Control>
      <Accordion.Panel className="!pb-2 text-gray-500 text-sm p-2">
        {item.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion
      chevronPosition="right"
      transitionDuration={200}
      className="text-gray-800"
      styles={{
        item: {
          borderBottom: "1px solid #f9a8d4",
          marginBottom: "0.25rem",
        },
        chevron: {
          color: "#f472b6",
        },
      }}
    >
      {items}
    </Accordion>
  );
}