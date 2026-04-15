import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import { Header } from './components/header'
import { Footer } from './components/footer/route'

import BoasVindas from './components/boasvindas'
import Recursos from './components/recursos'
import Faqs from './components/faqs'
import Planos from './components/planos'
import { EscolhaTema } from './components/escolha$tema/route'
import RegrasComoFunciona from './components/instrucoes'
import TermosDeUso from './components/regras'
import { Privacidade } from './components/regras/route'
import EscolherTemplate from './components/criar-declaracao'
import LovePage from './components/criar-declaracao/components/tela-presente/LovePage'
import { CriadorDeclaracao } from './components/criar-declaracao/components/templates/template-basico'
import { TemplateNetflix } from './components/criar-declaracao/components/templates/template-netflix'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
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
                <Recursos />
                <EscolhaTema />
                <RegrasComoFunciona />
                <Planos />
                <Faqs />
              </>
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
          path="/netflix"
          element={
            <Layout>
              <TemplateNetflix />
            </Layout>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App