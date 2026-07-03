import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer/route";

import BoasVindas from "./components/boasvindas";
import Recursos from "./components/recursos";
import Faqs from "./components/faqs";
import Planos from "./components/planos";
import { EscolhaTema } from "./components/escolha$tema/route";
import RegrasComoFunciona from "./components/instrucoes";
import TermosDeUso from "./components/regras";
import { Privacidade } from "./components/regras/route";
import EscolherTemplate from "./components/criar-declaracao";
import LovePage from "./components/criar-declaracao/components/tela-presente/LovePage";
import { CriadorDeclaracao } from "./components/criar-declaracao/components/templates/padrao/template-basico";
import { TemplateNetflix } from "./components/criar-declaracao/components/templates/template-netflix";
import { MeusTemplates } from "./components/editar-templates-criados/meus-templates";
import { Sobre } from "./components/sobre";
import { FaqCompleto } from "./components/faqs/faq-completo";
import { DemoBanner } from "./components/criar-declaracao/components/demo-banner/demo-banner";
import { RecursosCardContainer } from "./components/resumo-container/resumo-container";
import { CriadorDeclaracaoDiaDasMaes } from "./components/criar-declaracao/components/templates/padrao/template-basico-mae";
import HeartCodeTrustBar from "./components/criar-declaracao/components/ui/trust-bar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/p/:slug" element={<LovePage />} />

        {/* Páginas normais */}
        <Route
          path="/"
          element={
            <Layout>
              <>
                <BoasVindas />
                <RegrasComoFunciona />
                <EscolhaTema />
                <HeartCodeTrustBar />
                <RecursosCardContainer />
                <div className="flex justify-center px-4 md:px-8 py-4 bg-[#FAFAFA]">
                  <DemoBanner
                    onAbrirDemo={() =>
                      window.open(
                        "https://www.heartcodegift.com.br/p/37ca69",
                        "_blank",
                      )
                    }
                  />
                </div>
                <Planos />
                <Faqs />
              </>
            </Layout>
          }
        />

        <Route
          path="/perfil"
          element={
            <Layout>
              <MeusTemplates />
            </Layout>
          }
        />

        <Route
          path="/termos-de-uso"
          element={
            <Layout>
              <TermosDeUso />
            </Layout>
          }
        />

        <Route
          path="/privacidade"
          element={
            <Layout>
              <Privacidade />
            </Layout>
          }
        />

        <Route
          path="/criar"
          element={
            <Layout>
              <EscolherTemplate />
            </Layout>
          }
        />

        <Route
          path="/padrao"
          element={
            <Layout>
              <CriadorDeclaracao />
            </Layout>
          }
        />

        <Route
          path="/padrao-mae"
          element={
            <Layout>
              <CriadorDeclaracaoDiaDasMaes />
            </Layout>
          }
        />

        <Route
          path="/spotify"
          element={
            <Layout>
              <CriadorDeclaracao templatePadrao="SPOTIFY" />
            </Layout>
          }
        />

        <Route
          path="/netflix"
          element={
            <Layout>
              <TemplateNetflix />
            </Layout>
          }
        />

        <Route
          path="/sobre"
          element={
            <Layout>
              <Sobre />
            </Layout>
          }
        />

        <Route
          path="/help"
          element={
            <Layout>
              <FaqCompleto />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;