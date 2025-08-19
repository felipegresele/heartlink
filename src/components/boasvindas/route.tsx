import { Link } from "react-router-dom";

export function BoasVindas() {
  return (
    <div>
      <h1>Declare seu amor</h1>
      <h3></h3>
      <p>
        Crie uma página personalizada para quem você ama e surpreenda a pessoa
        com uma declaração especial que ficará para sempre.
      </p>
      <Link to="criar">Criar minha página</Link>
    </div>
  );
}
