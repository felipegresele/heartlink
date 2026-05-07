import type { ModoExibicao, ModoImagem } from "./form-templates";

export interface PreviewCarrosselProps {
  titulo: string;
  mensagem: string;
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
  tipoPresenteado?: "CASAL" | "FILHO_E_MAE" | "FILHA_E_MAE" | null;
}
