export interface FormTituloProps {
  titulo: string;
  setTitulo: (value: string) => void;
  corTitulo: string;
  setCorTitulo: (value: string) => void;
  fonteTitulo: string;
  setFonteTitulo: (value: string) => void;
  tamanhoTitulo: number;
  setTamanhoTitulo: (value: number) => void;
}

export interface FormMensagemProps {
  mensagem: string;
  setMensagem: (value: string) => void;
  tamanhoMensagem: number;
  setTamanhoMensagem: (value: number) => void;
}

export interface FormImagensProps {
  imagens: string[];
  setImagens: (value: string[]) => void;
}

export interface FormModoImagemProps {
  modoImagem: string;
  setModoImagem: (value: string) => void;
}

export interface FormTempoConhecimentoProps {
  dataConhecimento: string;
  setDataConhecimento: (value: string) => void;
}

export interface FormModoExibicaoProps {
  modoExibicao: string;
  setModoExibicao: (value: string) => void;
}