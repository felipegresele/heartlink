import { SiInstagram, SiTiktok } from "react-icons/si";
import { Link } from "react-router-dom";

import img from "../../assets/img.jpg"

export function Footer() {
  return (
    <div className="bg-black flex flex-col justify-between text-white p-5">
      <FooterContent />
      <h1 className="text-end p-4">Pagamento seguro com tal empresa</h1>
    </div>
  );
}

export function FooterContent() {
  return (
    <footer className="bg-black text-white px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <img src={img} alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">
              Heart<span className="text-red-500">link.</span>
            </h1>
          </div>
          <p className="text-gray-300 text-sm mb-2">
            A HeartLink é uma plataforma que permite criar páginas personalizadas
            para pessoas espec.
          </p>
          <p className="text-gray-400 text-xs mt-6">
            Copyright © 2025 - Heartlink.com
          </p>
        </div>

        <div className="flex flex-col text-sm gap-2">
          <Link to="/termos-de-uso" className="hover:text-red-500 transition-colors">
            Termos de uso
          </Link>
          <Link to="/privacidade" className="hover:text-red-500 transition-colors">
            Política de privacidade
          </Link>
        </div>

        {/* Redes sociais */}
        <div className="flex flex-col text-sm gap-2">
          <a
            href="https://instagram.com/seuPerfil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-500 transition-colors"
          >
            <SiInstagram /> Instagram
          </a>
          <a
            href="https://tiktok.com/@seuPerfil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-500 transition-colors"
          >
            <SiTiktok /> TikTok
          </a>
        </div>
      </div>
      </footer>
  );
}
