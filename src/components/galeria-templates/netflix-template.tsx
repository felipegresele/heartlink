import { useState, useRef } from 'react';
import { FaArrowLeft, FaPlay, FaHeart, FaEdit, FaSave, FaImage, FaUpload, FaCog } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { saveTemplate } from '../../firebase/templates';

interface NetflixTemplateProps {
  onBack: () => void;
}

export function NetflixTemplate({ onBack }: NetflixTemplateProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [templateData, setTemplateData] = useState({
    title: 'Nossa História de Amor',
    subtitle: 'Uma série original do coração',
    description: 'Acompanhe a jornada épica de dois corações que se encontraram e decidiram escrever juntos a mais bela história de amor. Uma produção exclusiva dos nossos sentimentos.',
    partnerName: 'Meu Amor',
    backgroundImage: null as string | null,
    backgroundSettings: {
      size: 'cover' as 'cover' | 'contain' | 'auto',
      position: 'center' as 'center' | 'top' | 'bottom' | 'left' | 'right'
    },
    episodes: [
      { title: 'Primeiro Encontro', duration: '∞ min', image: null as string | null, imageSettings: { size: 'cover' as 'cover' | 'contain' | 'auto', position: 'center' as 'center' | 'top' | 'bottom' | 'left' | 'right' } },
      { title: 'Primeiro Beijo', duration: '∞ min', image: null as string | null, imageSettings: { size: 'cover' as 'cover' | 'contain' | 'auto', position: 'center' as 'center' | 'top' | 'bottom' | 'left' | 'right' } },
      { title: 'Eu Te Amo', duration: '∞ min', image: null as string | null, imageSettings: { size: 'cover' as 'cover' | 'contain' | 'auto', position: 'center' as 'center' | 'top' | 'bottom' | 'left' | 'right' } },
      { title: 'Para Sempre', duration: '∞ min', image: null as string | null, imageSettings: { size: 'cover' as 'cover' | 'contain' | 'auto', position: 'center' as 'center' | 'top' | 'bottom' | 'left' | 'right' } }
    ]
  });

  const [showBackgroundSettings, setShowBackgroundSettings] = useState(false);
  const [showEpisodeSettings, setShowEpisodeSettings] = useState<number | null>(null);

  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const episodeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      alert('Você precisa estar logado para salvar o template!');
      return;
    }

    setIsSaving(true);
    try {
      await saveTemplate({
        userId: user.uid,
        title: templateData.title,
        templateType: 'netflix',
        data: templateData,
        createdAt: new Date()
      });
      
      setIsEditing(false);
      alert('Template salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar template:', error);
      alert('Erro ao salvar template. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setTemplateData(prev => ({ ...prev, [field]: value }));
  };

  const updateEpisode = (index: number, field: string, value: any) => {
    setTemplateData(prev => ({
      ...prev,
      episodes: prev.episodes.map((ep, i) => 
        i === index ? { ...ep, [field]: value } : ep
      )
    }));
  };

  const updateBackgroundSettings = (setting: string, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      backgroundSettings: { ...prev.backgroundSettings, [setting]: value }
    }));
  };

  const updateEpisodeImageSettings = (index: number, setting: string, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      episodes: prev.episodes.map((ep, i) => 
        i === index 
          ? { ...ep, imageSettings: { ...ep.imageSettings, [setting]: value } }
          : ep
      )
    }));
  };

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemplateData(prev => ({ ...prev, backgroundImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEpisodeImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateEpisode(index, 'image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-gray-900">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm md:text-base"
        >
          <FaArrowLeft className="text-sm" /> <span className="hidden sm:inline">Voltar aos Templates</span><span className="sm:hidden">Voltar</span>
        </button>
        
        <div className="flex gap-2 md:gap-4">
          {isEditing ? (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded transition-colors text-sm md:text-base ${
                isSaving 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="hidden sm:inline">Salvando...</span>
                </>
              ) : (
                <>
                  <FaSave className="text-sm" /> <span className="hidden sm:inline">Salvar</span>
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 md:gap-2 bg-red-600 hover:bg-red-700 px-3 md:px-4 py-2 rounded transition-colors text-sm md:text-base"
            >
              <FaEdit className="text-sm" /> <span className="hidden sm:inline">Editar</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-screen bg-gradient-to-r from-black via-red-900/20 to-transparent">
          {templateData.backgroundImage && (
            <div 
              className="absolute inset-0 bg-no-repeat"
              style={{ 
                backgroundImage: `url(${templateData.backgroundImage})`,
                backgroundSize: templateData.backgroundSettings.size,
                backgroundPosition: templateData.backgroundSettings.position
              }}
            ></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
          
          {/* Background Image Controls */}
          {isEditing && (
            <div className="absolute top-20 right-4 md:right-8 flex flex-col gap-2">
              <input 
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                ref={backgroundInputRef}
                className="hidden"
              />
              <button 
                onClick={() => backgroundInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base"
              >
                <FaUpload className="text-sm" /> <span className="hidden sm:inline">{templateData.backgroundImage ? 'Alterar Fundo' : 'Adicionar Fundo'}</span><span className="sm:hidden">Fundo</span>
              </button>
              
              {templateData.backgroundImage && (
                <button 
                  onClick={() => setShowBackgroundSettings(!showBackgroundSettings)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <FaCog className="text-sm" /> <span className="hidden sm:inline">Ajustar Fundo</span><span className="sm:hidden">Ajustar</span>
                </button>
              )}
              
              {showBackgroundSettings && templateData.backgroundImage && (
                <div className="bg-gray-800/90 p-3 md:p-4 rounded-lg backdrop-blur-sm w-48 md:w-auto">
                  <h4 className="text-xs md:text-sm font-semibold mb-3">Ajustes do Fundo</h4>
                  
                  <div className="mb-3">
                    <label className="block text-xs text-gray-300 mb-1">Tamanho:</label>
                    <select 
                      value={templateData.backgroundSettings.size}
                      onChange={(e) => updateBackgroundSettings('size', e.target.value)}
                      className="w-full bg-gray-700 text-white text-xs p-2 rounded"
                    >
                      <option value="cover">Cobrir (Cover)</option>
                      <option value="contain">Conter (Contain)</option>
                      <option value="auto">Tamanho Original</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Posição:</label>
                    <select 
                      value={templateData.backgroundSettings.position}
                      onChange={(e) => updateBackgroundSettings('position', e.target.value)}
                      className="w-full bg-gray-700 text-white text-xs p-2 rounded"
                    >
                      <option value="center">Centro</option>
                      <option value="top">Topo</option>
                      <option value="bottom">Base</option>
                      <option value="left">Esquerda</option>
                      <option value="right">Direita</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Netflix Logo */}
          <div className="absolute top-4 md:top-8 left-4 md:left-8">
            <h1 className="text-red-600 text-2xl md:text-4xl font-bold tracking-wider">NETFLIX</h1>
          </div>

          {/* Title and Description */}
          <div className="absolute bottom-16 md:bottom-32 left-4 md:left-8 right-4 md:right-auto md:max-w-2xl">
            {isEditing ? (
              <input 
                type="text"
                value={templateData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-transparent border-b-2 border-red-600 text-white w-full focus:outline-none"
              />
            ) : (
              <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{templateData.title}</h1>
            )}
            
            {isEditing ? (
              <input 
                type="text"
                value={templateData.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="text-lg md:text-xl text-red-400 mb-4 md:mb-6 bg-transparent border-b border-red-600 text-red-400 w-full focus:outline-none"
              />
            ) : (
              <p className="text-lg md:text-xl text-red-400 mb-4 md:mb-6">{templateData.subtitle}</p>
            )}
            
            {isEditing ? (
              <textarea 
                value={templateData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed bg-gray-800/50 border border-red-600 text-white w-full p-3 md:p-4 rounded focus:outline-none resize-none"
                rows={3}
              />
            ) : (
              <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">{templateData.description}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="flex items-center justify-center gap-2 md:gap-3 bg-white text-black font-semibold px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-200 transition-colors text-sm md:text-base">
                <FaPlay className="text-sm" /> Assistir Agora
              </button>
              <button className="flex items-center justify-center gap-2 md:gap-3 bg-gray-600/80 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-600 transition-colors text-sm md:text-base">
                <FaHeart className="text-red-500 text-sm" /> <span className="hidden sm:inline">Adicionar à Lista</span><span className="sm:hidden">Favoritar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="px-4 md:px-8 py-8 md:py-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Melhores episódios</h2>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {templateData.episodes.map((episode, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                  {episode.image ? (
                    <div 
                      className="w-full h-full bg-no-repeat bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${episode.image})`,
                        backgroundSize: episode.imageSettings.size,
                        backgroundPosition: episode.imageSettings.position
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                      <span className="text-4xl md:text-6xl font-bold text-white opacity-50">{index + 1}</span>
                    </div>
                  )}
                  
                  {/* HD Badge */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3">
                    <span className="bg-gray-800/80 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded font-semibold">HD</span>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 md:p-4 rounded-full transition-colors">
                      <FaPlay className="text-white text-lg md:text-xl ml-1" />
                    </button>
                  </div>
                  
                  {/* Episode Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    {isEditing ? (
                      <input 
                        type="text"
                        value={episode.title}
                        onChange={(e) => updateEpisode(index, 'title', e.target.value)}
                        className="text-white font-semibold bg-transparent border-b border-red-600 w-full focus:outline-none text-xs md:text-sm"
                      />
                    ) : (
                      <h3 className="text-white font-semibold text-xs md:text-sm drop-shadow-lg">{episode.title}</h3>
                    )}
                  </div>
                  
                  {/* Episode Image Controls */}
                  {isEditing && (
                    <div className="absolute top-2 md:top-3 left-2 md:left-3 flex gap-1">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEpisodeImageUpload(index, e)}
                        ref={(el) => episodeInputRefs.current[index] = el}
                        className="hidden"
                      />
                      <button 
                        onClick={() => episodeInputRefs.current[index]?.click()}
                        className="bg-blue-600/80 hover:bg-blue-600 text-white p-1.5 md:p-2 rounded-full text-xs transition-colors backdrop-blur-sm"
                        title={episode.image ? 'Alterar imagem' : 'Adicionar imagem'}
                      >
                        <FaUpload className="text-xs" />
                      </button>
                      
                      {episode.image && (
                        <button 
                          onClick={() => setShowEpisodeSettings(showEpisodeSettings === index ? null : index)}
                          className="bg-green-600/80 hover:bg-green-600 text-white p-1.5 md:p-2 rounded-full text-xs transition-colors backdrop-blur-sm"
                          title="Ajustar imagem"
                        >
                          <FaCog className="text-xs" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Episode Image Settings Panel */}
                {isEditing && showEpisodeSettings === index && episode.image && (
                  <div className="absolute top-12 md:top-16 left-2 md:left-3 bg-black/90 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gray-700 z-10 min-w-44 md:min-w-48">
                    <h4 className="text-white text-xs md:text-sm font-semibold mb-2 md:mb-3">Ajustar Imagem do Episódio</h4>
                    
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <label className="text-white text-xs mb-1 block">Tamanho:</label>
                        <select 
                          value={episode.imageSettings.size}
                          onChange={(e) => updateEpisodeImageSettings(index, 'size', e.target.value)}
                          className="w-full bg-gray-800 text-white text-xs p-1.5 md:p-2 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
                        >
                          <option value="cover">Cobrir</option>
                          <option value="contain">Conter</option>
                          <option value="100% 100%">Original</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-white text-xs mb-1 block">Posição:</label>
                        <select 
                          value={episode.imageSettings.position}
                          onChange={(e) => updateEpisodeImageSettings(index, 'position', e.target.value)}
                          className="w-full bg-gray-800 text-white text-xs p-1.5 md:p-2 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
                        >
                          <option value="center">Centro</option>
                          <option value="top">Topo</option>
                          <option value="bottom">Base</option>
                          <option value="left">Esquerda</option>
                          <option value="right">Direita</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Add More Episodes Button */}
            {isEditing && (
              <div className="relative group">
                <div className="relative aspect-video bg-gray-700/50 border-2 border-dashed border-gray-500 rounded-lg overflow-hidden hover:bg-gray-600/50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center cursor-pointer"
                     onClick={() => {
                       const newEpisode = {
                         title: `Episódio ${templateData.episodes.length + 1}`,
                         image: '',
                         imageSettings: { size: 'cover', position: 'center' }
                       };
                       setTemplateData(prev => ({
                         ...prev,
                         episodes: [...prev.episodes, newEpisode]
                       }));
                     }}>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl text-gray-400 mb-2">+</div>
                    <p className="text-gray-400 text-xs md:text-sm font-medium">Adicionar<br className="md:hidden" /><span className="hidden md:inline"> </span>Episódio</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dedication Section */}
        <div className="px-8 py-12 bg-gray-900">
          <div className="text-center max-w-2xl mx-auto">
            <FaHeart className="text-red-500 text-4xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Dedicado com amor para</h2>
            {isEditing ? (
              <input 
                type="text"
                value={templateData.partnerName}
                onChange={(e) => updateField('partnerName', e.target.value)}
                className="text-2xl text-red-400 font-semibold bg-transparent border-b-2 border-red-600 text-center focus:outline-none"
              />
            ) : (
              <p className="text-2xl text-red-400 font-semibold">{templateData.partnerName}</p>
            )}
            <p className="text-gray-300 mt-6">
              Uma produção original do meu coração ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}