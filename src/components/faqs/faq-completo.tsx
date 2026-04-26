"use client";

import { useState } from "react";
import { Accordion, Button, UnstyledButton } from "@mantine/core";

const faqCategorias = [
  {
    id: "sobre",
    emoji: "💡",
    titulo: "Sobre a HeartCode",
    perguntas: [
      {
        pergunta: "O que é a HeartCode?",
        resposta:
          "A HeartCode é uma plataforma que permite criar páginas personalizadas para surpreender alguém especial com uma experiência única e emocionante.",
      },
      {
        pergunta: "Para quem é a HeartCode?",
        resposta:
          "Para qualquer pessoa que queira criar um presente diferente, criativo e inesquecível — seja para namorado(a), cônjuge, amigo, familiar ou qualquer pessoa importante na sua vida.",
      },
      {
        pergunta: "A HeartCode é uma empresa confiável?",
        resposta:
          "Sim! Somos uma plataforma focada em experiências afetivas digitais, com centenas de casais que já usaram para momentos especiais.",
      },
      {
        pergunta: "Preciso criar uma conta?",
        resposta:
          "Sim, um cadastro simples é necessário para salvar e gerenciar sua página personalizada.",
      },
    ],
  },
  {
    id: "criar",
    emoji: "🛠️",
    titulo: "Como Criar",
    perguntas: [
      {
        pergunta: "Preciso saber programar?",
        resposta:
          "Não! A plataforma foi feita para ser simples e intuitiva. Você cria tudo em poucos minutos, sem nenhum conhecimento técnico.",
      },
      {
        pergunta: "Quanto tempo leva para criar minha página?",
        resposta:
          "Em poucos minutos você já consegue montar e finalizar sua página personalizada. A maioria das pessoas conclui em menos de 10 minutos.",
      },
      {
        pergunta: "Posso visualizar como ficará antes de pagar?",
        resposta:
          "Sim! Você pode montar toda a sua página e pré-visualizar o resultado antes de finalizar o pagamento.",
      },
      {
        pergunta: "Posso criar mais de uma página?",
        resposta:
          "Sim, você pode criar múltiplas páginas — cada uma com um link exclusivo — para diferentes pessoas ou ocasiões.",
      },
    ],
  },
  {
    id: "funcionalidades",
    emoji: "✨",
    titulo: "Funcionalidades",
    perguntas: [
      {
        pergunta: "O que posso adicionar na página?",
        resposta:
          "Fotos, mensagens personalizadas, músicas, retrospectiva do casal, contador de tempo juntos, jogos, roleta de surpresas e muito mais.",
      },
      {
        pergunta: "Posso editar depois de criar?",
        resposta:
          "Sim! Você pode atualizar o conteúdo da sua página sempre que quiser, sem custo adicional.",
      },
      {
        pergunta: "Posso adicionar música de fundo?",
        resposta:
          "Sim! Você pode vincular uma música especial para tocar automaticamente quando a pessoa abrir a página.",
      },
      {
        pergunta: "A página funciona no celular?",
        resposta:
          "Com certeza! Todas as páginas são 100% responsivas e otimizadas para smartphones — exatamente onde a maioria das pessoas vai acessar.",
      },
    ],
  },
  {
    id: "ocasioes",
    emoji: "🎁",
    titulo: "Ocasiões & Presentes",
    perguntas: [
      {
        pergunta: "Para quais ocasiões posso usar?",
        resposta:
          "Aniversário de namoro, pedido de namoro, casamento, aniversário, Dia dos Namorados, Natal, ou qualquer momento especial que mereça ser celebrado.",
      },
      {
        pergunta: "É um bom presente?",
        resposta:
          "Sim! É um presente único, personalizado e que realmente emociona quem recebe — diferente de qualquer outra coisa.",
      },
      {
        pergunta: "Posso dar de presente para um amigo ou familiar?",
        resposta:
          "Com certeza! A plataforma não é exclusiva para casais. Você pode criar para amigos, pais, filhos ou qualquer pessoa especial.",
      },
    ],
  },
  {
    id: "pagamento",
    emoji: "💳",
    titulo: "Pagamento & Planos",
    perguntas: [
      {
        pergunta: "Como funciona o pagamento?",
        resposta:
          "O pagamento é processado de forma segura pela plataforma do Mercado Pago. Ao finalizar a criação da sua página, você gera automaticamente um link de pagamento para concluir a compra.",
      },
      {
        pergunta: "Quais formas de pagamento são aceitas?",
        resposta:
          "PIX e cartão de crédito — processados diretamente pelo Mercado Pago com total segurança.",
      },
      {
        pergunta: "O pagamento é seguro?",
        resposta:
          "Sim! Utilizamos o Mercado Pago, uma das maiores plataformas de pagamentos da América Latina, garantindo proteção total para sua transação.",
      },
      {
        pergunta: "A página tem validade?",
        resposta:
          "Depende do plano escolhido. Você pode optar por acesso anual ou vitalício, com a garantia de que sua página ficará disponível conforme o plano.",
      },
      {
        pergunta: "Posso pedir reembolso?",
        resposta:
          "Analisamos cada caso individualmente. Entre em contato com nosso suporte pelo Instagram para mais informações.",
      },
    ],
  },
  {
    id: "acesso",
    emoji: "🚀",
    titulo: "Acesso & Entrega",
    perguntas: [
      {
        pergunta: "Como recebo minha página?",
        resposta:
          "Você recebe um link exclusivo e um QR Code pelo seu e-mail cadastrado na sua conta logo após a confirmação do pagamento.",
      },
      {
        pergunta: "O acesso é imediato?",
        resposta:
          "Sim! Pagamentos via PIX e cartão de crédito liberam o acesso quase instantaneamente, sem espera.",
      },
      {
        pergunta: "Como compartilho a página com a pessoa?",
        resposta:
          "Você pode enviar o link direto via WhatsApp, e-mail ou redes sociais — ou imprimir o QR Code para um presente físico surpresa.",
      },
    ],
  },
  {
    id: "seguranca",
    emoji: "🔒",
    titulo: "Segurança & Confiança",
    perguntas: [
      {
        pergunta: "Meus dados estão seguros?",
        resposta:
          "Sim. Utilizamos boas práticas de segurança e criptografia para proteger todas as suas informações pessoais e de pagamento.",
      },
      {
        pergunta: "A página é privada?",
        resposta:
          "Sim! Apenas quem tiver o link exclusivo ou o QR Code poderá acessar a sua página — ela não aparece em buscas públicas.",
      },
      {
        pergunta: "Terceiros podem ver minha página?",
        resposta:
          "Não. Sua página é completamente privada e só pode ser acessada por quem você decidir compartilhar o link.",
      },
    ],
  },
];

