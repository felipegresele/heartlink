import { useEffect, useState } from "react";

export default function ContentEscolherMusica() {
  const [musicas, setMusicas] = useState([]);
  const [artistaEscolhido, setArtistaEscolhido] = useState("");

  const chamarApi = () => {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${artistaEscolhido}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMusicas(data.data);
      });
  };

  return (
    <div>
      <input
        className="mt-2 p-2 bg-gray-500 rounded-md"
        placeholder="Digite o nome do artista aqui..."
        onChange={(e) => setArtistaEscolhido(e.target.value)}
        required
      />
      <button type="submit" onClick={() => chamarApi()}>
        Buscar
      </button>
      {musicas.map((m) => (
        <div key={m.id}>
          <p>{m.title}</p>
          <img src={m.album.cover} width="100" />
        </div>
      ))}
    </div>
  );
}
