
export function EscolhaTema() {

    return (
        <div className="text-white bg-black justify-center text-center flex flex-col">
            <h1 className="text-xl font-semibold">Temas HeartLink</h1>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">Escolha o seu tema ideal</h1>
            <p className="text-gray-300 mt-4 mb-15">Escolhe o tema para a página personalizadam. Você pode escolher entre os temas abaixo.</p>
            <ContentTemas />
        </div>
    )
}

function ContentTemas() {

    return (
        <div className="flex gap-15 text-white bg-black justify-center align-center mb-15">
            <div className="w-[500px] h-[900px] bg-white rounded-md">
                <h1>Teste</h1>
            </div>
            <div className="w-[500px] h-[900px] bg-white rounded-md">
                <h1>Teste</h1>
            </div>
        </div>
    )


}