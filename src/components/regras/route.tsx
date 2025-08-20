
export function TermosDeUso() {
    const termos = [
        {
            title: "1. Aceitação dos Termos",
            description:
                "Ao acessar e utilizar nossa plataforma, você concorda em seguir e estar sujeito a estes Termos de Uso. Caso não concorde com qualquer parte destes termos, por favor, não utilize o serviço."
        },
        {
            title: "2. Descrição do Serviço",
            description:
                "A HeartLink oferece um serviço que permite aos casais criar uma página personalizada, preenchendo um formulário com nomes, data de início do relacionamento, uma mensagem especial e até 8 mídias. Após o preenchimento, o casal é direcionado ao pagamento e, uma vez confirmado, recebe um link com QR Code enviado por e-mail."
        },
        {
            title: "3. Cadastro e Segurança",
            description:
                "Para utilizar nossos serviços, é necessário fornecer um e-mail válido. Garantimos que seu e-mail não será compartilhado com terceiros."
        },
        {
            title: "4. Política de Privacidade",
            description:
                "Respeitamos sua privacidade. Seus dados não serão vendidos ou processados por terceiros. O e-mail fornecido será usado exclusivamente para envio do link da página personalizada."
        },
        {
            title: "5. Conteúdo do Usuário",
            description:
                "Você é responsável por todo o conteúdo inserido na plataforma, incluindo fotos, mensagens e informações sobre o relacionamento. Não nos responsabilizamos por conteúdos inadequados ou ilegais carregados pelos usuários."
        },
        {
            title: "6. Pagamentos e Política de Reembolso",
            description:
                "Os pagamentos são processados via Stripe e Pagar.me/Stone. Após a confirmação do pagamento, o casal receberá o link da página personalizada por e-mail. Reembolsos não são oferecidos, exceto em situações excepcionais, a critério exclusivo da HeartLink."
        },
        {
            title: "7. Alterações no Serviço",
            description:
                "Nos esforçamos para manter o serviço disponível durante o período contratado (1 ano no plano básico ou vitalício no plano avançado). Entretanto, em situações extraordinárias, como problemas técnicos, legais ou financeiros, reservamo-nos o direito de alterar ou descontinuar o serviço. Em caso de descontinuação, notificaremos os usuários com antecedência e buscaremos fornecer alternativas sempre que possível. A HeartLink não se responsabiliza por perdas decorrentes de alterações ou interrupções em situações excepcionais, mas envidará esforços para minimizar impactos."
        },
        {
            title: "8. Limitação de Responsabilidade",
            description:
                "Não nos responsabilizamos por danos indiretos, incidentais, especiais ou consequentes relacionados ao uso ou à impossibilidade de uso da plataforma."
        },
        {
            title: "9. Atualização dos Termos",
            description:
                "Podemos revisar estes Termos de Uso periodicamente. Quando isso ocorrer, atualizaremos a data de “última atualização” no topo desta página. É responsabilidade do usuário revisar os termos regularmente para se manter informado sobre possíveis mudanças."
        },
        {
            title: "10. Contato",
            description:
                "Se tiver dúvidas sobre estes Termos de Uso, entre em contato conosco pelo Instagram: @heartlink_"
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white px-6 py-12">
            <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
                <span className="text-white">Termos de Uso</span> - HeartLink
            </h1>
            <div className="max-w-4xl mx-auto space-y-6">
                {termos.map((item, index) => (
                    <div key={index} className="border-l-4 border-red-600 pl-4">
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            {item.title}
                        </h2>
                        <p className="text-white">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Privacidade() {

  const politicas = [
    {
      title: "1. Introdução",
      description:
        "Sua privacidade é muito importante para nós. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nossa plataforma."
    },
    {
      title: "2. Informações que Coletamos",
      description:
        "Coletamos as seguintes informações ao usar a HeartLink:\n\n• Informações de Cadastro: Nome, data de início do relacionamento, mensagem personalizada, fotos do casal e endereço de e-mail.\n• Informações de Pagamento: E-mail registrado no Stripe ou Pagar.me/Stone, utilizado para processar o pagamento e enviar o link da página personalizada."
    },
    {
      title: "3. Como Utilizamos Suas Informações",
      description:
        "Usamos suas informações para:\n\n• Processar pagamentos e enviar o link da página personalizada por e-mail.\n• Criar e personalizar a página do casal com os dados fornecidos.\n• Melhorar nossos serviços e oferecer suporte ao cliente."
    },
    {
      title: "4. Compartilhamento de Informações",
      description:
        "Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para processar pagamentos (Stripe e Pagar.me/Stone) ou quando exigido por lei."
    },
    {
      title: "5. Segurança",
      description:
        "Adotamos medidas de segurança para proteger suas informações pessoais contra acesso, uso ou divulgação não autorizados. No entanto, nenhuma transmissão de dados pela internet é totalmente segura, e não podemos garantir segurança absoluta."
    },
    {
      title: "6. Retenção de Dados",
      description:
        "Manteremos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades de coleta ou conforme exigido por lei."
    },
    {
      title: "7. Seus Direitos",
      description:
        "Você pode acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para isso, entre em contato conosco pelo Instagram: @heartlink_"
    },
    {
      title: "8. Alterações nesta Política",
      description:
        "Podemos atualizar esta Política de Privacidade periodicamente. A data da “última atualização” será alterada sempre que houver mudanças. É sua responsabilidade revisá-la regularmente."
    },
    {
      title: "9. Contato",
      description:
        "Se tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo Instagram: @heartlink_"
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
        <span className="text-white">Política de Privacidade</span> - HeartLink
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {politicas.map((item, index) => (
          <div key={index} className="border-l-4 border-red-600 pl-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {item.title}
            </h2>
            <p className="whitespace-pre-line text-white">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

