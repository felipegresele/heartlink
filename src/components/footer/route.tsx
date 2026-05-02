import { SiInstagram, SiTiktok } from "react-icons/si";
import { Link } from "react-router-dom";

import img from "../../img/logo.png";
import imgLogoMercadoLivre from "../../img/mercado-pago-icon.jpg";

export function Footer() {
  return (
    <div className="bg-[#FAFAFA] flex flex-col justify-between text-white p-5">
      <FooterContent />
    </div>
  );
}

export function FooterContent() {
  return (
    <footer className="bg-[#FAFAFA] text-black px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <img src={img} alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">
              Heart<span className="text-[#e687cd]">Code.</span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm mb-2">
            A HeartCode é uma plataforma que permite criar páginas
            personalizadas para pessoas especiais.
          </p>
          <p className="text-gray-600 font-bold text-xs mt-6">
            Copyright © 2025 - HeartCode.com
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-gray-600 font-bold text-xs mt-1">
              Pagamento seguro com Mercado Pago
            </p>
            <img src={imgLogoMercadoLivre} className="w-8 mt-6" />
          </div>
        </div>

        <div className="flex flex-col text-sm gap-2">
          <Link
            to="/termos-de-uso"
            className="hover:text-[#e687cd] transition-colors"
          >
            Termos de uso
          </Link>
          <Link
            to="/privacidade"
            className="hover:text-[#e687cd] transition-colors"
          >
            Política de privacidade
          </Link>
        </div>

        {/* Redes sociais */}
        <div className="flex flex-col text-sm gap-2">
          <a
            href="https://instagram.com/heartcodegift"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#e687cd] transition-colors"
          >
            <SiInstagram /> Instagram
          </a>
          <a
            href="https://www.tiktok.com/@heartcodegift"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#e687cd] transition-colors"
          >
            <SiTiktok /> TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
