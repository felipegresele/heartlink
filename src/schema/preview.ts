import type { ModoExibicao, ModoImagem } from "./form-templates";

export interface PreviewCarrosselProps {
  titulo: string;
  mensagem: string;
  corTitulo: string;
  fonteTitulo: string;
  tamanhoTitulo: number;
  tamanhoMensagem: number;
  musicaSelecionada?: {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
  } | null;
  imagens: string[];
  dataConhecimento: string;
  modoExibicao?: ModoExibicao;
  modoImagem?: ModoImagem;
  efeitoFundo: string;
  customEmojis: string[];
}
