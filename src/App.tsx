
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Header } from './components/header'
import { Footer } from './components/footer/route'
import BoasVindas from './components/boasvindas'
import Recursos from './components/recursos'
import Faqs from './components/faqs'
import Planos from './components/planos'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <BoasVindas />
        <Recursos />
        <Planos />
        <Routes>
          <Route path="/" />
        </Routes>
        <Faqs />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
