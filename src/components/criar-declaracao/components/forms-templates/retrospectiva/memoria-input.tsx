import { useRetrospective } from "./restrospective-context";

export function MemoriaInput({
  icon, label, placeholder, field,
}: {
  icon: string;
  label: string;
  placeholder: string;
  field: "ondeSeConheceram" | "momentoFavorito" | "proximoPasso";
}) {
  const { data, setOndeSeConheceram, setMomentoFavorito, setProximoPasso } =
    useRetrospective();

  const setters = {
    ondeSeConheceram: setOndeSeConheceram,
    momentoFavorito: setMomentoFavorito,
    proximoPasso: setProximoPasso,
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/50 text-xs flex items-center gap-1.5">
        <span>{icon}</span> {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={data[field] ?? ""}
        onChange={(e) => setters[field](e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-pink-400/60 transition-colors"
      />
    </div>
  );
}