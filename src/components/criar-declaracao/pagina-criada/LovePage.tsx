import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import type { LovePageData } from "../../../schema/schemas"
import LovePagePresente from "../components/tela-presente/LovePageTemplate"

export default function LovePage() {

  const { slug } = useParams()

  const [page, setPage] = useState<LovePageData | null>(null)

  useEffect(() => {

    axios.get(`http://localhost:8080/api/love-pages/${slug}`)
      .then(res => {
        setPage(res.data)
      })
      .catch(err => {
        console.error(err)
      })

  }, [slug])


  if (!page) return <h1>Carregando...</h1>


  return (

    <LovePagePresente
      titulo={page.receiverName}
      mensagem={page.message}
      imagens={page.photos}
      dataConhecimento={page.relationshipStartDate}
    />

  )
}