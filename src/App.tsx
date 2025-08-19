
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Header } from './components/header'
import { Footer } from './components/footer/route'
import { Instrucoes } from './components/instrucoes/route'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" />
        </Routes>
        <Instrucoes />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
