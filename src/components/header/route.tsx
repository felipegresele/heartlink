import { Link } from "react-router-dom";
import img from "../../assets/img.jpg";
import { IoPersonOutline} from "react-icons/io5";

export function Header() {
  return (
    <div className="bg-black p-6 justify-between flex items-center">
      <div className="flex gap-2 justify-center items-center">
        <img src={img} className="w-15" />
        <Link to="/" className="text-white text-3xl font-bold">
          Heart<span className="text-red-500">Link.</span>
        </Link>
      </div>
      <div className="flex text-white text-[15px] gap-8 font-bold">
        <Link to="/">Início</Link>
        <Link to="/dicas">Como funciona?</Link>
        <Link to="/temas">Temas</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/help">F.A.Q</Link>
      </div>
      <div className="text-white">
        <Link to="conta" className="flex items-center text-[15px] font-bold mr-5">
        <IoPersonOutline size={20} className="mr-3" />
        Minha conta
        </Link>
      </div>
    </div>
  );
}
