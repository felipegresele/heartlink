import type { FormTempoConhecimentoProps } from "../../../../schema/form-templates";

export function FormTempoConhecimento({
  dataConhecimento,
  setDataConhecimento,
}: FormTempoConhecimentoProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Quando se conheceram?</h2>
      <input
        type="date"
        value={dataConhecimento}
        max={new Date().toISOString().split("T")[0]} //data de hoje
        onChange={(e) => {
          console.log(dataConhecimento);
          setDataConhecimento(e.target.value);
        }}
        className="w-full p-2 rounded-md text-white bg-gray-800"
      />
    </div>
  );
}