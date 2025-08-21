
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
import { CriadorDeclaracao } from './components/criar-declaracao/template-basico'

function App() {

 return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Página principal com todos os componentes */}
        <Route
          path="/"
          element={
            <>
              <BoasVindas />
              <Recursos />
              <EscolhaTema />
              <RegrasComoFunciona />
              <Planos />
              <Faqs />
            </>
          }
        />

        {/* Página de Termos de Uso */}
        <Route
          path="/termos-de-uso"
          element={<TermosDeUso />}
        />
        <Route 
          path="/privacidade"
          element={<Privacidade />}
        />
        <Route 
          path="/criar"
          element={<CriadorDeclaracao />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
