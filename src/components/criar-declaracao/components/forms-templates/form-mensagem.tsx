import { FaRandom } from "react-icons/fa";
import type { FormMensagemProps } from "../../../../schema/form-templates";

export function FormMensagem({
  mensagem,
  setMensagem,
  tamanhoMensagem,
  setTamanhoMensagem,
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
        O que você quer dizer pra pessoa que vc ama? 💌
      </h2>
      <textarea
        placeholder="Digite sua mensagem"
        maxLength={700}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        className="w-full p-2 rounded-md h-24 text-white bg-gray-800 resize-none"
      />
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>{mensagem.length}/700</span>
        <label className="ml-auto">Tamanho:</label>
        <input
          min={12}
          max={20}
          value={tamanhoMensagem}
          onChange={(e) => setTamanhoMensagem(Number(e.target.value))}
          className="w-16 p-1 rounded-md text-white bg-gray-800"
        />
      </div>
      <button
        onClick={gerarMensagemAutomatica}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md"
      >
        <FaRandom />
        Gerar mensagem automática
      </button>
    </div>
  );
}
