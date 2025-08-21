import { Link } from "react-router-dom"

export function EscolherTemplate() {

    const templates = [
        {
            id: 1,
            title: "Template Padrão",
            button: "Criar",
        },
        {
            id: 2,
            title: "Template Netflix",
            button: "Criar",
        }
    ]

    return (
        <div className="justify-center align-center text-center bg-black text-white">
            <h1 className=" font-bold text-xl p-6">Modelos de templates disponíveis</h1>
            <p className="text-[15px] text-gray-400">Escolha qual você deseja para surpreender alguém</p>
            <div className="flex justify-center align-center gap-10">
                {templates.map((item, index) => (
                    <div key={index} className="rounded-md h-20 w-15 text-white mt-10 mb-4">
                        <h1>{item.title}</h1>
                        <Link to="/padrao">{item.button}</Link>
                    </div>
                ))}
            </div>
            <p className="text-[15px] text-gray-400 mt-10">Em breve mais disponíveis</p>
        </div>
    )

}