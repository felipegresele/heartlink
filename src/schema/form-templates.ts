export interface FormTituloProps {
  titulo: string;
  setTitulo: (value: string) => void;
  mensagemTitulo: string;
}

export interface FormMensagemProps {
  mensagem: string;
  setMensagem: (value: string) => void;
  tituloMensagem: string;
}

export interface FormImagensProps {
  imagens: string[];
  setImagens: (value: string[]) => void;
}


export interface FormTempoConhecimentoProps {
  dataConhecimento: string;
  setDataConhecimento: (value: string) => void;
  mensagem:string;
}

export type ModoExibicao = "padrao" | "classico" | "simples";
export type ModoImagem = "carrossel" | "slideshow";

export type PageTemplate = "PADRAO" | "SPOTIFY";

export interface FormModoExibicaoProps {
  modoExibicao: ModoExibicao;
  setModoExibicao: React.Dispatch<React.SetStateAction<ModoExibicao>>;
}

export interface FormModoImagemProps {
  modoImagem: ModoImagem;
  setModoImagem: React.Dispatch<React.SetStateAction<ModoImagem>>;
}