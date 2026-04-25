
import videoTemplatePadrao from "../../img/video-tela-inicial/video-template-padrao.mp4"
import ExibirCardCelularesTelaInicial from "../exibir-sessoes-celular/exibir-card-celular-tela-inicial"

export function EscolhaTema() {

    return (
        <div className="text-white bg-[#FAFAFA] text-center justify-center text-black flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-black">Escolha o seu tema ideal</h1>
            <p className="text-gray-500 mt-4">Veja uma prévia de como ficará a pagína inicial.</p>
            <ExibirCardCelularesTelaInicial />
            {/* <ContentTemas /> */}
        </div>
    )
}

function ContentTemas() {

    return (
        <div className="flex text-black bg-white justify-center align-center mb-15">
                <video autoPlay loop playsInline className="w-180 h-150"><source className="rounded-md" src={videoTemplatePadrao} type="video/mp4"/></video>
        </div>
    )
}