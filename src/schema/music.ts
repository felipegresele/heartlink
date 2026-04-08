export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export interface EscolherMusicaProps {
    onMusicSelect: (video: Video) => void;
    videoSelecionado: Video | null;
}

export interface Music {
  id: string
  title: string
  thumbnail: string
  channelTitle: string
  duration?: number
}

export interface MusicPlayerFooterProps {
  musica: Music | null
}
