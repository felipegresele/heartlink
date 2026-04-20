
import videoTemplatePadrao from "../../img/video-tela-inicial/video-template-padrao.mp4"

export function EscolhaTema() {

    return (
        <div className="text-white bg-black justify-center text-center flex flex-col">
            <h1 className="text-xl font-semibold">Temas HeartCode</h1>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">Escolha o seu tema ideal</h1>
            <p className="text-gray-300 mt-4 mb-15">Veja uma prévia de como ficará a pagína inicial.</p>
            <ContentTemas />
        </div>
    )
}

function ContentTemas() {

    return (
        <div className="flex text-white bg-black justify-center align-center mb-15">
                <video autoPlay loop playsInline className="w-180 h-150"><source className="rounded-md" src={videoTemplatePadrao} type="video/mp4"/></video>
        </div>
    )
}