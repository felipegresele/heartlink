import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import type { LovePageData } from "../../../../schema/schemas"
import PageReady from "./template-padrao/page-ready-template-padrao"

export default function LovePage() {

  const { slug } = useParams()

  const [page, setPage] = useState<LovePageData | null>(null)

  useEffect(() => {

    axios.get(`https://lovepage-backend.onrender.com/api/love-pages/${slug}`)
      .then(res => {
        setPage(res.data)
      })
      .catch(err => {
        console.error(err)
      })

  }, [slug])


  if (!page) return <h1>Carregando...</h1>


  return (

    <PageReady
      titulo={page.receiverName}
      mensagem={page.message}
      imagens={page.photos}
      musicaId={page.musicId}
      musicaTitulo={page.musicTitle}
      dataConhecimento={page.relationshipStartDate}
      usuarioNome={page.senderName}
    />

  )
}