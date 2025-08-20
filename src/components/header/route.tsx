import { Link } from "react-router-dom";
import img from "../../assets/img.jpg";
import { IoPersonOutline} from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import AuthModal from "../auth/AuthModal";

export function Header() {
  const { user, userData, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLogout = async () => {
    try {
      await signOut();
      setShowDropdown(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

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
      <div className="text-white relative">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center text-[15px] font-bold mr-5 hover:text-red-400 transition-colors"
            >
              <IoPersonOutline size={20} className="mr-3" />
               {userData?.displayName || user?.displayName || user?.email}
               <FaChevronDown size={12} className="ml-2" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-5 top-full mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 min-w-48 z-50">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 mr-5">
            <button 
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              className="px-4 py-2 text-white border border-[#fb2c36] rounded-lg hover:bg-[#fb2c36] transition-all duration-300 font-medium"
            >
              Entrar
            </button>
            <button 
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              className="px-4 py-2 bg-[#fb2c36] text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium"
            >
              Cadastrar
            </button>
          </div>
        )}
      </div>
      
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      )}
    </div>
  );
}
