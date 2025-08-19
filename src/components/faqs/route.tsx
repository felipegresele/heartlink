import { useState } from "react"
import { Link } from "react-router-dom"

export function Faqs() {

    const perguntas = [
        {
            id: 1,
            title: "O que é a HeartLink",
            description: "Heartzzu é uma plataforma que permite criar páginas personalizadas para pessoas especiais. Você pode adicionar fotos, uma mensagem e também o tempo da união.",
        },
        {
            id: 2,
            title: "Como posso criar uma página personalizada na Heartzzu?",
            description: "Heartzzu é uma plataforma que permite criar páginas personalizadas para pessoas especiais. Você pode adicionar fotos, uma mensagem e também o tempo da união.",
        },
        {
            id: 3,
            title: "O que está incluído na minha página personalizada?",
            description: "Sua página personalizada contará com tudo o que preencher no formulário, dependendo do plano escolhido.",
        },
        {
            id: 4,
            title: "Como recebo minha página personalizada após o pagamento?",
            description: "Após a confirmação do pagamento, você receberá um QR code e um link via email para compartilhar e acessar a página.",
        },
        {
            id: 5,
            title: "A página personalizada tem validade?",
            description: "Sim, no plano básico, a página estará disponível por 1 ano. No plano avançado, a página será vitalícia.",
        },
         {
            id: 6,
            title: "Quanto tempo leva para receber o QR Code por email?",
            description: "Pagamentos com Cartão de Crédito & PIX são processados imediatamente.",
        },
    ]

    const [abrirModal, setAbrirModal] = useState(false)

    function exibirModal() {
        setAbrirModal(true) //abrir modal
    }

    return (
        <div>
            <div>
                <h1>F.A.Q</h1>
            <h1>Perguntas Frequentes</h1>
            <p>Aqui estão algumas perguntas frequentes para ajudar você a entender melhor a HeartLink. Caso tenha alguma dúvida, entre em contato conosco.</p>
            <Link to="/duvidas">Dúvidas? Entre em contato por aqui</Link>
            </div>
        </div>
    )

}