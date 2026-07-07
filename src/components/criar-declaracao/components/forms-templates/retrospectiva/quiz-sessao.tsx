import { useState } from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useRetrospective } from "./restrospective-context";
import { LIMITS } from "../../../../../schema/retrospectiva";
import { LimiteBadge } from "./limit-bagde";

const MAX_OPCOES = 4;
const MIN_OPCOES = 2;

export function QuizSection() {
  const { data, addQuizItem, updateQuizItem, removeQuizItem } = useRetrospective();

  const [pergunta, setPergunta] = useState("");
  const [opcoes, setOpcoes] = useState<string[]>(["", ""]);
  const [respostaCorreta, setRespostaCorreta] = useState(0);
  const [erro, setErro] = useState("");

  const cheio = data.quiz.length >= LIMITS.quiz;

  function handleOpcaoChange(index: number, valor: string) {
    setOpcoes((prev) => prev.map((o, i) => (i === index ? valor : o)));
  }

  function handleAddOpcao() {
    if (opcoes.length >= MAX_OPCOES) return;
    setOpcoes((prev) => [...prev, ""]);
  }

  function handleRemoveOpcao(index: number) {
    if (opcoes.length <= MIN_OPCOES) return;
    setOpcoes((prev) => prev.filter((_, i) => i !== index));
    if (respostaCorreta >= index && respostaCorreta > 0) {
      setRespostaCorreta((prev) => prev - 1);
    }
  }

  function resetForm() {
    setPergunta("");
    setOpcoes(["", ""]);
    setRespostaCorreta(0);
    setErro("");
  }

  function handleAdd() {
    if (!pergunta.trim()) {
      setErro("Escreva a pergunta.");
      return;
    }
    const opcoesPreenchidas = opcoes.map((o) => o.trim());
    if (opcoesPreenchidas.some((o) => !o)) {
      setErro("Preencha todas as opções.");
      return;
    }
    const ok = addQuizItem({
      pergunta: pergunta.trim(),
      opcoes: opcoesPreenchidas,
      respostaCorreta,
    });
    if (!ok) {
      setErro(`Limite de ${LIMITS.quiz} perguntas atingido.`);
      return;
    }
    resetForm();
  }

  return (
    <div className="space-y-6 bg-[#FAFAFA]">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <span className="text-2xl text-black">
          <HiMiniQuestionMarkCircle />
        </span>
        <div>
          <h3 className="text-black font-bold text-lg leading-tight">Quiz</h3>
          <p className="text-gray-500 text-xs">
            Quanto essa pessoa te conhece? Crie perguntas com até 4 alternativas.
          </p>
        </div>
        <div className="ml-auto">
          <LimiteBadge atual={data.quiz.length} maximo={LIMITS.quiz} />
        </div>
      </div>

      {/* Formulário de nova pergunta */}
      {!cheio && (
        <div className="space-y-3 border border-gray-300 rounded-xl p-4">
          <input
            type="text"
            placeholder="Ex: Qual é a minha comida favorita?"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-black text-sm placeholder:text-gray-400 outline-none focus:border-[#e687cd]"
          />

          <div className="space-y-2">
            {opcoes.map((opcao, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="respostaCorreta"
                  checked={respostaCorreta === index}
                  onChange={() => setRespostaCorreta(index)}
                  className="accent-[#e687cd] shrink-0"
                  title="Marcar como resposta correta"
                />
                <input
                  type="text"
                  placeholder={`Opção ${index + 1}`}
                  value={opcao}
                  onChange={(e) => handleOpcaoChange(index, e.target.value)}
                  className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-black text-sm outline-none focus:border-[#e687cd]"
                />
                {opcoes.length > MIN_OPCOES && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOpcao(index)}
                    className="text-gray-400 hover:text-red-400 transition-colors shrink-0"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            {opcoes.length < MAX_OPCOES ? (
              <button
                type="button"
                onClick={handleAddOpcao}
                className="text-xs font-bold text-[#e687cd] hover:underline flex items-center gap-1"
              >
                <FaPlus size={10} /> Adicionar opção
              </button>
            ) : (
              <span className="text-xs text-gray-400">Máximo de {MAX_OPCOES} opções</span>
            )}

            <button
              onClick={handleAdd}
              className="bg-[#e687cd] hover:bg-pink-400 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
            >
              Adicionar pergunta
            </button>
          </div>

          {erro && <p className="text-red-400 text-xs">{erro}</p>}
        </div>
      )}

      {/* Lista de perguntas já criadas */}
      {data.quiz.length > 0 && (
        <ul className="space-y-3">
          {data.quiz.map((item, qIdx) => (
            <li key={item.id} className="bg-gray-100 border border-gray-300 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400"># {qIdx + 1}</span>
                <input
                  type="text"
                  value={item.pergunta}
                  onChange={(e) => updateQuizItem(item.id, { pergunta: e.target.value })}
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-black text-sm outline-none focus:border-[#e687cd]"
                />
                <button
                  type="button"
                  onClick={() => removeQuizItem(item.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors shrink-0"
                  aria-label="Remover pergunta"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <div className="pl-6 space-y-1">
                {item.opcoes.map((opcao, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`resposta-${item.id}`}
                      checked={item.respostaCorreta === oIdx}
                      onChange={() =>
                        updateQuizItem(item.id, { respostaCorreta: oIdx })
                      }
                      className="accent-[#e687cd] shrink-0"
                      title="Marcar como resposta correta"
                    />
                    <input
                      type="text"
                      value={opcao}
                      onChange={(e) => {
                        const novasOpcoes = item.opcoes.map((o, i) =>
                          i === oIdx ? e.target.value : o,
                        );
                        updateQuizItem(item.id, { opcoes: novasOpcoes });
                      }}
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-black text-xs outline-none focus:border-[#e687cd]"
                    />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {data.quiz.length === 0 && (
        <div className="text-center py-8 text-gray-300">
          <HiMiniQuestionMarkCircle size={32} className="mx-auto mb-2 text-[#e687cd] opacity-30" />
          <p className="text-sm text-gray-500">Adicione perguntas para o quiz do casal</p>
        </div>
      )}
    </div>
  );
}