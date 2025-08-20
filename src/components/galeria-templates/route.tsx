import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaPlay, FaUser, FaPlus } from 'react-icons/fa';
import { NetflixTemplate } from './netflix-template';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import { getUserTemplates, type TemplateData } from '../../firebase/templates';

export function GaleriaTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userTemplates, setUserTemplates] = useState<TemplateData[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    if (!user && !loading) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  const templates = [
    {
      id: 'netflix',
      name: 'Netflix Love',
      description: 'Template inspirado no Netflix para declarar seu amor',
      preview: '/netflix-preview.jpg',
      component: NetflixTemplate
    }
  ];

  // Carregar templates do usuário quando autenticado
  useEffect(() => {
    if (user) {
      loadUserTemplates();
    }
  }, [user]);

  const loadUserTemplates = async () => {
    if (!user) return;
    
    setLoadingTemplates(true);
    try {
      const templates = await getUserTemplates(user.uid);
      setUserTemplates(templates);
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedTemplate(templateId);
  };

  const handleUserTemplateSelect = (template: TemplateData) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Aqui você pode implementar a lógica para carregar um template salvo
    // Por enquanto, vamos apenas selecionar o template base
    setSelectedTemplate(template.templateType);
  };

  if (selectedTemplate) {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template) {
      const TemplateComponent = template.component;
      return <TemplateComponent onBack={() => setSelectedTemplate(null)} />;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 md:px-20 py-12">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Voltar
        </Link>
      </div>

      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Escolha seu Template
        </h1>
        <p className="text-gray-300 text-lg">
          Selecione um template perfeito para declarar seu amor
        </p>
      </div>

      {/* Título para Templates Disponíveis */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Templates Disponíveis</h2>
        <p className="text-gray-400">Escolha um template para começar a criar</p>
      </div>

      {/* Grid de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* Preview do Template */}
            <div className="h-64 bg-gradient-to-br from-red-600 to-black flex items-center justify-center relative">
              <div className="text-center">
                <FaHeart className="text-red-500 text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">NETFLIX</h3>
                <p className="text-sm text-gray-300">Template de Amor</p>
                <div className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <FaPlay size={12} />
                  Visualizar
                </div>
              </div>
            </div>
            
            {/* Informações do Template */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-400 mb-4">{template.description}</p>
              <button className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                Usar este Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção Meus Templates */}
      {user && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-red-500" />
            <h2 className="text-2xl font-bold">Meus Templates</h2>
          </div>
          
          {loadingTemplates ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Carregando seus templates...</p>
            </div>
          ) : userTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {userTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700"
                  onClick={() => handleUserTemplateSelect(template)}
                >
                  <div className="h-48 bg-gradient-to-br from-red-600 to-black flex items-center justify-center relative">
                    <div className="text-center">
                      <FaHeart className="text-red-500 text-3xl mb-3 mx-auto" />
                      <h3 className="text-lg font-bold mb-1">{template.title}</h3>
                      <p className="text-xs text-gray-300">Template Salvo</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Criado em {new Date(template.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}
                    </p>
                    <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                      Editar Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-900 rounded-lg">
              <FaHeart className="text-gray-600 text-4xl mx-auto mb-4" />
              <p className="text-gray-400">Você ainda não tem templates salvos.</p>
              <p className="text-gray-500 text-sm">Crie seu primeiro template abaixo!</p>
            </div>
          )}
        </div>
      )}

      {/* Mensagem de mais templates em breve */}
      <div className="text-center mt-12">
        <p className="text-gray-400">
          Mais templates incríveis chegando em breve! ❤️
        </p>
      </div>

      {/* Modal de Autenticação */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            // Após login bem-sucedido, carregar templates do usuário
            loadUserTemplates();
          }}
        />
      )}
    </div>
  );
}