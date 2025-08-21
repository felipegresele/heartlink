import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash, FaHeart } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn, signUp, signInWithGoogle } from '../../firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (!isLogin) {
      if (!formData.displayName) {
        setError('Por favor, informe seu nome.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return false;
      }
      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.displayName);
      }
      onSuccess();
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro. Tente novamente.';
      
      if (error.message.includes('user-not-found')) {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.message.includes('wrong-password')) {
        errorMessage = 'Senha incorreta.';
      } else if (error.message.includes('email-already-in-use')) {
        errorMessage = 'Este email já está em uso.';
      } else if (error.message.includes('invalid-email')) {
        errorMessage = 'Email inválido.';
      } else if (error.message.includes('weak-password')) {
        errorMessage = 'A senha é muito fraca.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      onSuccess();
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login com Google. Tente novamente.';
      
      if (error.message.includes('popup-closed-by-user')) {
        errorMessage = 'Login cancelado pelo usuário.';
      } else if (error.message.includes('popup-blocked')) {
        errorMessage = 'Pop-up bloqueado. Permita pop-ups para este site.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    });
    setError('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden border border-red-500/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500/20 via-black to-red-500/20 p-8 text-white relative border-b border-red-500/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <FaHeart className="text-3xl text-red-500" />
            <h2 className="text-3xl font-bold">Heart<span className="text-red-500">Link</span></h2>
          </div>
          
          <p className="text-red-400 text-lg font-medium italic">
            {isLogin ? 'Declare seu amor novamente!' : 'Comece a declarar seu amor!'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6 shadow-md"
          >
            <FcGoogle className="text-xl" />
            {isLogin ? 'Entrar com Google' : 'Cadastrar com Google'}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">ou</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-red-500/30 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-500 backdrop-blur-sm"
                  placeholder="Seu nome completo"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-red-500/30 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-500 backdrop-blur-sm"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-red-500/30 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-500 backdrop-blur-sm"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-red-500/30 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-500 backdrop-blur-sm"
                    placeholder="Confirme sua senha"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg transform hover:scale-[1.02]"
            >
              {loading ? 'Carregando...' : (isLogin ? '💖 Entrar' : '💖 Criar conta')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-base">
              {isLogin ? 'Ainda não declarou seu amor?' : 'Já tem uma conta?'}
              <button
                onClick={switchMode}
                className="ml-2 text-red-400 hover:text-red-300 font-bold transition-colors underline decoration-red-400/50 hover:decoration-red-300"
              >
                {isLogin ? 'Comece agora!' : 'Entre aqui!'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;