export function FaqCompleto() {
  const [activeCategory, setActiveCategory] = useState("sobre");

  const categoria = faqCategorias.find((c) => c.id === activeCategory)!;

  return (
    <main
      style={{
        backgroundColor: "#FAFAFA",
        color: "black",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "72px 24px 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 340,
            background:
              "radial-gradient(ellipse, rgba(230,51,51,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 15,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#e687cd",
            marginBottom: 14,
          }}
        >
          F.A.Q
        </p>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Tire suas dúvidas
        </h1>

        <p
          style={{
            marginTop: 16,
            color: "#7d7b7b",
            fontSize: "1rem",
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Tudo o que você precisa saber para criar um presente inesquecível com
          a{" "}
          <span style={{ color: "#e687cd", fontWeight: 600 }}>
            HeartCode
          </span>
        </p>
      </section>

      {/* Pills Nav */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          padding: "16px 24px",
          position: "sticky",
          top: 0,
          backgroundColor: "#FAFAFA",
          zIndex: 10,
          borderBottom: "1px solid #1e1e1e",
        }}
      >
        {faqCategorias.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <UnstyledButton
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                border: `1px solid ${isActive ? "#e687cd" : "#1e1e1e"}`,
                backgroundColor: isActive ? "#e687cd" : "#F5F5F5",
                color: isActive ? "#fff" : "#6b6b6b",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 14 }}>{cat.emoji}</span>
              {cat.titulo}
            </UnstyledButton>
          );
        })}
      </nav>

      {/* Content */}
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Category Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "rgba(230,51,51,0.12)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            {categoria.emoji}
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {categoria.titulo}
          </h2>
        </div>

        {/* Accordion */}
        <Accordion
          chevronPosition="right"
          transitionDuration={220}
          styles={{
            root: {
              border: "1px solid #e687cd",
              borderRadius: 14,
              overflow: "hidden",
            },
            item: {
              borderBottom: "1px solid #aea9a9",
              backgroundColor: "white",
              "&:last-child": { borderBottom: "none" },
              "&[data-active]": { backgroundColor: "#141414" },
            },
            control: {
              color: "#000000",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.92rem",
              padding: "18px 20px",
              "&:hover": { backgroundColor: "#161616" },
            },
            chevron: {
              color: "#e687cd",
              width: 22,
              height: 22,
              backgroundColor: "#d9d3d3",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
              "&[data-rotate]": {
                backgroundColor: "#e687cd",
                color: "#fff",
              },
            },
            panel: {
              backgroundColor: "white",
            },
            content: {
              color: "#514b4b",
              fontSize: "0.88rem",
              lineHeight: 1.7,
              padding: "14px",
              fontFamily: "'DM Sans', sans-serif",
            },
          }}
        >
          {categoria.perguntas.map((item, i) => (
            <Accordion.Item key={i} value={item.pergunta}>
              <Accordion.Control>{item.pergunta}</Accordion.Control>
              <Accordion.Panel>{item.resposta}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Still Doubts Card */}
        <div
          style={{
            marginTop: 60,
            border: "1px solid #e687cd",
            borderRadius: 20,
            background: "linear-gradient(135deg, #f1e0e0 0%, #ffffff 100%)",
            padding: "40px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 300,
              height: 200,
              background:
                "radial-gradient(ellipse, rgba(230,51,51,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: 52,
              height: 52,
              background: "rgba(230,51,51,0.12)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              margin: "0 auto 20px",
              border: "1px solid rgba(230,51,51,0.2)",
            }}
          >
            💬
          </div>

          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 10,
              margin: "0 0 10px",
            }}
          >
            Ainda tem dúvidas?
          </h3>

          <p
            style={{
              color: "#6b6b6b",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              maxWidth: 340,
              margin: "0 auto 24px",
            }}
          >
            Nossa equipe está pronta para te ajudar no Instagram. Fale com a
            gente e respondemos rapidinho!
          </p>

          <Button
            component="a"
            href="https://instagram.com/heartcodegift"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#e687cd",
              borderRadius: 999,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "12px 24px",
              height: "auto",
              border: "none",
            }}
          >
            Falar no Instagram
          </Button>
        </div>
      </div>
    </main>
  );
}