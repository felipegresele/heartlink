import type { FormTempoConhecimentoProps } from "../../../../schema/form-templates";

export function FormTempoConhecimento({
  dataConhecimento,
  setDataConhecimento,
  mensagem
}: FormTempoConhecimentoProps) {

  function validarData() {
    let dataAtual = new Date().toISOString().split("T")[0]
    if (dataConhecimento > dataAtual) {
      alert("A data não pode ser no futuro")
      return
    }
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">{mensagem}</h2>
      <input
        type="date"
        value={dataConhecimento}
        max={new Date().toISOString().split("T")[0]} //data de hoje
        onChange={(e) => {
          validarData()
          setDataConhecimento(e.target.value);
        }}
        className="w-full p-2 rounded-md text-black bg-gray-100 border border-gray-300"
      />
    </div>
  );
}