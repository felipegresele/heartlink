import { FaRandom } from "react-icons/fa";
import type { FormMensagemProps } from "../../../../schema/form-templates";

export function FormMensagem({
  mensagem,
  setMensagem,
  tituloMensagem
}: FormMensagemProps) {
  const textosAutomaticos = [
    `Desde que você entrou na minha vida tudo ficou mais bonito.
Cada momento ao seu lado é especial e cada memória nossa é um tesouro que guardo com carinho.`,

    `Eu nunca imaginei que alguém pudesse mudar minha vida de uma forma tão linda.
Você trouxe alegria, paz e amor para meus dias.`,

    `Nosso amor é feito de momentos simples, risadas, carinho e cumplicidade.
Cada dia que passa eu tenho mais certeza de que quero viver muitos capítulos dessa história com você.`,

    `Você é a melhor parte dos meus dias.
Com você tudo faz mais sentido, tudo fica mais leve.`,

    `Se eu pudesse escolher mil vezes, escolheria você em todas elas.
Porque ao seu lado encontrei amor, amizade e felicidade verdadeira.`,
  ];

  function gerarMensagemAutomatica() {
    const index = Math.floor(Math.random() * textosAutomaticos.length);
    setMensagem(textosAutomaticos[index]);
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">
        {tituloMensagem}
      </h2>
      <textarea
        placeholder="Digite sua mensagem"
        maxLength={700}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        className="w-full p-2 rounded-md h-24 bg-gray-100 border border-gray-300 text-black resize-none"
      />
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{mensagem.length}/700</span>
      </div>
      <button
        onClick={gerarMensagemAutomatica}
        className="flex items-center gap-2 bg-[#e687cd] text-white hover:bg-pink-400 px-4 py-2 rounded-md cursor-pointer"
      >
        <FaRandom />
        Gerar mensagem automática
      </button>
    </div>
  );
}
