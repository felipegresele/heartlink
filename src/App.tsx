
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Header } from './components/header'
import { Footer } from './components/footer/route'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
